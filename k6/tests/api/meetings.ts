import { group } from 'k6'
import { BASE_URL } from '../../config/env'
import { apiGet } from '../../utils/http'
import { randomItem } from '../../utils/random'
import { MEETING_CODES } from '../../fixtures/index'

// NOTE: list endpoint triggers 1 Solr + up to N Drupal image requests (fan-out).
// Expect higher latency than Solr-only endpoints.

export function testMeetingsList (): void {
  apiGet(`${BASE_URL}/api/meetings`, {
    endpoint: 'meetings',
    params: { limit: 10, skip: 0 }
  })
}

export function testMeetingsListFiltered (): void {
  const startDate = '2020-01-01T00:00:00Z'
  const endDate = '2024-12-31T23:59:59Z'
  apiGet(`${BASE_URL}/api/meetings`, {
    endpoint: 'meetings',
    params: { startDate, endDate, limit: 10, skip: 0 }
  })
}

export function testMeetingByCode (): void {
  const code = randomItem(MEETING_CODES)
  apiGet(`${BASE_URL}/api/meetings/${encodeURIComponent(code)}`, { endpoint: 'meetings' })
}

export function testAllMeetings (): void {
  group('api/meetings', () => {
    testMeetingsList()
    testMeetingsListFiltered()
    testMeetingByCode()
  })
}
