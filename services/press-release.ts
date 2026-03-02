import SolrIndexApi from '~~/api/solr-index'
import { solrEscape, toLString, toLStringArray } from '~~/utils/solr'
import { mandatory, notFound } from 'api-client/api-error'
import type { SolrQuery } from '~~/types/api/solr'
import type { PressRelease } from '~~/types/press-release'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'

const api = new SolrIndexApi({
  baseURL: useRuntimeConfig().apiBaseUrl
})

export async function listPressReleases (options: QueryParams): Promise<SearchResult<PressRelease>> {
  return await searchPressReleases(options)
};

export async function getPressRelease (code: string): Promise<PressRelease> {
  if (code === null || code === '') throw mandatory('code', 'Press release code is required.')
  const data = await searchPressReleases({ code: normalizePressReleaseCode(code) })

  if (data.total === 0 || data.rows[0] === null) throw notFound(`Press release '${code}' not found.`)
  return data.rows[0] as PressRelease
};

async function searchPressReleases (options?: QueryParams & { code?: string }): Promise<SearchResult<PressRelease>> {
  const query = options?.code !== undefined && options.code !== '' ? `symbol_s:${solrEscape(options.code)}` : '*.*'

  const params: SolrQuery =
        {
          query,
          fieldQueries: 'schema_s:pressRelease',
          sort: options?.sort ?? 'updatedDate_dt DESC',
          fields: 'id,symbol_s,code_s,title_*_t,url_ss,themes_*_txt,createdDate_dt,updatedDate_dt',
          start: options?.skip ?? 0,
          rowsPerPage: options?.limit ?? 10
        }
  const { response } = await api.querySolr(params)

  const pressReleaseList: PressRelease[] = response.docs.map((item: any): PressRelease => ({
    id: item.id,
    code: item.symbol_s,
    title: toLString(item, 'title'),
    urls: item.url_ss,
    themes: toLStringArray(item, 'themes'),
    createdOn: new Date(item.createdDate_dt),
    updatedOn: new Date(item.updatedDate_dt)
  }))

  return {
    total: response.numFound,
    rows: pressReleaseList
  }
}

function normalizePressReleaseCode (code: string): string {
  return code.toUpperCase()
}
