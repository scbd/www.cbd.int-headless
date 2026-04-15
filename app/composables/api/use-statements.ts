import type { Statement } from '~~/types/statement'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { STATEMENTS } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { mandatory } from 'api-client/api-error'

export function getStatementList (options?: MaybeRef<QueryParams>): ReturnType<typeof useAsyncData<SearchResult<Statement>>> {
  return useAsyncData<SearchResult<Statement>>(
    computed(() => `statements-${JSON.stringify(unref(options))}`),
    () => $fetch<SearchResult<Statement>>(STATEMENTS, { params: unref(options) }),
    {
      default: () => ({ total: 0, rows: [] as Statement[] }),
      transform: (data) => ({ rows: data.rows.map(item => normalizeObjectDates(item)), total: data.total })
    }
  )
}

export function getStatement (code: MaybeRef<string>): ReturnType<typeof useAsyncData<Statement | undefined>> {
  if (code === undefined || code === null) { throw mandatory('code is mandatory') }
  return useAsyncData<Statement>(
    computed(() => `statement-${unref(code) as string}`),
    () => $fetch<Statement>(`${STATEMENTS}/${unref(code) as string}`),
    { transform: normalizeObjectDates }
  )
}
