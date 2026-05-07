import { group } from 'k6'
import { BASE_URL } from '../../config/env.ts'
import { apiGet } from '../../utils/http.ts'
import { randomItem } from '../../utils/random.ts'
import { COUNTRY_CODES } from '../../fixtures/index.ts'

export function testCountriesList (): void {
  apiGet(`${BASE_URL}/api/countries`, { endpoint: 'countries' })
}

export function testCountryByCode (): void {
  const code = randomItem(COUNTRY_CODES)
  apiGet(`${BASE_URL}/api/countries/${code}`, { endpoint: 'countries' })
}

export function testAllCountries (): void {
  group('api/countries', () => {
    testCountriesList()
    testCountryByCode()
  })
}
