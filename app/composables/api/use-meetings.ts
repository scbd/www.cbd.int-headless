import type { Meeting } from '~~/types/meeting'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { MEETINGS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { mandatory } from 'api-client/api-error'

export default async function useMeetingsListApi (options?: ComputedRef<QueryParams> | Ref<QueryParams>): Promise<{ meetings: ComputedRef<{ rows: Meeting[], total: number }>, error: Ref<Error | undefined> }> {
  const { data, error } = await useFetch<SearchResult<Meeting>>(MEETINGS, {
    params: computed(() => ({
      sort: options?.value.sort,
      limit: options?.value.limit,
      skip: options?.value.skip,
      fieldQueries: options?.value.fieldQueries,
      startDate: options?.value.startDate,
      endDate: options?.value.endDate
    })),
    default: () => ({ total: 0, rows: [] })
  })

  const meetings = computed(() => ({
    rows: (data.value.rows).map(row => normalizeObjectDates(row)),
    total: data.value.total
  }))

  return { meetings, error }
}

export async function useMeetingsApi (code: string): Promise<{ meetings: ComputedRef<{ rows: Meeting[], total: number }>, error: Ref<Error | undefined> }> {
  if (code === undefined || code === null) { throw mandatory('code is mandatory') }

  const { data, error } = await useFetch<Meeting>(`${MEETINGS}/${code}`)

  const meetings = computed(() => {
    const rows = data.value != null ? [normalizeObjectDates(data.value)] : []
    return { rows, total: rows.length }
  })

  return { meetings, error }
}