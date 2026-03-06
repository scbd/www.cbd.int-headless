import type { PressRelease } from '~~/types/press-release'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { PRESS_RELEASES } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

export default async function usePressReleasesApi (options?: QueryParams): Promise<{ pressReleases: PressRelease[], error: Ref<Error | undefined> }> {
  const { data, error } = await useFetch<SearchResult<PressRelease>>(PRESS_RELEASES, {
    params: {
      sort: options?.sort,
      limit: options?.limit,
      skip: options?.skip
    },
    default: () => ({ total: 0, rows: [] })
  })

  const pressReleases = data.value.rows.map(row => normalizeObjectDates(row))

  return { pressReleases, error }
}
