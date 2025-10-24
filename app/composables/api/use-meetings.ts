import { handleError, internalServerError } from 'api-client/api-error';
import type { Meeting, MeetingList, MeetingOptions } from '~~/types/meeting';

/** TODO: replace this with an implementation of handleError whenever api-client is fixed (Stephane).
 *  https://scbd.atlassian.net/browse/CIR-139
 */
const setErrorBoolean = ({
  isError,
  error,
  ...rest
}: {
  [key: string]: any;
  error: any;
}) => {
  if (error.value) rest = { ...rest, error, isError: true };
  return rest;
};

export default function useMeetingsApi() {
  const getMeetings = async (
    options?: MeetingOptions
  ): Promise<{ isError: boolean; total: number; rows: Meeting[] }> => {
    const { data, error, isError } = await useFetch<MeetingList>(
      '/api/meetings',
      {
        params: {
          sort: options?.sort,
          limit: options?.limit,
          skip: options?.skip,
        },
      }
    ).then(setErrorBoolean);

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

    return { isError, ...meetings };
  };

  return { getMeetings };
}
