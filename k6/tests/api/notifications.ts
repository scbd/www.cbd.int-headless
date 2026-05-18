import { group } from 'k6'
import { BASE_URL } from '../../config/env'
import { apiGet } from '../../utils/http'
import { randomItem } from '../../utils/random'
import { NOTIFICATION_CODES } from '../../const'

// NOTE: list endpoint triggers Solr + N Drupal image requests (fan-out).

export function testNotificationsList (): void {
  apiGet(`${BASE_URL}/api/notifications`, {
    endpoint: 'notifications',
    params: { limit: 10, skip: 0 }
  })
}

export function testNotificationsListDateFiltered (): void {
  apiGet(`${BASE_URL}/api/notifications`, {
    endpoint: 'notifications',
    params: {
      startDate: '2023-01-01T00:00:00Z',
      endDate: '2024-12-31T23:59:59Z',
      limit: 10,
      skip: 0
    }
  })
}

export function testNotificationByCode (): void {
  const code = randomItem(NOTIFICATION_CODES)
  apiGet(`${BASE_URL}/api/notifications/${encodeURIComponent(code)}`, { endpoint: 'notifications' })
}

export function testAllNotifications (): void {
  group('api/notifications', () => {
    testNotificationsList()
    testNotificationsListDateFiltered()
    testNotificationByCode()
  })
}
