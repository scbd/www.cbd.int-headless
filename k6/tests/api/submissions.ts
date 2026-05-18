import { group } from 'k6'
import { BASE_URL } from '../../config/env'
import { apiGet } from '../../utils/http'
import { randomItem } from '../../utils/random'
import { SUBMISSION_NOTIFICATION_CODES } from '../../fixtures/index'

export function testSubmissionsByNotification (): void {
  const code = randomItem(SUBMISSION_NOTIFICATION_CODES)
  apiGet(`${BASE_URL}/api/submissions/${encodeURIComponent(code)}`, { endpoint: 'submissions' })
}

export function testAllSubmissions (): void {
  group('api/submissions', () => {
    testSubmissionsByNotification()
  })
}
