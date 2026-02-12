import type { Article } from '~~/types/content'
import type { QueryParams } from '~~/types/api/query-params'
import { CONTENT, ARTICLES } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

export function useArticleApi (url: string): { article: ComputedRef<Article | undefined>, pending: Ref<boolean>, error: Ref<Error | undefined> } {
  const { data, pending, error } = useLazyFetch<Article>(CONTENT, {
    params: { url }
  })

  const article = computed(() => data.value !== undefined ? normalizeObjectDates(data.value) : undefined)

  return { article, pending, error }
}

export default function useArticleListApi (options?: QueryParams): { articles: ComputedRef<Article[]>, pending: Ref<boolean>, error: Ref<Error | undefined> } {
  const { data, pending, error } = useLazyFetch<Article[]>(ARTICLES, {
    params: {
      sort: options?.sort,
      limit: options?.limit,
      skip: options?.skip
    },
    default: () => []
  })

  const articles = computed(() => data.value.map((a) => normalizeObjectDates(a)))

  return { articles, pending, error }
}
