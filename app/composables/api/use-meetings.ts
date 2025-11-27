import type { Meeting } from '~~/types/meeting'
import type { QueryParams, QueryList } from '~~/types/api/query-params'
import { MEETINGS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { handleErrorState } from '~~/utils/api-error-handler'

export default function useMeetingsApi (): { getMeetings: (options?: QueryParams) => Promise<QueryList<Meeting>> } {
  const getMeetings = async (
    options?: QueryParams
  ): Promise<QueryList<Meeting>> => {
    const { data } = await useFetch<QueryList<Meeting>>(MEETINGS, {
      params: {
        sort: options?.sort,
        limit: options?.limit,
        skip: options?.skip
      }
    }).then(handleErrorState)

    const response: QueryList<Meeting> = data.value

    return {
      total: response.total,
      rows: response.rows.map((meeting: Meeting) =>
        normalizeObjectDates(meeting)
      )
    }
  }

  return { getMeetings }
}
