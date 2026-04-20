import type { Meeting } from '~~/types/meeting'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { MEETINGS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { mandatory } from 'api-client/api-error'

export function getMeetingList (options?: MaybeRef<QueryParams>): ReturnType<typeof useAsyncData<SearchResult<Meeting>>> {
  return useAsyncData<SearchResult<Meeting>>(
    computed(() => `meetings-${JSON.stringify(unref(options))}`),
    () => $fetch<SearchResult<Meeting>>(MEETINGS, { params: unref(options) }),
    {
      lazy: true,
      default: () => ({ total: 0, rows: [] as Meeting[] }),
      transform: (data) => ({ rows: data.rows.map(item => normalizeObjectDates(item)), total: data.total })
    }
  )
}

export function getMeeting (code: MaybeRef<string>): ReturnType<typeof useAsyncData<Meeting | undefined>> {
  return useAsyncData<Meeting>(
    computed(() => `meeting-${unref(code) as string}`),
    () => {
      const c = unref(code) as string
      if (c === '' || c === undefined) { throw mandatory('code is mandatory') }
      return $fetch<Meeting>(`${MEETINGS}/${encodeURIComponent(c)}`)
    },
    {
      lazy: true,
      transform: normalizeObjectDates
    }
  )
}
