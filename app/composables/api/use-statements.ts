import type { Statement } from '~~/types/statement'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { STATEMENTS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

export default async function useStatementsApi (
  options?: ComputedRef<QueryParams> | Ref<QueryParams>
): Promise<{ statements: ComputedRef<{ rows: Statement[], total: number }>, error: Ref<Error | undefined> }> {
  const { data, error } = await useFetch<SearchResult<Statement>>(STATEMENTS, {
    params: computed(() => ({
      sort: options?.value.sort,
      limit: options?.value.limit,
      skip: options?.value.skip,
      fieldQueries: options?.value.fieldQueries
    })),
    default: () => ({ total: 0, rows: [] })
  })

  const statements = computed(() => ({
    rows: data.value.rows.map(row => normalizeObjectDates(row)),
    total: data.value.total
  }))

  return { statements, error }
}
