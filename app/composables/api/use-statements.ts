import type { Statement } from '~~/types/statement'
import type { QueryParams } from '~~/types/api/query-params'
import { STATEMENTS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { handleErrorState } from '~~/utils/api-error-handler'
import type { SearchResult } from '~~/types/api/search-result'

export default function useStatementsApi (): { getStatements: (options?: QueryParams) => Promise<SearchResult<Statement>> } {
  const getStatements = async (
    options?: QueryParams
  ): Promise<SearchResult<Statement>> => {
    const { data } = await useFetch<SearchResult<Statement>>(STATEMENTS, {
      params: {
        sort: options?.sort,
        limit: options?.limit,
        skip: options?.skip
      }
    }).then(handleErrorState)

    const response: SearchResult<Statement> = data.value

    return {
      total: response.total,
      rows: response.rows.map((statement: Statement) =>
        normalizeObjectDates(statement)
      )
    }
  }

  return { getStatements }
}
