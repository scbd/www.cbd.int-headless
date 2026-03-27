import { mandatory, notFound } from 'api-client/api-error'
import SolrIndexApi from '~~/api/solr-index'
import { solrEscape, toLString, toLStringArray, andOr, normalizeCode } from '~~/utils/solr'
import { getImage } from '~~/services/drupal'
import { Cache } from '~~/utils/cache'
import { SOLR_CACHE_DURATION_MS, CACHE_MAX_SIZE } from '~~/constants/cache'
import type { SolrQuery } from '~~/types/api/solr'
import type { Meeting } from '~~/types/meeting'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { DEFAULT_IMAGE } from '~~/constants/image-paths'

const api = new SolrIndexApi({
  baseURL: useRuntimeConfig().apiBaseUrl
})

const solrCache = new Cache({ name: 'meetingCache', expiry: SOLR_CACHE_DURATION_MS, maxSize: CACHE_MAX_SIZE })
solrCache.startPurgeTimer()

export async function getMeeting (code: string): Promise<Meeting> {
  if (code === null || code === '') throw mandatory('code', 'Meeting code is required.')
  const data = await searchMeetings({ code: normalizeCode(code) })

  if (data.total === 0 || data.rows[0] === null) throw notFound(`Meeting '${code}' not found.`)
  return data.rows[0] as Meeting
};

export async function listMeetings (options: QueryParams): Promise<SearchResult<Meeting>> {
  return await searchMeetings(options)
};

async function searchMeetings (options?: QueryParams & { code?: string }): Promise<SearchResult<Meeting>> {
  const query = options?.code !== undefined && options.code !== '' ? `symbol_s:${solrEscape(options.code)}` : '*.*'

  const fqParts: string[] = ['schema_s:meeting']
  if (options?.fieldQueries !== undefined && options.fieldQueries !== null && options.fieldQueries !== '') {
    fqParts.push(options.fieldQueries)
  }

  if (options?.startDate || options?.endDate) {
    const from = options.startDate ?? '*'
    const to   = options.endDate   ?? '*'
    fqParts.push(`(startDate_dt:[* TO ${to}] AND endDate_dt:[${from} TO *])`)
  }

  const fieldQueries = andOr(fqParts, 'AND')

  const params: SolrQuery = {
    query,
    fieldQueries,
    sort: options?.sort ?? 'startDate_dt ASC',
    fields: 'id,symbol_s,title_*_t,eventCountry_*_t,eventCity_*_t,url_ss,themes_*_txt,startDate_dt,endDate_dt,createdDate_dt,updatedDate_dt',
    start: options?.skip ?? 0,
    rowsPerPage: options?.limit ?? 10
  }

  const cacheKey = JSON.stringify(params)
  return solrCache.getOrFetch(cacheKey, async () => {
    const { response } = await api.querySolr(params)

    const meetingList: Meeting[] = await Promise.all(response.docs.map(async (item: any): Promise<Meeting> => ({
      id: item.id,
      code: item.symbol_s,
      title: toLString(item, 'title'),
      urls: item.url_ss,
      themes: toLStringArray(item, 'themes'),
      startOn: new Date(item.startDate_dt),
      endOn: new Date(item.endDate_dt),
      createdOn: new Date(item.createdDate_dt),
      updatedOn: new Date(item.updatedDate_dt),
      country: toLString(item, 'eventCountry'),
      city: toLString(item, 'eventCity'),
      image: await (async () => {
        try {
          return await getImage(item.symbol_s, 'meetings')
        } catch {
          return DEFAULT_IMAGE
        }
      })()
    })))

    return { total: response.numFound, rows: meetingList }
  })
}
