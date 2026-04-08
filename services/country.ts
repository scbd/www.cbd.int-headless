import CountryApi from '~~/api/country'
import { Cache } from '~~/utils/cache'
import { mandatory, notFound } from 'api-client/api-error'
import { SOLR_CACHE_DURATION_MS, CACHE_MAX_SIZE } from '~~/constants/cache'
import type { Country } from '~~/types/country'
import type { QueryParams } from '~~/types/api/query-params'
import type { SearchResult } from '~~/types/api/search-result'

const api = new CountryApi({
  baseURL: useRuntimeConfig().apiBaseUrl
})

const cache = new Cache({ name: 'countryCache', expiry: SOLR_CACHE_DURATION_MS, maxSize: CACHE_MAX_SIZE })
cache.startPurgeTimer()

export async function listCountries (options: QueryParams): Promise<SearchResult<Country>> {
  return await searchCountries(options)
}

export async function getCountry (code: string): Promise<Country> {
  if (code === null || code === '') throw mandatory('code', 'Country code is required.')
  const data = await searchCountries({ code })

  if (data.total === 0 || data.rows[0] === null) throw notFound(`Country '${code}' not found.`)
  return data.rows[0] as Country
}

async function searchCountries (options?: QueryParams & { code?: string }): Promise<SearchResult<Country>> {
  let countries = await cache.getOrFetch('all', async () => {
    const response = await api.getCountries()

    return response.map((item: any): Country => ({
      id: item._id,
      name: item.name,
      code: item.code,
      code2: item.code2,
      code3: item.code3,
      treaties: {
        XXVII8: item.treaties?.XXVII8?.party != null,
        XXVII8a: item.treaties?.XXVII8a?.party != null,
        XXVII8b: item.treaties?.XXVII8b?.party != null,
        XXVII8c: item.treaties?.XXVII8c?.party != null
      }
    }))
  })

  if (options?.code != null && options.code !== '') {
    const code = options.code.toUpperCase()
    countries = countries.filter(c => c.code?.toUpperCase() === code || c.code2?.toUpperCase() === code || c.code3?.toUpperCase() === code)
  }

  const start = options?.skip ?? 0
  const limit = options?.limit ?? countries.length
  const paged = countries.slice(start, start + limit)

  return { total: countries.length, rows: paged }
}
