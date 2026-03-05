import type { Nbsap } from '~~/types/nbsap'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { NBSAPS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { mandatory } from 'api-client/api-error'

export default async function useNbsapsListApi (
  options?: ComputedRef<QueryParams> | Ref<QueryParams>
): Promise<{ nbsaps: ComputedRef<{ rows: Nbsap[], total: number }>, error: Ref<Error | undefined> }> {
  const { data, error } = await useFetch<SearchResult<Nbsap>>(NBSAPS, {
    params: computed(() => ({
      sort: options?.value.sort,
      limit: options?.value.limit,
      skip: options?.value.skip,
      fieldQueries: options?.value.fieldQueries
    })),
    default: () => ({ total: 0, rows: [] })
  })

  const nbsaps = computed(() => ({
    rows: data.value.rows.map(row => normalizeObjectDates(row)),
    total: data.value.total
  }))

  return { nbsaps, error }
}

export async function useNbsapApi (code: string): Promise<{ nbsaps: ComputedRef<{ rows: Nbsap[], total: number }>, error: Ref<Error | undefined> }> {
  if (code === undefined || code === null) { throw mandatory('code is mandatory') }

  const { data, error } = await useFetch<Nbsap>(`${NBSAPS}/${code}`)

  const nbsaps = computed(() => {
    const rows = data.value != null ? [normalizeObjectDates(data.value)] : []
    return { rows, total: rows.length }
  })

  return { nbsaps, error }
}
