import type { Notification } from '~~/types/notification'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { NOTIFICATIONS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { mandatory } from 'api-client/api-error'
import { emptyKey } from '~~/utils/solr'

export function useNotifications (): {
  getNotificationList: (options?: MaybeRef<QueryParams>) => ReturnType<typeof useAsyncData<SearchResult<Notification>>>
  getNotification: (code: MaybeRef<string>) => ReturnType<typeof useAsyncData<Notification | undefined>>
} {
  function getNotificationList (options?: MaybeRef<QueryParams>): ReturnType<typeof useAsyncData<SearchResult<Notification>>> {
    return useAsyncData<SearchResult<Notification>>(
      computed(() => `notifications-${JSON.stringify(unref(options))}`),
      () => $fetch<SearchResult<Notification>>(NOTIFICATIONS, { params: unref(options) }),
      {
        lazy: true,
        default: () => ({ total: 0, rows: [] as Notification[] }),
        transform: (data) => ({ rows: data.rows.map(item => normalizeObjectDates(item)), total: data.total })
      }
    )
  }

  function getNotification (code: MaybeRef<string>): ReturnType<typeof useAsyncData<Notification | undefined>> {
    return useAsyncData<Notification>(
      computed(() => `notification-${unref(code) as string}`),
      () => {
        const c = unref(code) as string
        if (emptyKey(c)) { throw mandatory('code', 'code is mandatory') }
        return $fetch<Notification>(`${NOTIFICATIONS}/${encodeURIComponent(c)}`)
      },
      {
        lazy: true,
        transform: normalizeObjectDates
      }
    )
  }
  return { getNotificationList, getNotification }
}
