import { group } from 'k6'
import { BASE_URL } from '../../config/env'
import { apiGet } from '../../utils/http'
import { randomItem } from '../../utils/random'
import { COUNTRY_CODES } from '../../const'

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
