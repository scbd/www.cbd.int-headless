import SolrIndexApi from '~~/api/solr-index'
import { solrEscape, toLString } from '~~/utils/solr'
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
  const data = await searchDecisions({ code: normalizeDecisionCode(code) })

  if (data.total === 0 || data.rows[0] === null) throw notFound(`Decision '${code}' not found.`)
  return data.rows[0] as Decision
};

async function searchDecisions (options?: QueryParams & { code?: string }): Promise<SearchResult<Decision>> {
  const query = options?.code !== undefined && options.code !== '' ? `symbol_s:${solrEscape(options.code)}` : '*.*'

  const params: SolrQuery = {
    query,
    fieldQueries: 'schema_s:decision',
    sort: options?.sort ?? 'updatedDate_dt DESC',
    fields: 'id,symbol_s,code_s,title_*_t,url_ss,eventTitle_t,session_i,decision_i,createdDate_dt,updatedDate_dt',
    start: options?.skip ?? 0,
    rowsPerPage: options?.limit ?? 10
  }

  const cacheKey = JSON.stringify(params)
  const cached = solrCache.get<SearchResult<Decision>>(cacheKey)
  if (cached !== null) return cached

  const { response } = await api.querySolr(params)

  const decisionList: Decision[] = response.docs.map((item: any): Decision => ({
    id: item.id,
    code: item.symbol_s,
    title: toLString(item, 'title'),
    urls: item.url_ss,
    eventTitle: item.eventTitle_t,
    session: item.session_i,
    decision: item.decision_i,
    createdOn: new Date(item.createdDate_dt),
    updatedOn: new Date(item.updatedDate_dt)
  }))

  const result = { total: response.numFound, rows: decisionList }
  return solrCache.set(cacheKey, result)
}

function normalizeDecisionCode (code: string): string {
  return code.toUpperCase()
}
