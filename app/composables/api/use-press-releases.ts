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
      lazy: true,
      default: () => ({ total: 0, rows: [] as PressRelease[] }),
      transform: (data) => ({ rows: data.rows.map(item => normalizeObjectDates(item)), total: data.total })
    }
  )
}

export function getPressRelease (code: MaybeRef<string>): ReturnType<typeof useAsyncData<PressRelease | undefined>> {
  const c = unref(code) as string
  if (c === '') { throw mandatory('code is mandatory') }
  return useAsyncData<PressRelease>(
    computed(() => `press-release-${c}`),
    () => $fetch<PressRelease>(`${PRESS_RELEASES}/${c}`),
    {
      lazy: true,
      transform: normalizeObjectDates
    }
  )
}
