import SolrIndexApi from '~~/api/solr-index'
import { toLString, toLStringArray } from '~~/utils/solr'
import { getImage } from '~~/services/drupal'
import { Cache } from '~~/utils/cache'
import { SOLR_CACHE_DURATION_MS, CACHE_MAX_SIZE } from '~~/constants/cache'
import type { SolrQuery } from '~~/types/api/solr'
import type { RecentUpdate } from '~~/types/recent-updates'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import type { Image } from '~~/types/image'
import { DEFAULT_IMAGE } from '~~/constants/image-paths'

const api = new SolrIndexApi({
  baseURL: useRuntimeConfig().apiBaseUrl
})

const solrCache = new Cache({ name: 'recentUpdatesCache', expiry: SOLR_CACHE_DURATION_MS, maxSize: CACHE_MAX_SIZE })
solrCache.startPurgeTimer()

export async function listRecentUpdates (options: QueryParams): Promise<SearchResult<RecentUpdate>> {
  const params: SolrQuery = {
    query: '*:*',
    fieldQueries: '(schema_s:meeting) OR (schema_s:notification) OR (schema_s:statement AND _state_s:public)',
    sort: options?.sort ?? 'updatedDate_dt DESC',
    fields: 'id,schema_s,symbol_s,title_*_t,eventCountry_*_t,eventCity_*_t,url_ss,themes_*_txt,startDate_dt,endDate_dt,createdDate_dt,updatedDate_dt',
    start: options?.skip ?? 0,
    rowsPerPage: options?.limit ?? 10
  }

  const cacheKey = JSON.stringify(params)
  const cached = solrCache.get<SearchResult<RecentUpdate>>(cacheKey)
  if (cached !== null) return cached

  const { response } = await api.querySolr(params)

  const recentUpdatesList: RecentUpdate[] = await Promise.all(
    response.docs.map(async (item: any): Promise<RecentUpdate> => ({
      id: item.id,
      code: item.symbol_s,
      category: item.schema_s,
      title: toLString(item, 'title'),
      urls: item.url_ss,
      themes: toLStringArray(item, 'themes'),
      createdOn: new Date(item.createdDate_dt),
      updatedOn: new Date(item.updatedDate_dt),
      ...(item.schema_s === 'meeting' && {
        startOn: new Date(item.startDate_dt),
        endOn: new Date(item.endDate_dt),
        country: toLString(item, 'eventCountry'),
        city: toLString(item, 'eventCity')
      }),
      image: await (async () => {
        try {
          return await getImage(item.symbol_s, pluralizeImageCategory(item.schema_s))
        } catch {
          return DEFAULT_IMAGE
        }
      })()
    }))
  )

  const result = { total: response.numFound, rows: recentUpdatesList }

  return solrCache.set(cacheKey, result)
}

// TO-DO: currently the schema_s from solr returns meeting and the media endpoint in drupal returns meetings
// this function will need to be updated when the Drupal endpoint is corrected to return the same pattern as solr
function pluralizeImageCategory(word: string): Image['category'] {
  return `${word}s` as Image['category']
}