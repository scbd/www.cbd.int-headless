import type { PressRelease } from '~~/types/press-release'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { PRESS_RELEASES } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { mandatory } from 'api-client/api-error'

export default async function usePressReleasesListApi (
  options?: ComputedRef<QueryParams> | Ref<QueryParams>
): Promise<{
    pressReleases: ComputedRef<{ rows: PressRelease[], total: number }>
    error: Ref<Error | undefined>
  }> {
  const { data, error } = await useFetch<SearchResult<PressRelease>>(PRESS_RELEASES, {
    params: computed(() => ({
      sort: options?.value.sort,
      limit: options?.value.limit,
      skip: options?.value.skip,
      fieldQueries: options?.value.fieldQueries
    })),
    default: () => ({ total: 0, rows: [] })
  })

  const pressReleases = computed(() => ({
    rows: data.value.rows.map(row => normalizeObjectDates(row)),
    total: data.value.total
  }))

  return { pressReleases, error }
}

export async function usePressReleasesApi (code: string): Promise<{ pressReleases: ComputedRef<{ rows: PressRelease[], total: number }>, error: Ref<Error | undefined> }> {
  if (code === undefined || code === null) { throw mandatory('code is mandatory') }

  const { data, error } = await useFetch<PressRelease>(`${PRESS_RELEASES}/${code}`)

  const pressReleases = computed(() => {
    const rows = data.value != null ? [normalizeObjectDates(data.value)] : []
    return { rows, total: rows.length }
  })

  return { pressReleases, error }
}
