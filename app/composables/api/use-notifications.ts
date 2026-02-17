import type { Notification } from '~~/types/notification'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { NOTIFICATIONS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

export default async function useNotificationsApi (options?: QueryParams): Promise<{ notifications: Notification[], error: Ref<Error | undefined> }> {
  const { data, error } = await useFetch<SearchResult<Notification>>(NOTIFICATIONS, {
    params: {
      sort: options?.sort,
      limit: options?.limit,
      skip: options?.skip
    },
    default: () => ({ total: 0, rows: [] })
  })

  const notifications = data.value.rows.map(row => normalizeObjectDates(row))

  return { notifications, error }
}
