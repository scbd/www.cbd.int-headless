import { handleError, internalServerError } from 'api-client/api-error';
import type { rest } from 'lodash';
import type { Meeting, MeetingList, MeetingOptions } from '~~/types/meeting';

/** TODO: replace this with a implement handleError whenever api-client is fixed (Stephane).
 *  https://scbd.atlassian.net/browse/CIR-139
 */

function throwOnError({ error, ...rest }: { error: any; [key: string]: any }) {
  // if (error.value) throw error.value;

  if (error.value) rest = { error: true, ...rest };
  return rest;
}

export default function useMeetingsApi() {
  const getMeetings = async (
    options?: MeetingOptions
  ): Promise<{ error: boolean; total: number; rows: Meeting[] }> => {
    const { data, error } = await useFetch<MeetingList>('/api/meetings', {
      params: {
        sort: options?.sort,
        limit: options?.limit,
        skip: options?.skip,
      },
    }).then(throwOnError);

    const response = data.value || { total: 0, rows: [] };

    const meetings: MeetingList = {
      total: response.total,
      rows: response.rows.map((meeting: Meeting) => ({
        ...meeting,
        startOn: new Date(meeting.startOn),
        endOn: new Date(meeting.endOn),
        updatedOn: new Date(meeting.updatedOn),
      })),
    };

    return { error, ...meetings };
  };

  return { getMeetings };
}
