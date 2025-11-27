import type {
  Notification,
  NotificationList,
  NotificationOptions
} from '~~/types/notification'
import { NOTIFICATIONS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { handleErrorState } from '~~/utils/api-error-handler'

export default function useNotificationsApi (): {
  getNotification: (code: string) => Promise<Notification>
  getNotifications: (options?: NotificationOptions) => Promise<NotificationList>
} {
  const getNotification = async (code: string): Promise<Notification> => {
    const { data } = await useFetch<Notification>(`${NOTIFICATIONS}/${code}`).then(handleErrorState)

    const notification: Notification = data.value

    return notification
  }

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

  return { getNotification, getNotifications }
}
