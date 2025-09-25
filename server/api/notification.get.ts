import NotificationService from "../../services/notification";
import type { Notification, NotificationList } from "../../types/notification";

export default defineEventHandler(async (event) => {
    const { notificationCode } = getQuery(event) as { notificationCode: string };
    const { sort } = getQuery(event) as { sort: string };
    const { rowsPerPage } = getQuery(event) as { rowsPerPage: number };
    const { start } = getQuery(event) as { start: number };

    return await NotificationService.listNotifications(
        notificationCode,
        sort, 
        rowsPerPage, 
        start
    ) as NotificationList;
});