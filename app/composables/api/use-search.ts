// app/composables/api/use-search.ts
import type { Content, Article } from '~~/types/content'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { ARTICLES, PAGES } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

export default async function useSearchApi(
  options?: ComputedRef<QueryParams> | Ref<QueryParams>
): Promise<{
  results: ComputedRef<{ rows: (Content | Article)[], total: number }>,
  error: Ref<Error | undefined>
}> {
  const params = computed(() => ({
    sort: options?.value.sort,
    limit: options?.value.limit,
    skip: options?.value.skip,
    search: options?.value.search,
  }))

  const [
    { data: articles, error: articlesError },
    { data: pages, error: pagesError }
  ] = await Promise.all([
    useFetch<SearchResult<Article>>(ARTICLES, {
      params,
      default: () => ({ total: 0, rows: [] })
    }),
    useFetch<SearchResult<Content>>(PAGES, {
      params,
      default: () => ({ total: 0, rows: [] })
    })
  ])

  const error = computed(() => articlesError.value || pagesError.value)

  const results = computed(() => {
    const articleData = articles.value ?? { rows: [], total: 0 }
    const pageData = pages.value ?? { rows: [], total: 0 }
    const allRows = [
      ...(articleData.rows ?? []).map(r => normalizeObjectDates(r)),
      ...(pageData.rows ?? []).map(r => normalizeObjectDates(r))
    ]
    return {
      rows: allRows,
      total: (articleData.total ?? 0) + (pageData.total ?? 0)
    }
  })

  return { results, error: error as Ref<Error | undefined> }
}