import { mandatory, notFound } from 'api-client/api-error'
import SolrIndexApi from '../api/solr-index'
import { solrEscape, andOr, toLString, toLStringArray } from '../utils/solr'
import { getImage } from '~~/services/drupal'
import type { SolrQuery } from '../types/api/solr'
import type { Statement } from '../types/statement'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { DEFAULT_IMAGE } from '~~/constants/image-paths'

function normalizeStatementCode (code: string): string {
  return code.toUpperCase()
};

const api = new SolrIndexApi({
  baseURL: useRuntimeConfig().apiBaseUrl
})

export async function getStatement (code: string): Promise<Statement> {
  if (code === null || code === '') throw mandatory('code', 'Statement code is required.')
  const data = await searchStatements({ code: normalizeStatementCode(code) })

  if (data.total === 0 || data.rows[0] === null) throw notFound(`Statement '${code}' not found.`)
  return data.rows[0] as Statement
}

export async function listStatements (options: QueryParams): Promise<SearchResult<Statement>> {
  return await searchStatements(options)
}

async function searchStatements (options?: QueryParams & { code?: string }): Promise<SearchResult<Statement>> {
  const fqParts: string[] = [
    'schema_s:statement',
    '_state_s:public',
    ...(options?.code !== undefined && options.code !== '' ? [`symbol_s:${solrEscape(options?.code)}`] : [])
  ]

  if (options?.fieldQueries !== undefined && options.fieldQueries !== null && options.fieldQueries !== '') {
    fqParts.push(options.fieldQueries)
  }

  const fieldQueries = andOr(fqParts, 'AND')

  const params: SolrQuery =
        {
          fieldQueries,
          query: '*:*',
          sort: options?.sort ?? 'updatedDate_dt DESC',
          fields: 'id,symbol_s,title_*_t,url_ss,themes_*_txt,createdDate_dt,updatedDate_dt',
          start: options?.skip ?? 0,
          rowsPerPage: options?.limit ?? 10
        }
  const { response } = await api.querySolr(params)

  const statementList: Statement[] = await Promise.all(response.docs.map(async (item: any): Promise<Statement> => ({
    id: item.id,
    code: item.symbol_s,
    title: toLString(item, 'title'),
    urls: item.url_ss,
    themes: toLStringArray(item, 'themes'),
    createdOn: new Date(item.createdDate_dt),
    updatedOn: new Date(item.updatedDate_dt),
    image: await (async () => {
      try {
        return await getImage(item.symbol_s, 'statements')
      } catch {
        return DEFAULT_IMAGE
      }
    })()
  })))

  return {
    total: response.numFound,
    rows: statementList
  }
};
