import type { Nbsap } from '~~/types/nbsap'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { NBSAPS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { mandatory } from 'api-client/api-error'

export function getNbsapList (options?: MaybeRef<QueryParams>): ReturnType<typeof useAsyncData<SearchResult<Nbsap>>> {
  return useAsyncData<SearchResult<Nbsap>>(
    computed(() => `nbsaps-${JSON.stringify(unref(options))}`),
    () => $fetch<SearchResult<Nbsap>>(NBSAPS, { params: unref(options) }),
    {
      lazy: true,
      default: () => ({ total: 0, rows: [] as Nbsap[] }),
      transform: (data) => ({ rows: data.rows.map(item => normalizeObjectDates(item)), total: data.total })
    }
  )
}

export function getNbsap (code: MaybeRef<string>): ReturnType<typeof useAsyncData<Nbsap | undefined>> {
  const c = unref(code) as string
  if (c === '') { throw mandatory('code is mandatory') }
  return useAsyncData<Nbsap>(
    computed(() => `nbsap-${c}`),
    () => $fetch<Nbsap>(`${NBSAPS}/${c}`),
    {
      lazy: true,
      transform: normalizeObjectDates
    }
  )
}
