import type { Meeting } from '~~/types/meeting'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { MEETINGS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

export default async function useMeetingsApi (options?: ComputedRef<QueryParams> | Ref<QueryParams>): Promise<{ meetings: ComputedRef<{ rows: Meeting[], total: number }>, error: Ref<Error | undefined> }> {
  const { data, error } = await useFetch<SearchResult<Meeting>>(MEETINGS, {
    params: computed(() => ({
      sort: options?.value.sort,
      limit: options?.value.limit,
      skip: options?.value.skip,
      fieldQueries: options?.value.fieldQueries
    })),
    default: () => ({ total: 0, rows: [] })
  })

  const meetings = computed(() => ({
    rows: data.value.rows.map(row => normalizeObjectDates(row)),
    total: data.value.total
  }))

  return { meetings, error }
}
