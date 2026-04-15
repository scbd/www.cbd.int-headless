import type { Notification } from '~~/types/notification'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { NOTIFICATIONS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { mandatory } from 'api-client/api-error'

export function getNotificationList (options?: MaybeRef<QueryParams>): ReturnType<typeof useAsyncData<SearchResult<Notification>>> {
  return useAsyncData<SearchResult<Notification>>(
    computed(() => `notifications-${JSON.stringify(unref(options))}`),
    () => $fetch<SearchResult<Notification>>(NOTIFICATIONS, { params: unref(options) }),
    {
      default: () => ({ total: 0, rows: [] as Notification[] }),
      transform: (data) => ({ rows: data.rows.map(item => normalizeObjectDates(item)), total: data.total })
    }
  )
}

export function getNotification (code: MaybeRef<string>): ReturnType<typeof useAsyncData<Notification | undefined>> {
  if (code === undefined || code === null) { throw mandatory('code is mandatory') }
  return useAsyncData<Notification>(
    computed(() => `notification-${unref(code) as string}`),
    () => $fetch<Notification>(`${NOTIFICATIONS}/${unref(code) as string}`),
    { transform: normalizeObjectDates }
  )
}
