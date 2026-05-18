import { group } from 'k6'
import { BASE_URL } from '../../config/env'
import { apiGet } from '../../utils/http'

// NOTE: queries meetings + notifications + statements from Solr, plus Drupal images.

export function testRecentUpdatesList (): void {
  apiGet(`${BASE_URL}/api/recent-updates`, {
    endpoint: 'recent_updates',
    params: { limit: 10, skip: 0 }
  })
}

export function testRecentUpdatesMore (): void {
  apiGet(`${BASE_URL}/api/recent-updates`, {
    endpoint: 'recent_updates',
    params: { limit: 5, skip: 5 }
  })
}

export function testAllRecentUpdates (): void {
  group('api/recent-updates', () => {
    testRecentUpdatesList()
    testRecentUpdatesMore()
  })
}
