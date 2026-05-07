import { group } from 'k6'
import { BASE_URL } from '../../config/env.ts'
import { apiGet } from '../../utils/http.ts'
import { randomItem } from '../../utils/random.ts'
import { MENU_CODES } from '../../fixtures/index.ts'

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
