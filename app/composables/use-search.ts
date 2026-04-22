import type { Content, Article } from '~~/types/content'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { SEARCH } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

export function useSearch (): {
  getSearchResults: (options?: MaybeRef<QueryParams>) => ReturnType<typeof useAsyncData<SearchResult<Content | Article>>>
} {
  function getSearchResults (options?: MaybeRef<QueryParams>): ReturnType<typeof useAsyncData<SearchResult<Content | Article>>> {
    return useAsyncData<SearchResult<Content | Article>>(
      computed(() => `search-${JSON.stringify(unref(options))}`),
      () => $fetch<SearchResult<Content | Article>>(SEARCH, { params: unref(options) }),
      {
        lazy: true,
        default: () => ({ total: 0, rows: [] as Array<Content | Article> }),
        transform: (data) => ({
          rows: (data.rows ?? []).map(item => normalizeObjectDates(item)),
          total: data.total ?? 0
        })
      }
    )
  }

  return { getSearchResults }
}
