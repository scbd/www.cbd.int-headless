import type { Statement } from '~~/types/statement'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { STATEMENTS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { mandatory } from 'api-client/api-error'

export default async function useStatementsListApi (
  options?: ComputedRef<QueryParams> | Ref<QueryParams>
): Promise<{ statements: ComputedRef<{ rows: Statement[], total: number }>, error: Ref<Error | undefined> }> {
  const { data, error } = await useFetch<SearchResult<Statement>>(STATEMENTS, {
    params: computed(() => ({
      sort: options?.value.sort,
      limit: options?.value.limit,
      skip: options?.value.skip,
      fieldQueries: options?.value.fieldQueries,
      startDate: options?.value.startDate,
      endDate: options?.value.endDate
    })),
    default: () => ({ total: 0, rows: [] })
  })

  const statements = computed(() => ({
    rows: data.value.rows.map(row => normalizeObjectDates(row)),
    total: data.value.total
  }))

  return { statements, error }
}

export async function useStatementsApi (code: string): Promise<{ statements: ComputedRef<{ rows: Statement[], total: number }>, error: Ref<Error | undefined> }> {
  if (code === undefined || code === null) { throw mandatory('code is mandatory') }

  const { data, error } = await useFetch<Statement>(`${STATEMENTS}/${code}`)

  const statements = computed(() => {
    const rows = data.value != null ? [normalizeObjectDates(data.value)] : []
    return { rows, total: rows.length }
  })

  return { statements, error }
}
