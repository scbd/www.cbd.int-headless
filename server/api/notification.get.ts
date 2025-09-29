import type { NotificationList } from "../../types/notification";
import type { QueryParams } from "../../types/api/query-params";
import NotificationService from "../../services/notification";

export default defineEventHandler(async (event) => {
    const { code, sort, limit, skip } = getQuery(event) as QueryParams;
    return await NotificationService.listNotifications(
        code,
        sort, 
        limit, 
        skip
    ) as NotificationList;
});