import type { Meeting, MeetingList, MeetingOptions } from '~~/types/meeting'
import { MEETINGS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { handleErrorState } from '~~/utils/api-states'

export default function useMeetingsApi (): { getMeetings: (options?: MeetingOptions) => Promise<MeetingList> } {
  const getMeetings = async (
    options?: MeetingOptions
  ): Promise<MeetingList> => {
    const { data } = await useFetch<MeetingList>(MEETINGS, {
      params: {
        sort: options?.sort,
        limit: options?.limit,
        skip: options?.skip
      }
    }).then(handleErrorState)

    const response: MeetingList = data.value

    return {
      total: response.total,
      rows: response.rows.map((meeting: Meeting) =>
        normalizeObjectDates(meeting)
      )
    }
  }

  return { getMeetings }
}
