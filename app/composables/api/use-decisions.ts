import type { Decision } from '~~/types/decision'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { DECISIONS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

export function getDecisionList (options?: MaybeRef<QueryParams>): ReturnType<typeof useAsyncData<SearchResult<Decision>>> {
  return useAsyncData<SearchResult<Decision>>(
    computed(() => `decisions-${JSON.stringify(unref(options))}`),
    () => $fetch<SearchResult<Decision>>(DECISIONS, { params: unref(options) }),
    {
      lazy: true,
      default: () => ({ total: 0, rows: [] as Decision[] }),
      transform: (data) => ({ rows: data.rows.map(item => normalizeObjectDates(item)), total: data.total })
    }
  )
}
