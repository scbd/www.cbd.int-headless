import { group } from 'k6'
import { BASE_URL } from '../../config/env.ts'
import { apiGet } from '../../utils/http.ts'
import { randomItem } from '../../utils/random.ts'
import { NBSAP_CODES } from '../../fixtures/index.ts'

export function testNbsapsList (): void {
  apiGet(`${BASE_URL}/api/nbsaps`, {
    endpoint: 'nbsaps',
    params: { limit: 10, skip: 0 }
  })
}

export function testNbsapByCode (): void {
  const code = randomItem(NBSAP_CODES)
  apiGet(`${BASE_URL}/api/nbsaps/${encodeURIComponent(code)}`, { endpoint: 'nbsaps' })
}

export function testAllNbsaps (): void {
  group('api/nbsaps', () => {
    testNbsapsList()
    testNbsapByCode()
  })
}
