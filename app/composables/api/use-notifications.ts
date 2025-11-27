import type { Notification } from '~~/types/notification'
import type { QueryParams, QueryList } from '~~/types/api/query-params'
import { NOTIFICATIONS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { handleErrorState } from '~~/utils/api-error-handler'

export default function useNotificationsApi (): { getNotifications: (options?: QueryParams) => Promise<QueryList<Notification>> } {
  const getNotifications = async (
    options?: QueryParams
  ): Promise<QueryList<Notification>> => {
    const { data } = await useFetch<QueryList<Notification>>(NOTIFICATIONS, {
      params: {
        sort: options?.sort,
        limit: options?.limit,
        skip: options?.skip
      }
    }).then(handleErrorState)

    const response: QueryList<Notification> = data.value

    return {
      total: response.total,
      rows: response.rows.map((notification: Notification) =>
        normalizeObjectDates(notification)
      )
    }
  }

  return { getNotifications }
}
