import type { Country } from '~~/types/country'
import type { SearchResult } from '~~/types/api/search-result'
import { COUNTRIES } from '~~/constants/api-paths'

export default async function useCountriesApi (): Promise<{ countries: ComputedRef<SearchResult<Country>>, error: Ref<Error | undefined> }> {
  const { data, error } = await useFetch<SearchResult<Country>>(COUNTRIES, {
    default: () => ({ total: 0, rows: [] })
  })

  const countries = computed(() => ({
    rows: data.value.rows,
    total: data.value.total
  }))

  return { countries, error }
}
