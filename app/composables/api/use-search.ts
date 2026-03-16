// app/composables/api/use-search.ts
import type { Content, Article } from '~~/types/content'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'
import { SEARCH } from '~~/constants/api-paths'
import normalizeObjectDates from '~~/utils/normalize-object-dates'

export default async function useSearchApi (
  options?: ComputedRef<QueryParams> | Ref<QueryParams>
): Promise<{
    results: ComputedRef<{ rows: Array<Content | Article>, total: number }>
    error: Ref<Error | undefined>
  }> {
  const params = computed(() => ({
    sort: options?.value.sort,
    limit: options?.value.limit,
    skip: options?.value.skip,
    search: options?.value.search
  }))

  const { data, error } = await useFetch<SearchResult<Content | Article>>(SEARCH, {
    params,
    default: () => ({ total: 0, rows: [] })
  })

  const results = computed(() => {
    const response = data.value ?? { rows: [], total: 0 }
    return {
      rows: (response.rows ?? []).map(r => normalizeObjectDates(r)),
      total: response.total ?? 0
    }
  })

  return { results, error: error as Ref<Error | undefined> }
}
