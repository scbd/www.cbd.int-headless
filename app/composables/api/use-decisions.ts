import type { Decision } from '~~/types/decision'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { DECISIONS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

export default async function useDecisionsListApi(
  options?: ComputedRef<QueryParams> | Ref<QueryParams>
): Promise<{ decisions: ComputedRef<{ rows: Decision[]; total: number }>; error: Ref<Error | undefined> }> {
  const { data, error } = await useFetch<SearchResult<Decision>>(DECISIONS, {
    params: computed(() => ({
      sort: options?.value.sort,
      limit: options?.value.limit,
      skip: options?.value.skip,
      fieldQueries: options?.value.fieldQueries
    })),
    default: () => ({ total: 0, rows: [] })
  })

  const decisions = computed(() => ({
    rows: data.value.rows.map(row => normalizeObjectDates(row)),
    total: data.value.total
  }))

  return { decisions, error }
}