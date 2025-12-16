import type { Notification } from '~~/types/notification'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { NOTIFICATIONS } from '~~/constants/api-paths'
import normalizeObjectDates from '~/utils/normalize-object-dates'
import { handleErrorState } from '~/utils/api-error-handler'

export default function useNotificationsApi (): { getNotifications: (options?: QueryParams) => Promise<SearchResult<Notification>> } {
  const getNotifications = async (
    options?: QueryParams
  ): Promise<SearchResult<Notification>> => {
    const { data } = await useFetch<SearchResult<Notification>>(NOTIFICATIONS, {
      params: {
        sort: options?.sort,
        limit: options?.limit,
        skip: options?.skip
      }
    }).then(handleErrorState)

    const response: SearchResult<Notification> = data.value

    return {
      total: response.total,
      rows: response.rows.map((notification: Notification) =>
        normalizeObjectDates(notification)
      )
    }
  }

  return { getNotifications }
}
