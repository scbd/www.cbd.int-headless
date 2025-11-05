import type {
  Notification,
  NotificationList,
  NotificationOptions
} from '~~/types/notification'
import { NOTIFICATIONS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

/** TODO: replace this with an implementation of handleError whenever api-client is fixed (Stephane).
 *  https://scbd.atlassian.net/browse/CIR-139
 */
const handleErrorState = ({
  error,
  ...rest
}: {
  [key: string]: any
  error: any
}) => {
  if (error.value != null) throw error.value
  return rest
}

export default function useNotificationsApi () {
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
