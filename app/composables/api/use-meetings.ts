import { handleError, internalServerError } from 'api-client/api-error'
import type { Meeting, MeetingList, MeetingOptions } from '~~/types/meeting'
import { MEETINGS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

/** TODO: replace this with an implementation of handleError whenever api-client is fixed (Stephane).
 *  https://scbd.atlassian.net/browse/CIR-139
 */
const handleErrorState = ({
  error,
  ...rest
}: {
  [key: string]: any
  error: any
}) => {
  if (error.value) throw error.value
  return rest
}

export default function useMeetingsApi () {
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
