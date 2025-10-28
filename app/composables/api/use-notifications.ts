import { handleError, internalServerError } from 'api-client/api-error';
import type {
  Notification,
  NotificationList,
  NotificationOptions
} from '~~/types/notification';
import { NOTIFICATIONS } from '~~/constants/api-paths';

/** TODO: replace this with an implementation of handleError whenever api-client is fixed (Stephane).
 *  https://scbd.atlassian.net/browse/CIR-139
 */
const handleErrorState = ({
  error,
  ...rest
}: {
  [key: string]: any;
  error: any;
}) => {
  if (error.value) throw error.value;
  return rest;
};

export default function useNotificationsApi() {
  const getNotifications = async (
    options?: NotificationOptions
  ): Promise<NotificationList> => {
    const { data } = await useFetch<NotificationList>(NOTIFICATIONS, {
      params: {
        sort: options?.sort,
        limit: options?.limit,
        skip: options?.skip
      }
    }).then(handleErrorState);

    const response = data.value ?? { total: 0, rows: [] };

    return {
      total: response.total,
      rows: response.rows.map((notification: Notification) => ({
        ...notification,
        createdOn: new Date(notification.createdOn),
        endOn: new Date(notification.endOn),
        updatedOn: new Date(notification.updatedOn),
        actionOn: new Date(notification.actionOn),
        deadlineOn: new Date(notification.deadlineOn)
      }))
    };
  };

  return { getNotifications };
}
