import { group } from 'k6'
import { BASE_URL } from '../../config/env'
import { apiGet } from '../../utils/http'
import { randomItem } from '../../utils/random'
import { MENU_CODES } from '../../fixtures/index'

// Menus are the most-called endpoint: every SSR page load fetches at least one menu.
// SWR 900 s + 15 min app cache → should be very fast after warm-up.

export function testMenuByCode (): void {
  const code = randomItem(MENU_CODES)
  apiGet(`${BASE_URL}/api/menus/${code}`, { endpoint: 'menus' })
}

export function testMenuWithDepth (): void {
  const code = randomItem(MENU_CODES)
  apiGet(`${BASE_URL}/api/menus/${code}`, {
    endpoint: 'menus',
    params: { depth: 2 }
  })
}

export function testAllMenus (): void {
  group('api/menus', () => {
    testMenuByCode()
    testMenuWithDepth()
  })
}
