import type { Meeting } from "../../../types/meeting";
import type { QueryParams } from "../../../types/api/query-params";
import MeetingService from "../../../services/meeting";

export default defineEventHandler(async (event) => {
    const code = getRouterParam(event, 'code') || "";
    const { sort, limit, skip } = getQuery(event) as QueryParams;
    return await MeetingService.getMeeting(code) as Meeting;
});