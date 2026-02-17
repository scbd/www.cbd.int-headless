import type { Meeting } from '~~/types/meeting'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { MEETINGS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

export default async function useMeetingsApi (options?: QueryParams): Promise<{ meetings: Meeting[], error: Ref<Error | undefined> }> {
  const { data, error } = await useFetch<SearchResult<Meeting>>(MEETINGS, {
    params: {
      sort: options?.sort,
      limit: options?.limit,
      skip: options?.skip
    },
    default: () => ({ total: 0, rows: [] })
  })

  const meetings = data.value.rows.map(row => normalizeObjectDates(row))

  return { meetings, error }
}
