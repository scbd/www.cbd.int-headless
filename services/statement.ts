import { mandatory, notFound } from 'api-client/api-error'
import SolrIndexApi from '../api/solr-index'
import { solrEscape, andOr, toLString, toLStringArray } from '../utils/solr'
import type { SolrQuery } from '../types/api/solr'
import type { Statement, StatementList, StatementOptions } from '../types/statement'

function normalizeStatementCode (code: string): string {
  return code.toUpperCase()
};

const api = new SolrIndexApi({
  baseURL: useRuntimeConfig().apiBaseUrl
})

export async function getStatement (code: string): Promise<Statement> {
  if (code == null || code === '') throw mandatory('code', 'Statement code is required.')
  const data = await searchStatements({ code: normalizeStatementCode(code) })

  if (data.total === 0 || data.rows[0] === null) throw notFound(`Statement '${code}' not found.`)
  return data.rows[0] as Statement
}

export async function listStatements (options: StatementOptions): Promise<StatementList> {
  return await searchStatements(options)
}

async function searchStatements (options?: StatementOptions & { code?: string }): Promise<StatementList> {
  const fieldQueries = andOr([
    'schema_s:statement',
    '_state_s:public',
    ...(options?.code != null && options.code !== '' ? [`symbol_s:${solrEscape(options?.code)}`] : [])
  ], 'AND')

  const params: SolrQuery =
        {
          fieldQueries,
          query: '*:*',
          sort: options?.sort ?? 'updatedDate_dt DESC',
          fields: 'id,symbol_s,title_*_t,url_ss,themes_*_txt,createdDate_dt,updatedDate_dt',
          start: options?.skip ?? 0,
          rowsPerPage: options?.limit ?? 25
        }
  const { response } = await api.querySolr(params)

  const statementList: Statement[] = response.docs.map((item: any): Statement => ({
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
    rows: statementList
  }
};
