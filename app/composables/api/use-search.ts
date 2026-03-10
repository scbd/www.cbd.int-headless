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

  const { data: articles, error: articlesError } = await useFetch<SearchResult<Article>>(ARTICLES, {
    params,
    default: () => ({ total: 0, rows: [] })
  })

  const { data: pages, error: pagesError } = await useFetch<SearchResult<Content>>(PAGES, {
    params,
    default: () => ({ total: 0, rows: [] })
  })

  const error = computed(() => articlesError.value || pagesError.value)

  const results = computed(() => {
    const allRows = [
      ...articles.value.rows.map(r => normalizeObjectDates(r)),
      ...pages.value.rows.map(r => normalizeObjectDates(r))
    ]
    return {
      rows: allRows,
      total: articles.value.total + pages.value.total
    }
  })

  return { results, error: error as Ref<Error | undefined> }
}