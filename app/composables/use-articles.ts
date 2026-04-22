import type { Article } from '~~/types/content'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { CONTENT, ARTICLES } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { mandatory } from 'api-client/api-error'

export function useArticles (): {
  getArticleList: (options?: MaybeRef<QueryParams>) => ReturnType<typeof useAsyncData<SearchResult<Article>>>
  getArticle: (url: MaybeRef<string>) => ReturnType<typeof useAsyncData<Article | undefined>>
} {
  function getArticleList (options?: MaybeRef<QueryParams>): ReturnType<typeof useAsyncData<SearchResult<Article>>> {
    return useAsyncData<SearchResult<Article>>(
      computed(() => `articles-${JSON.stringify(unref(options))}`),
      () => $fetch<SearchResult<Article>>(ARTICLES, { params: unref(options) }),
      {
        lazy: true,
        default: () => ({ total: 0, rows: [] as Article[] }),
        transform: (data) => ({ rows: data.rows.map(item => normalizeObjectDates(item)), total: data.total })
      }
    )
  }

  function getArticle (url: MaybeRef<string>): ReturnType<typeof useAsyncData<Article | undefined>> {
    return useAsyncData<Article | undefined>(
      computed(() => `article-${unref(url) as string}`),
      () => {
        const u = unref(url) as string
        if (u === '' || u === undefined) throw mandatory('url', 'url is mandatory')
        return $fetch<Article>(CONTENT, { params: { url: u } })
      },
      { lazy: true, transform: (data) => data === null ? undefined : normalizeObjectDates(data) }
    )
  }

  return { getArticleList, getArticle }
}
