import type { Article, ArticleOptions } from '~~/types/content'
import { ARTICLES } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

const handleErrorState = ({
  error,
  ...rest
}: {
  [key: string]: any
  error: any
}): { [key: string]: any } => {
  if (error.value === null || error.value === undefined) {
    return rest
  } else {
    throw error.value
  }
}

export default function useArticlesApi (): { getArticles: (options?: ArticleOptions) => Promise<Article[]> } {
  const getArticles = async (options?: ArticleOptions): Promise<Article[]> => {
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
