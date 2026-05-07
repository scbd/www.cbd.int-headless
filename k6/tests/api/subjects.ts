import { group } from 'k6'
import { BASE_URL } from '../../config/env.ts'
import { apiGet } from '../../utils/http.ts'
import { randomItem } from '../../utils/random.ts'
import { SUBJECT_DOMAINS } from '../../fixtures/index.ts'

export function testSubjectsByDomain (): void {
  const domain = randomItem(SUBJECT_DOMAINS)
  apiGet(`${BASE_URL}/api/subjects/${encodeURIComponent(domain)}`, { endpoint: 'subjects' })
}

export function testAllSubjects (): void {
  group('api/subjects', () => {
    testSubjectsByDomain()
  })
}
