import { group } from 'k6'
import { BASE_URL } from '../../config/env'
import { apiGet } from '../../utils/http'

export function testPagesList (): void {
  apiGet(`${BASE_URL}/api/pages`, {
    endpoint: 'pages_api',
    params: { limit: 10, skip: 0 }
  })
}

export function testPagesListSearch (): void {
  apiGet(`${BASE_URL}/api/pages`, {
    endpoint: 'pages_api',
    params: { search: 'convention', limit: 10, skip: 0 }
  })
}

export function testAllPages (): void {
  group('api/pages', () => {
    testPagesList()
    testPagesListSearch()
  })
}
