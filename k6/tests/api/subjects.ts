import { group } from 'k6'
import { BASE_URL } from '../../config/env'
import { apiGet } from '../../utils/http'
import { randomItem } from '../../utils/random'
import { SUBJECT_DOMAINS } from '../../const'

export function testSubjectsByDomain (): void {
  const domain = randomItem(SUBJECT_DOMAINS)
  apiGet(`${BASE_URL}/api/subjects/${encodeURIComponent(domain)}`, { endpoint: 'subjects' })
}

export function testAllSubjects (): void {
  group('api/subjects', () => {
    testSubjectsByDomain()
  })
}
