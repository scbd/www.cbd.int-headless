import type {
  Statement,
  StatementList,
  StatementOptions
} from '~~/types/statement'
import { STATEMENTS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

/** TODO: replace this with an implementation of handleError whenever api-client is fixed (Stephane).
 *  https://scbd.atlassian.net/browse/CIR-139
 */
const handleErrorState = ({
  error,
  ...rest
}: {
  [key: string]: any
  error: any
}): { [key: string]: any } => {
  if (error.value !== null) throw error.value
  return rest
}

export default function useStatementsApi (): { getStatements: (options?: StatementOptions) => Promise<StatementList> } {
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

  return { getStatements }
}
