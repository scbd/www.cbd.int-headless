import { group } from 'k6'
import { BASE_URL } from '../../config/env'
import { apiGet } from '../../utils/http'
import { randomItem } from '../../utils/random'
import { PRESS_RELEASE_CODES } from '../../const'

// NOTE: list endpoint triggers Solr + N Drupal image requests (fan-out).

export function testPressReleasesList (): void {
  apiGet(`${BASE_URL}/api/press-releases`, {
    endpoint: 'press_releases',
    params: { limit: 10, skip: 0 }
  })
}

export function testPressReleasesListSorted (): void {
  apiGet(`${BASE_URL}/api/press-releases`, {
    endpoint: 'press_releases',
    params: { sort: 'updatedDate_dt DESC', limit: 10, skip: 0 }
  })
}

export function testPressReleaseByCode (): void {
  const code = randomItem(PRESS_RELEASE_CODES)
  apiGet(`${BASE_URL}/api/press-releases/${encodeURIComponent(code)}`, { endpoint: 'press_releases' })
}

export function testAllPressReleases (): void {
  group('api/press-releases', () => {
    testPressReleasesList()
    testPressReleasesListSorted()
    testPressReleaseByCode()
  })
}
