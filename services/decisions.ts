import SolrIndexApi from '~~/api/solr-index'
import { solrEscape, toLString } from '~~/utils/solr'
import type { SolrQuery } from '~~/types/api/solr'
import type { Decision } from '~~/types/decision'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'

const api = new SolrIndexApi({
  baseURL: useRuntimeConfig().apiBaseUrl
})

export async function listDecisions (options: QueryParams): Promise<SearchResult<Decision>> {
  return await searchDecisions(options)
};

async function searchDecisions (options?: QueryParams & { code?: string }): Promise<SearchResult<Decision>> {
  const query = options?.code !== undefined && options.code !== '' ? `symbol_s:${solrEscape(options.code)}` : '*.*'

  const params: SolrQuery =
        {
          query,
          fieldQueries: 'schema_s:decision',
          sort: options?.sort ?? 'updatedDate_dt DESC',
          fields: 'id,symbol_s,code_s,title_*_t,file_*_t,eventTitle_*_t,session_i,decision_i,createdDate_dt,updatedDate_dt',
          start: options?.skip ?? 0,
          rowsPerPage: options?.limit ?? 10
        }
  const { response } = await api.querySolr(params)

  const decisionList: Decision[] = await Promise.all(response.docs.map(async (item: any): Promise<Decision> => ({
    id: item.id,
    code: item.symbol_s,
    title: toLString(item, 'title'),
    file: toLString(item, 'file'),
    eventTitle: item.eventTitle,
    session: item.session_i,
    decision: item.decision_i,
    createdOn: new Date(item.createdDate_dt),
    updatedOn: new Date(item.updatedDate_dt)
  })))

  return {
    total: response.numFound,
    rows: decisionList
  }
}
