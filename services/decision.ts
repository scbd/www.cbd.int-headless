import SolrIndexApi from '~~/api/solr-index'
import { normalizeCode, solrEscape, toLString, andOr } from '~~/utils/solr'
import { Cache } from '~~/utils/cache'
import { mandatory, notFound } from 'api-client/api-error'
import { SOLR_CACHE_DURATION_MS, CACHE_MAX_SIZE } from '~~/constants/cache'
import type { SolrQuery } from '~~/types/api/solr'
import type { Decision } from '~~/types/decision'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'

const api = new SolrIndexApi({
  baseURL: useRuntimeConfig().apiBaseUrl
})

const solrCache = new Cache({ name: 'decisionCache', expiry: SOLR_CACHE_DURATION_MS, maxSize: CACHE_MAX_SIZE })
solrCache.startPurgeTimer()

export async function listDecisions (options: QueryParams): Promise<SearchResult<Decision>> {
  return await searchDecisions(options)
};

export async function getDecision (code: string): Promise<Decision> {
  if (code === null || code === '') throw mandatory('code', 'Decision code is required.')
  const data = await searchDecisions({ code: normalizeCode(code) })

  if (data.total === 0 || data.rows[0] === null) throw notFound(`Decision '${code}' not found.`)
  return data.rows[0] as Decision
};

async function searchDecisions (options?: QueryParams & { code?: string }): Promise<SearchResult<Decision>> {
  const query = options?.code !== undefined && options.code !== '' ? `symbol_s:${solrEscape(options.code)}` : '*.*'

  const fqParts: string[] = ['schema_s:decision']
  if (options?.fieldQueries !== undefined && options.fieldQueries !== null && options.fieldQueries !== '') {
    fqParts.push(options.fieldQueries)
  }

  const fieldQueries = andOr(fqParts, 'AND')

  const params: SolrQuery = {
    query,
    fieldQueries,
    sort: options?.sort ?? 'updatedDate_dt DESC',
    fields: 'id,symbol_s,code_s,title_*_t,url_ss,file_*_t,eventTitle_t,session_i,decision_i,createdDate_dt,updatedDate_dt',
    start: options?.skip ?? 0,
    rowsPerPage: options?.limit ?? 10
  }

  const cacheKey = JSON.stringify(params)
  return solrCache.getOrFetch(cacheKey, async () => {
    const { response } = await api.querySolr(params)

    const decisionList: Decision[] = response.docs.map((item: any): Decision => ({
      id: item.id,
      code: item.symbol_s,
      title: toLString(item, 'title'),
      urls: item.url_ss,
      file: toLString(item, 'file'),
      eventTitle: item.eventTitle_t,
      session: item.session_i,
      decision: item.decision_i,
      createdOn: new Date(item.createdDate_dt),
      updatedOn: new Date(item.updatedDate_dt)
    }))

    return { total: response.numFound, rows: decisionList }
  })
}
