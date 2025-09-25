import NotificationService from "../../services/notification";
import type { Notification, NotificationList } from "../../types/notification";

export default defineEventHandler(async (event) => {
    const { notificationCode } = getQuery(event) as { notificationCode: string };
    if(!notificationCode) { 
        return await NotificationService.listNotifications() as NotificationList;
    } else {
        return await NotificationService.getNotification(notificationCode) as Notification;
    };
});