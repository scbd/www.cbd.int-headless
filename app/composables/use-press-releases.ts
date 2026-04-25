import type { PressRelease } from '~~/types/press-release'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { PRESS_RELEASES } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { mandatory } from 'api-client/api-error'
import { emptyKey } from '~~/utils/solr'

export function usePressReleases (): {
  getPressReleaseList: (options?: MaybeRef<QueryParams>) => ReturnType<typeof useAsyncData<SearchResult<PressRelease>>>
  getPressRelease: (code: MaybeRef<string>) => ReturnType<typeof useAsyncData<PressRelease | undefined>>
} {
  function getPressReleaseList (options?: MaybeRef<QueryParams>): ReturnType<typeof useAsyncData<SearchResult<PressRelease>>> {
    return useAsyncData<SearchResult<PressRelease>>(
      computed(() => `press-releases-${JSON.stringify(unref(options))}`),
      () => $fetch<SearchResult<PressRelease>>(PRESS_RELEASES, { params: unref(options) }),
      {
        lazy: true,
        default: () => ({ total: 0, rows: [] as PressRelease[] }),
        transform: (data) => ({ rows: data.rows.map(item => normalizeObjectDates(item)), total: data.total })
      }
    )
  }

  function getPressRelease (code: MaybeRef<string>): ReturnType<typeof useAsyncData<PressRelease | undefined>> {
    return useAsyncData<PressRelease>(
      computed(() => `press-release-${unref(code) as string}`),
      () => {
        const c = unref(code) as string
        if (emptyKey(c)) { throw mandatory('code', 'code is mandatory') }
        return $fetch<PressRelease>(`${PRESS_RELEASES}/${encodeURIComponent(c)}`)
      },
      {
        lazy: true,
        transform: normalizeObjectDates
      }
    )
  }

  return { getPressReleaseList, getPressRelease }
}
