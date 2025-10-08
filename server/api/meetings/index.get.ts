import type { MeetingList } from '../../../types/meeting';
import type { QueryParams } from '../../../types/api/query-params';
import MeetingService from '../../../services/meeting';

export default defineEventHandler(async (event) => {
  const { sort, limit, skip } = getQuery(event) as QueryParams;
  const meetingList = await MeetingService.listMeetings({ sort, limit, skip });
  return {
    meetingList,
    toJSON() {
      /**
       * Return the meeting list with a toJSON method due to Stringify limitations on Date objects in Nuxt 3
       * Affects @param meetingList.rows date fields
       */
      return {
        ...meetingList,
      };
    },
  };
});
