import type { Decision } from '~~/types/decision'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { DECISIONS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

export default async function useDecisionsApi (options?: QueryParams): Promise<{ decisions: Decision[], error: Ref<Error | undefined> }> {
  const { data, error } = await useFetch<SearchResult<Decision>>(DECISIONS, {
    params: {
      sort: options?.sort,
      limit: options?.limit,
      skip: options?.skip
    },
    default: () => ({ total: 0, rows: [] })
  })

  const decisions = data.value.rows.map(row => normalizeObjectDates(row))

  return { decisions, error }
}
