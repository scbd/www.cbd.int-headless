import { group } from 'k6'
import { BASE_URL } from '../../config/env.ts'
import { apiGet } from '../../utils/http.ts'
import { randomItem } from '../../utils/random.ts'
import { STATEMENT_CODES } from '../../fixtures/index.ts'

// NOTE: list endpoint triggers Solr + N Drupal image requests (fan-out).

export function testStatementsList (): void {
  apiGet(`${BASE_URL}/api/statements`, {
    endpoint: 'statements',
    params: { limit: 10, skip: 0 }
  })
}

export function testStatementsListDateFiltered (): void {
  apiGet(`${BASE_URL}/api/statements`, {
    endpoint: 'statements',
    params: {
      startDate: '2023-01-01T00:00:00Z',
      endDate: '2024-12-31T23:59:59Z',
      limit: 10,
      skip: 0
    }
  })
}

export function testStatementByCode (): void {
  const code = randomItem(STATEMENT_CODES)
  apiGet(`${BASE_URL}/api/statements/${encodeURIComponent(code)}`, { endpoint: 'statements' })
}

export function testAllStatements (): void {
  group('api/statements', () => {
    testStatementsList()
    testStatementsListDateFiltered()
    testStatementByCode()
  })
}
