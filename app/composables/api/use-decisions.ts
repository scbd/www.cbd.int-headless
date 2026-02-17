import type { Decision } from '~~/types/decision'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { DECISIONS } from '~~/constants/api-paths'

export default function useDecisionsApi (options?: QueryParams): { decisions: ComputedRef<Decision[]>, pending: Ref<boolean>, error: Ref<Error | undefined> } {
  const { data, pending, error } = useFetch<SearchResult<Decision>>(DECISIONS, {
    params: {
      sort: options?.sort,
      limit: options?.limit,
      skip: options?.skip
    },
    default: () => ({ total: 0, rows: [] })
  })

  const decisions = computed(() => data.value.rows)

  return { decisions, pending, error }
}
