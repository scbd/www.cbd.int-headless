import type { Article } from '~~/types/content'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { CONTENT, ARTICLES } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { mandatory } from 'api-client/api-error'

export function getArticleList (options?: MaybeRef<QueryParams>): ReturnType<typeof useAsyncData<SearchResult<Article>>> {
  return useAsyncData<SearchResult<Article>>(
    computed(() => `articles-${JSON.stringify(unref(options))}`),
    () => $fetch<SearchResult<Article>>(ARTICLES, { params: unref(options) }),
    {
      default: () => ({ total: 0, rows: [] as Article[] }),
      transform: (data) => ({ rows: data.rows.map(item => normalizeObjectDates(item)), total: data.total })
    }
  )
}

export function getArticle (url: MaybeRef<string>): ReturnType<typeof useAsyncData<Article | undefined>> {
  const u = unref(url) as string
  if (u === '') { throw mandatory('url is mandatory') }
  return useAsyncData<Article>(
    computed(() => `article-${u}`),
    () => $fetch<Article>(CONTENT, { params: { url: u } }),
    { transform: normalizeObjectDates }
  )
}
