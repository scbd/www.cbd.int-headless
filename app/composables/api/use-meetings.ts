import { handleError, internalServerError } from 'api-client/api-error';
import type { rest } from 'lodash';
import type { MeetingList, MeetingOptions } from '~~/types/meeting';

// TODO: replace this with a implement handleError whenever api-client is fixed (Stephane).
function throwOnError({ error, ...rest }) {
  if (error.value) throw error.value;

  return rest;
};

export default function useMeetingsApi() {
  const getMeetings = async (
    options?: MeetingOptions
  ): Promise<MeetingList> => {
    const { data, error } = await useFetch<MeetingList>('/api/meetings', {
      params: {
        sort: options?.sort,
        limit: options?.limit,
        skip: options?.skip
      },
    }).then(throwOnError);

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
