import type { Statement } from '~~/types/statement'
import type { QueryParams, QueryList } from '~~/types/api/query-params'
import { STATEMENTS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { handleErrorState } from '~~/utils/api-error-handler'

export default function useStatementsApi (): { getStatements: (options?: QueryParams) => Promise<QueryList<Statement>> } {
  const getStatements = async (
    options?: QueryParams
  ): Promise<QueryList<Statement>> => {
    const { data } = await useFetch<QueryList<Statement>>(STATEMENTS, {
      params: {
        sort: options?.sort,
        limit: options?.limit,
        skip: options?.skip
      }
    }).then(handleErrorState)

    const response: QueryList<Statement> = data.value

    return {
      total: response.total,
      rows: response.rows.map((statement: Statement) =>
        normalizeObjectDates(statement)
      )
    }
  }

  return { getStatements }
}
