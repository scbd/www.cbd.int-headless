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

export default async function useArticleListApi (options?: QueryParams): Promise<{ articles: Article[], error: Ref<Error | undefined> }> {
  const { data, error } = await useFetch<Article[]>(ARTICLES, {
    params: {
      sort: options?.sort,
      limit: options?.limit,
      skip: options?.skip
    },
    default: () => []
  })

  const articles = data.value.map((row) => normalizeObjectDates(row))

  return { articles, error }
}
