import { group } from 'k6'
import { BASE_URL } from '../../config/env.ts'
import { apiGet } from '../../utils/http.ts'
import { randomItem } from '../../utils/random.ts'
import { DECISION_CODES } from '../../fixtures/index.ts'

export function testDecisionsList (): void {
  apiGet(`${BASE_URL}/api/decisions`, {
    endpoint: 'decisions',
    params: { limit: 10, skip: 0 }
  })
}

export function testDecisionsListSorted (): void {
  apiGet(`${BASE_URL}/api/decisions`, {
    endpoint: 'decisions',
    params: { sort: 'updatedDate_dt DESC', limit: 10, skip: 0 }
  })
}

export function testDecisionByCode (): void {
  const code = randomItem(DECISION_CODES)
  apiGet(`${BASE_URL}/api/decisions/${encodeURIComponent(code)}`, { endpoint: 'decisions' })
}

export function testAllDecisions (): void {
  group('api/decisions', () => {
    testDecisionsList()
    testDecisionsListSorted()
    testDecisionByCode()
  })
}
