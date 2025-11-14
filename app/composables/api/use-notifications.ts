import type {
  Notification,
  NotificationList,
  NotificationOptions
} from '~~/types/notification'
import { NOTIFICATIONS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { handleErrorState } from '~~/utils/api-states'

export default function useNotificationsApi (): { getNotifications: (options?: NotificationOptions) => Promise<NotificationList> } {
  const getNotifications = async (
    options?: NotificationOptions
  ): Promise<NotificationList> => {
    const { data } = await useFetch<NotificationList>(NOTIFICATIONS, {
      params: {
        sort: options?.sort,
        limit: options?.limit,
        skip: options?.skip
      }
    }).then(handleErrorState)

    const response: NotificationList = data.value

    return {
      total: response.total,
      rows: response.rows.map((notification: Notification) =>
        normalizeObjectDates(notification)
      )
    }
  }

  return { getNotifications }
}
