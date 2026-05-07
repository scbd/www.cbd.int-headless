import { group } from 'k6'
import { BASE_URL } from '../../config/env.ts'
import { apiGet } from '../../utils/http.ts'
import { randomItem } from '../../utils/random.ts'
import { SEARCH_TERMS } from '../../fixtures/index.ts'

// NOTE: merges articles + pages from Drupal — two parallel Drupal queries.
// Generates a new cache key per unique search term.

export function testSearch (): void {
  const term = randomItem(SEARCH_TERMS)
  apiGet(`${BASE_URL}/api/search`, {
    endpoint: 'search',
    params: { search: term, limit: 10, skip: 0 }
  })
}

export function testSearchPaginated (): void {
  const term = randomItem(SEARCH_TERMS)
  apiGet(`${BASE_URL}/api/search`, {
    endpoint: 'search',
    params: { search: term, limit: 10, skip: 10 }
  })
}

export function testSearchNoQuery (): void {
  apiGet(`${BASE_URL}/api/search`, {
    endpoint: 'search',
    params: { limit: 10, skip: 0 }
  })
}

export function testAllSearch (): void {
  group('api/search', () => {
    testSearch()
    testSearchPaginated()
    testSearchNoQuery()
  })
}
