import type { Article } from '~~/types/content'
import type { QueryParams } from '~~/types/api/query-params'
import { ARTICLES } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'
import { handleErrorState } from '~~/utils/api-error-handler'

export default function useArticlesApi (): { getArticles: (options?: QueryParams) => Promise<Article[]> } {
  const getArticles = async (options?: QueryParams): Promise<Article[]> => {
    const { data } = await useFetch<Article[]>(ARTICLES, {
      params: {
        sort: options?.sort,
        limit: options?.limit,
        skip: options?.skip
      }
    }).then(handleErrorState)

    const response: Article[] = data.value

    return response.map((article) => normalizeObjectDates(article))
  }

  return { getArticles }
}
