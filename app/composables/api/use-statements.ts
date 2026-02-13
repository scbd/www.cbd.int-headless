import type { Statement } from '~~/types/statement'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { STATEMENTS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

export default function useStatementsApi (options?: QueryParams): { statements: ComputedRef<Statement[]>, pending: Ref<boolean>, error: Ref<Error | undefined> } {
  const { data, pending, error } = useLazyFetch<SearchResult<Statement>>(STATEMENTS, {
    params: {
      sort: options?.sort,
      limit: options?.limit,
      skip: options?.skip
    },
    default: () => ({ total: 0, rows: [] })
  })

  const statements = computed<Statement[]>(() => data.value.rows.map(row => normalizeObjectDates(row)))

  return { statements, pending, error }
}
