import type { RecentUpdate } from '~~/types/recent-updates'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { RECENT_UPDATES } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

export function getRecentUpdateList (options?: MaybeRef<QueryParams>): ReturnType<typeof useAsyncData<SearchResult<RecentUpdate>>> {
  return useAsyncData<SearchResult<RecentUpdate>>(
    computed(() => `recent-updates-${JSON.stringify(unref(options))}`),
    () => $fetch<SearchResult<RecentUpdate>>(RECENT_UPDATES, { params: unref(options) }),
    {
      lazy: true,
      default: () => ({ total: 0, rows: [] as RecentUpdate[] }),
      transform: (data) => ({ rows: data.rows.map(item => normalizeObjectDates(item)), total: data.total })
    }
  )
}
