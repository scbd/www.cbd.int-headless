import type { Meeting } from '~~/types/meeting'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { MEETINGS } from '~~/constants/api-paths'

export default function useMeetingsApi (options?: QueryParams): { meetings: ComputedRef<Meeting[]>, pending: Ref<boolean>, error: Ref<Error | undefined> } {
  const { data, pending, error } = useLazyFetch<SearchResult<Meeting>>(MEETINGS, {
    params: {
      sort: options?.sort,
      limit: options?.limit,
      skip: options?.skip
    },
    default: () => ({ total: 0, rows: [] })
  })

  const meetings = computed(() => data.value.rows)

  return { meetings, pending, error }
}
