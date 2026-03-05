import { mandatory, notFound } from 'api-client/api-error'
import SolrIndexApi from '~~/api/solr-index'
import { solrEscape, toLString, normalizeCode } from '~~/utils/solr'
import type { SolrQuery } from '~~/types/api/solr'
import type { Nbsap } from '~~/types/nbsap'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'

const api = new SolrIndexApi({
  baseURL: useRuntimeConfig().apiBaseUrl
})

export async function getNbsap (code: string): Promise<Nbsap> {
  if (code === null || code === '') throw mandatory('code', 'Nbsap code is required.')
  const data = await searchNbsaps({ code: normalizeCode(code) })

  if (data.total === 0 || data.rows[0] === null) throw notFound(`Nbsap '${code}' not found.`)
  return data.rows[0] as Nbsap
};

export async function listNbsaps (options: QueryParams): Promise<SearchResult<Nbsap>> {
  return await searchNbsaps(options)
};

async function searchNbsaps (options?: QueryParams & { code?: string }): Promise<SearchResult<Nbsap>> {
  const query = options?.code !== undefined && options.code !== '' ? `uniqueIdentifier_t:${solrEscape(options.code)}` : '*:*'

  const params: SolrQuery =
        {
          query,
          fieldQueries: 'schema_s:nbsap',
          sort: options?.sort ?? 'updatedDate_dt DESC',
          fields: 'id,uniqueIdentifier_t,title_*_t,url_ss,government_*_t,createdDate_dt,updatedDate_dt',
          start: options?.skip ?? 0,
          rowsPerPage: options?.limit ?? 10
        }
  const { response } = await api.querySolr(params)

  const nbsapList: Nbsap[] = response.docs.map((item: any): Nbsap => ({
    id: item.id,
    code: item.uniqueIdentifier_t,
    title: toLString(item, 'title'),
    urls: item.url_ss,
    country: toLString(item, 'government'),
    createdOn: new Date(item.createdDate_dt),
    updatedOn: new Date(item.updatedDate_dt)
  }))

  return {
    total: response.numFound,
    rows: nbsapList
  }
}