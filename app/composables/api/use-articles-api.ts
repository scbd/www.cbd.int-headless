import type { Article } from '~~/types/content'
import type { QueryParams } from '~~/types/api/query-params'
import { CONTENT, ARTICLES } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

export async function useArticleApi (url: string): Promise<{ article: Article | undefined, error: Ref<Error | undefined> }> {
  const { data, error } = await useFetch<Article>(CONTENT, {
    params: { url }
  })

  const article = data.value !== null ? normalizeObjectDates(data.value) : undefined

  return { article, error }
}

export default async function useArticleListApi (
  options?: ComputedRef<QueryParams> | Ref<QueryParams>
): Promise<{
    articles: ComputedRef<{ rows: Article[], total: number }>
    error: Ref<Error | undefined>
  }> {
  const { data, error } = await useFetch<{ rows: Article[], total: number }>(ARTICLES, {
    params: computed(() => ({
      sort: options?.value.sort,
      limit: options?.value.limit,
      skip: options?.value.skip,
      search: options?.value.search
    })),
    default: () => ({ total: 0, rows: [] })
  })

  const articles = computed(() => ({
    rows: data.value.rows.map((row) => normalizeObjectDates(row)),
    total: data.value.total
  }))

  return { articles, error }
}
