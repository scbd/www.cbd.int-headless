import type { MeetingList } from '~~/types/meeting';
import type { MeetingOptions } from '~~/types/meeting';

export default function useMeetingsApi() {
  const getMeetings = async (
    options?: MeetingOptions
  ): Promise<MeetingList> => {
    const response = await useFetch('/api/meetings', {
      method: 'GET',
      params: {
        sort: options?.sort,
        limit: options?.limit,
        skip: options?.skip,
      },
    });

    const meetings: MeetingList = response.data.value || {
      total: 0,
      rows: [],
    };

    return meetings;
  };

  return { getMeetings };
}
