import type { Meeting, MeetingList } from "../../types/meeting";
import MeetingService from "../../services/meeting";

export default defineEventHandler(async (event) => {
    const { meetingCode } = getQuery(event) as { meetingCode: string };
    const { sort } = getQuery(event) as { sort: string };
    const { rowsPerPage } = getQuery(event) as { rowsPerPage: number };
    const { start } = getQuery(event) as { start: number };
    
    return await MeetingService.listMeetings(
        meetingCode,
        sort, 
        rowsPerPage, 
        start
    ) as MeetingList;
});