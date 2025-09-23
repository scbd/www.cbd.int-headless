import { Meeting, MeetingList } from "../../types/meeting";
import MeetingService from "../../services/meeting";

export default defineEventHandler(async (event) => {
    const { meetingCode } = getQuery(event) as { meetingCode: string };
    if(!meetingCode) { 
        return await MeetingService.listMeetings() as MeetingList;
    } else {
        return await MeetingService.getMeeting(meetingCode) as Meeting;
    };
});