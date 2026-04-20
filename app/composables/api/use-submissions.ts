import type { Submission } from '~~/types/notification'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { SUBMISSIONS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { mandatory } from 'api-client/api-error'

export function getSubmissionList (code: MaybeRef<string>, options?: MaybeRef<QueryParams>): ReturnType<typeof useAsyncData<SearchResult<Submission>>> {
  return useAsyncData<SearchResult<Submission>>(
    computed(() => `submissions-${unref(code) as string}-${JSON.stringify(unref(options))}`),
    () => {
      const c = unref(code) as string
      if (c === '') { throw mandatory('code', 'code is mandatory') }
      return $fetch<SearchResult<Submission>>(`${SUBMISSIONS}/${encodeURIComponent(c)}`, { params: unref(options) })
    },
    {
      lazy: true,
      default: () => ({ total: 0, rows: [] as Submission[] }),
      transform: (data) => ({ rows: data.rows.map(item => normalizeObjectDates(item)), total: data.total })
    }
  )
}
