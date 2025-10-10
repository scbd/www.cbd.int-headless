import { handleError, internalServerError } from 'api-client/api-error';
import type { MeetingList, MeetingOptions } from '~~/types/meeting';

export default function useMeetingsApi() {
  const getMeetings = async (
    options?: MeetingOptions
  ): Promise<MeetingList> => {
    const { data, error } = await useFetch('/api/meetings', {
      method: 'GET',
      params: {
        sort: options?.sort,
        limit: options?.limit,
        skip: options?.skip,
      },
    });

    if (error.value) {
      throw internalServerError(error.value.message);
    }

    const response = data.value || { total: 0, rows: [] };

    const meetings: MeetingList = {
      total: response.total,
      rows: response.rows.map((meeting: any) => ({
        ...meeting,
        startOn: new Date(meeting.startOn),
        endOn: new Date(meeting.endOn),
        updatedOn: new Date(meeting.updatedOn),
      })),
    };

    return meetings;
  };

  return { getMeetings };
}
