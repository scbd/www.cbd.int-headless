import { mandatory, notFound } from 'api-client/api-error'
import SolrIndexApi from '../api/solr-index'
import { solrEscape, toLString, toLStringArray } from '../utils/solr'
import { getImage } from '~~/services/drupal'
import type { SolrQuery } from '../types/api/solr'
import type { Meeting } from '../types/meeting'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { DEFAULT_IMAGE } from '~~/constants/image-paths'

function normalizeMeetingCode (code: string): string {
  return code.toUpperCase()
};
const api = new SolrIndexApi({
  baseURL: useRuntimeConfig().apiBaseUrl
})

export async function getMeeting (code: string): Promise<Meeting> {
  if (code === null || code === '') throw mandatory('code', 'Meeting code is required.')
  const data = await searchMeetings({ code: normalizeMeetingCode(code) })

  if (data.total === 0 || data.rows[0] === null) throw notFound(`Meeting '${code}' not found.`)
  return data.rows[0] as Meeting
};

export async function listMeetings (options: QueryParams): Promise<SearchResult<Meeting>> {
  return await searchMeetings(options)
};

async function searchMeetings (options?: QueryParams & { code?: string }): Promise<SearchResult<Meeting>> {
  const query = options?.code !== undefined && options.code !== '' ? `symbol_s:${solrEscape(options.code)}` : '*.*'

  const params: SolrQuery =
        {
          query,
          fieldQueries: 'schema_s:meeting',
          sort: options?.sort ?? 'updatedDate_dt DESC',
          fields: 'id,symbol_s,title_*_t,eventCountry_*_t,eventCity_*_t,url_ss,themes_*_txt,startDate_dt,endDate_dt,createdDate_dt,updatedDate_dt',
          start: options?.skip ?? 0,
          rowsPerPage: options?.limit ?? 10
        }
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

  return {
    total: response.numFound,
    rows: meetingList
  }
}
