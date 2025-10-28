import { handleError, internalServerError } from 'api-client/api-error';
import type { Meeting, MeetingList, MeetingOptions } from '~~/types/meeting';
import { MEETINGS } from '~~/constants/api-paths';

/** TODO: replace this with an implementation of handleError whenever api-client is fixed (Stephane).
 *  https://scbd.atlassian.net/browse/CIR-139
 */
const handleErrorState = ({
  error,
  ...rest
}: {
  [key: string]: any;
  error: any;
}) => {
  if (error.value) throw error.value;
  return { ...rest };
};

export default function useMeetingsApi() {
  const getMeetings = async (
    options?: MeetingOptions
  ): Promise<MeetingList> => {
    const { data } = await useFetch<MeetingList>(MEETINGS, {
      params: {
        sort: options?.sort,
        limit: options?.limit,
        skip: options?.skip
      }
    }).then(handleErrorState);

    const response = data.value ?? { total: 0, rows: [] };

    return {
      total: response.total,
      rows: response.rows.map((meeting: Meeting) => ({
        ...meeting,
        startOn: new Date(meeting.startOn),
        endOn: new Date(meeting.endOn),
        updatedOn: new Date(meeting.updatedOn)
      }))
    };
  };

  return { getMeetings };
}
