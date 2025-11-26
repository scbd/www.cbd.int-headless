import type {
  Statement,
  StatementList,
  StatementOptions
} from '~~/types/statement'
import { STATEMENTS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { handleErrorState } from '~~/utils/api-error-handler'

export default function useStatementsApi (): {
  getStatement: (code: string) => Promise<Statement>
  getStatements: (options?: StatementOptions) => Promise<StatementList> } {
  const getStatement = async (code: string): Promise<Statement> => {
    const { data } = await useFetch<Statement>(`${STATEMENTS}/${code}`).then(handleErrorState)

    const statement: Statement = normalizeObjectDates(data.value)

    return statement
  }

  const getStatements = async (
    options?: StatementOptions
  ): Promise<StatementList> => {
    const { data } = await useFetch<StatementList>(STATEMENTS, {
      params: {
        sort: options?.sort,
        limit: options?.limit,
        skip: options?.skip
      }
    }).then(handleErrorState)

    const response: StatementList = data.value

    return {
      total: response.total,
      rows: response.rows.map((statement: Statement) =>
        normalizeObjectDates(statement)
      )
    }
  }

  return { getStatement, getStatements }
}
