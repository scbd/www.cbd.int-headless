import type { PressRelease } from '~~/types/press-release'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { PRESS_RELEASES } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { mandatory } from 'api-client/api-error'

export function getPressReleaseList (options?: MaybeRef<QueryParams>): ReturnType<typeof useAsyncData<SearchResult<PressRelease>>> {
  return useAsyncData<SearchResult<PressRelease>>(
    computed(() => `press-releases-${JSON.stringify(unref(options))}`),
    () => $fetch<SearchResult<PressRelease>>(PRESS_RELEASES, { params: unref(options) }),
    {
      default: () => ({ total: 0, rows: [] as PressRelease[] }),
      transform: (data) => ({ rows: data.rows.map(item => normalizeObjectDates(item)), total: data.total })
    }
  )
}

export function getPressRelease (code: MaybeRef<string>): ReturnType<typeof useAsyncData<PressRelease | undefined>> {
  if (code === undefined || code === null) { throw mandatory('code is mandatory') }
  return useAsyncData<PressRelease>(
    computed(() => `press-release-${unref(code) as string}`),
    () => $fetch<PressRelease>(`${PRESS_RELEASES}/${unref(code) as string}`),
    { transform: normalizeObjectDates }
  )
}
