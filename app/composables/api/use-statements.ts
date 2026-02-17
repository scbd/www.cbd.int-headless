import type { Statement } from '~~/types/statement'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { STATEMENTS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

export default async function useStatementsApi (options?: QueryParams): Promise<{ statements: Statement[], error: Ref<Error | undefined> }> {
  const { data, error } = await useFetch<SearchResult<Statement>>(STATEMENTS, {
    params: {
      sort: options?.sort,
      limit: options?.limit,
      skip: options?.skip
    },
    default: () => ({ total: 0, rows: [] })
  })

  const statements = data.value.rows.map(row => normalizeObjectDates(row))

  return { statements, error }
}
