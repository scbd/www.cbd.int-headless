import { handleError, internalServerError } from 'api-client/api-error';
import type {
  Notification,
  NotificationList,
  NotificationOptions
} from '~~/types/notification';
import { API_URLS } from '~~/data/constants';

/** TODO: replace this with an implementation of handleError whenever api-client is fixed (Stephane).
 *  https://scbd.atlassian.net/browse/CIR-139
 */
const setErrorBoolean = ({
  isError,
  error,
  ...rest
}: {
  [key: string]: any;
  error: any;
}) => {
  return error.value ? { ...rest, error, isError } : rest;
};

export default function useNotificationsApi() {
  const getNotifications = async (
    options?: NotificationOptions
  ): Promise<{ isError: boolean; total: number; rows: Notification[] }> => {
    const { data, error, isError } = await useFetch<NotificationList>(
      API_URLS.NOTIFICATIONS,
      {
        params: {
          sort: options?.sort,
          limit: options?.limit,
          skip: options?.skip
        }
      }
    ).then(setErrorBoolean);

    const response = data.value || { total: 0, rows: [] };

    const notifications: NotificationList = {
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

    return { ...notifications, isError };
  };

  return { getNotifications };
}
