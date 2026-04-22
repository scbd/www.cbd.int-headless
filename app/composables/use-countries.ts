import type { Country } from '~~/types/country'
import type { SearchResult } from '~~/types/api/search-result'
import { COUNTRIES } from '~~/constants/api-paths'

export function useCountries (): {
  getCountryList: () => ReturnType<typeof useAsyncData<SearchResult<Country>>>
} {
  function getCountryList (): ReturnType<typeof useAsyncData<SearchResult<Country>>> {
    return useAsyncData<SearchResult<Country>>(
      'countries',
      () => $fetch<SearchResult<Country>>(COUNTRIES),
      {
        lazy: true,
        default: () => ({ total: 0, rows: [] as Country[] })
      }
    )
  }

  return { getCountryList }
}
