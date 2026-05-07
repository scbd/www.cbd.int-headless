import { group } from 'k6'
import { BASE_URL } from '../../config/env.ts'
import { apiGet } from '../../utils/http.ts'
import { randomItem } from '../../utils/random.ts'
import { PORTAL_CODES } from '../../fixtures/index.ts'

export function testPortal (): void {
  const portal = randomItem(PORTAL_CODES)
  apiGet(`${BASE_URL}/api/portals`, {
    endpoint: 'portals',
    params: { portal }
  })
}

export function testAllPortals (): void {
  group('api/portals', () => {
    testPortal()
  })
}
