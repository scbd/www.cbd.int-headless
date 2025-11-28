import type { Meeting } from '~~/types/meeting'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { MEETINGS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { handleErrorState } from '~~/utils/api-error-handler'

export default function useMeetingsApi (): { getMeetings: (options?: QueryParams) => Promise<SearchResult<Meeting>> } {
  const getMeetings = async (
    options?: QueryParams
  ): Promise<SearchResult<Meeting>> => {
    const { data } = await useFetch<SearchResult<Meeting>>(MEETINGS, {
      params: {
        sort: options?.sort,
        limit: options?.limit,
        skip: options?.skip
      }
    }).then(handleErrorState)

    const response: SearchResult<Meeting> = data.value

    return {
      total: response.total,
      rows: response.rows.map((meeting: Meeting) =>
        normalizeObjectDates(meeting)
      )
    }
  }

  return { getMeetings }
}
