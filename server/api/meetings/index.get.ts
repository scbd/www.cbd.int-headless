import type { MeetingList } from "../../../types/meeting";
import type { QueryParams } from "../../../types/api/query-params";
import MeetingService from "../../../services/meeting";

export default defineEventHandler(async (event) => {
    const { sort, limit, skip } = getQuery(event) as QueryParams;
    return await MeetingService.listMeetings({ sort, limit, skip }) as MeetingList;
});