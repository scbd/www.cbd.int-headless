import { group } from 'k6'
import { BASE_URL } from '../../config/env'
import { apiGet } from '../../utils/http'
import { randomItem } from '../../utils/random'
import { PORTAL_CODES } from '../../fixtures/index'

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
