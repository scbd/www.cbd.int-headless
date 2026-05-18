import { group } from 'k6'
import { BASE_URL } from '../../config/env'
import { apiGet } from '../../utils/http'
import { randomItem } from '../../utils/random'
import { SEARCH_TERMS } from '../../const'

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
