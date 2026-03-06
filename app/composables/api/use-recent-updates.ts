import type { RecentUpdate } from '~~/types/recent-updates'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { RECENT_UPDATES } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

export default async function useRecentUpdatesListApi (
  options?: QueryParams
): Promise<{ recentUpdates: RecentUpdate[], error: Ref<Error | undefined> }> {
  const { data, error } = await useFetch<SearchResult<RecentUpdate>>(RECENT_UPDATES, {
    params: {
      sort: options?.sort,
      limit: options?.limit,
      skip: options?.skip
    },
    default: () => ({ total: 0, rows: [] })
  })

  const recentUpdates = data.value.rows.map(row => normalizeObjectDates(row))

  return { recentUpdates, error }
}