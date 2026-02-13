import type { Notification } from '~~/types/notification'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { NOTIFICATIONS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

export default function useNotificationsApi (options?: QueryParams): { notifications: ComputedRef<Notification[]>, pending: Ref<boolean>, error: Ref<Error | undefined> } {
  const { data, pending, error } = useLazyFetch<SearchResult<Notification>>(NOTIFICATIONS, {
    params: {
      sort: options?.sort,
      limit: options?.limit,
      skip: options?.skip
    },
    default: () => ({ total: 0, rows: [] })
  })

  const notifications = computed<Notification[]>(() => data.value.rows.map(row => normalizeObjectDates(row)))

  return { notifications, pending, error }
}
