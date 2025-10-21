import { handleError, internalServerError } from 'api-client/api-error';
import type {
  Notification,
  NotificationList,
  NotificationOptions,
} from '~~/types/notification';

/** TODO: replace this with a implement handleError whenever api-client is fixed (Stephane).
 *  https://scbd.atlassian.net/browse/CIR-139
 */

function throwOnError({ error, ...rest }: { error: any; [key: string]: any }) {
  // if (error.value) throw error.value;

  if (error.value) rest = { error: true, ...rest };
  return rest;
}

export default function useNotificationsApi() {
  const getNotifications = async (
    options?: NotificationOptions
  ): Promise<{ error: boolean; total: number; rows: Notification[] }> => {
    const { data, error } = await useFetch<NotificationList>(
      '/api/notifications',
      {
        params: {
          sort: options?.sort,
          limit: options?.limit,
          skip: options?.skip,
        },
      }
    ).then(throwOnError);

    const response = data.value || { total: 0, rows: [] };

    const notifications: NotificationList = {
      total: response.total,
      rows: response.rows.map((notification: Notification) => ({
        ...notification,
        createdOn: new Date(notification.createdOn),
        endOn: new Date(notification.endOn),
        updatedOn: new Date(notification.updatedOn),
        actionOn: new Date(notification.actionOn),
        deadlineOn: new Date(notification.deadlineOn),
      })),
    };

    return { error, ...notifications };
  };

  return { getNotifications };
}
