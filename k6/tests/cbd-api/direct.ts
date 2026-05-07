/**
 * CBD API isolated load tests.
 *
 * Purpose: measure CBD API response time for countries + thesaurus endpoints,
 * bypassing Nuxt entirely.
 * Run: k6 run --env API_BASE_URL=https://api.cbd.int tests/cbd-api/direct.ts
 */
import type { Options } from 'k6/options'
import { group, sleep } from 'k6'
import { API_BASE_URL } from '../../config/env.ts'
import { apiGet } from '../../utils/http.ts'
import { randomItem, randomBetween } from '../../utils/random.ts'
import { COUNTRY_CODES, SUBJECT_DOMAINS } from '../../fixtures/index.ts'
import { STANDARD_THRESHOLDS } from '../../config/thresholds.ts'

export const options: Options = {
  stages: [
    { duration: '1m', target: 10 },
    { duration: '3m', target: 10 },
    { duration: '30s', target: 0 }
  ],
  thresholds: STANDARD_THRESHOLDS
}

function testCbdApiCountriesList (): void {
  apiGet(`${API_BASE_URL}/api/v2015/countries`, {
    endpoint: 'cbd_api_countries',
    layer: 'cbd-api'
  })
}

function testCbdApiCountryByCode (): void {
  const code = randomItem(COUNTRY_CODES)
  apiGet(`${API_BASE_URL}/api/v2015/countries`, {
    endpoint: 'cbd_api_countries',
    layer: 'cbd-api',
    params: { 'filter[code]': code }
  })
}

function testCbdApiThesaurusGbfTargets (): void {
  apiGet(`${API_BASE_URL}/api/v2013/thesaurus/domains/GBF-TARGETS/terms`, {
    endpoint: 'cbd_api_thesaurus',
    layer: 'cbd-api'
  })
}

function testCbdApiThesaurusDomain (): void {
  const domain = randomItem(SUBJECT_DOMAINS)
  apiGet(`${API_BASE_URL}/api/v2013/thesaurus/domains/${encodeURIComponent(domain)}/terms`, {
    endpoint: 'cbd_api_thesaurus',
    layer: 'cbd-api'
  })
}

export default function (): void {
  group('cbd-api direct', () => {
    testCbdApiCountriesList()
    testCbdApiCountryByCode()
    testCbdApiThesaurusGbfTargets()
    testCbdApiThesaurusDomain()
  })
  sleep(randomBetween(1, 2))
}
