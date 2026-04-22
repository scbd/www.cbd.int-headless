import type { Nbsap } from '~~/types/nbsap'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { NBSAPS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { mandatory } from 'api-client/api-error'

export function useNbsaps (): {
  getNbsapList: (options?: MaybeRef<QueryParams>) => ReturnType<typeof useAsyncData<SearchResult<Nbsap>>>
  getNbsap: (code: MaybeRef<string>) => ReturnType<typeof useAsyncData<Nbsap | undefined>>
} {
  function getNbsapList (options?: MaybeRef<QueryParams>): ReturnType<typeof useAsyncData<SearchResult<Nbsap>>> {
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

  function getNbsap (code: MaybeRef<string>): ReturnType<typeof useAsyncData<Nbsap | undefined>> {
    return useAsyncData<Nbsap>(
      computed(() => `nbsap-${unref(code) as string}`),
      () => {
        const c = unref(code) as string
        if (c === '' || c === undefined) { throw mandatory('code', 'code is mandatory') }
        return $fetch<Nbsap>(`${NBSAPS}/${encodeURIComponent(c)}`)
      },
      {
        lazy: true,
        transform: normalizeObjectDates
      }
    )
  }
  return { getNbsapList, getNbsap }
}
