import type { Meeting, MeetingList } from "../../types/meeting";
import type { QueryParams } from "../../types/api/query-params";
import MeetingService from "../../services/meeting";

export default defineEventHandler(async (event) => {
    const { code, sort, limit, skip } = getQuery(event) as QueryParams;
    return await MeetingService.listMeetings(code, sort, limit, skip) as MeetingList;
});