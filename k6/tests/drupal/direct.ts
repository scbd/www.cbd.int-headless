/**
 * Drupal JSON:API isolated load tests.
 *
 * Purpose: measure Drupal's own response time, bypassing Nuxt entirely.
 * Run: k6 run --env DRUPAL_BASE_URL=http://drupal.internal tests/drupal/direct.ts
 *
 * Compare results with the full-stack Nuxt API tests to isolate Drupal's
 * contribution to overall latency.
 */
import type { Options } from 'k6/options'
import { group, sleep } from 'k6'
import { DRUPAL_BASE_URL } from '../../config/env.ts'
import { apiGet } from '../../utils/http.ts'
import { randomItem, randomBetween } from '../../utils/random.ts'
import { MENU_CODES, PAGE_ALIASES, MEETING_CODES } from '../../fixtures/index.ts'
import { STANDARD_THRESHOLDS } from '../../config/thresholds.ts'

export const options: Options = {
  stages: [
    { duration: '1m', target: 20 },
    { duration: '3m', target: 20 },
    { duration: '30s', target: 0 }
  ],
  thresholds: STANDARD_THRESHOLDS
}

function testDrupalMenu (): void {
  const code = randomItem(MENU_CODES)
  apiGet(`${DRUPAL_BASE_URL}/jsonapi/menu_items/${encodeURIComponent(code)}`, {
    endpoint: 'drupal_menu',
    layer: 'drupal'
  })
}

function testDrupalArticleList (): void {
  apiGet(`${DRUPAL_BASE_URL}/jsonapi/node/article`, {
    endpoint: 'drupal_articles',
    layer: 'drupal',
    params: {
      sort: '-promote,-changed',
      'page[limit]': 10,
      'page[offset]': 0
    }
  })
}

function testDrupalPageList (): void {
  apiGet(`${DRUPAL_BASE_URL}/jsonapi/node/page`, {
    endpoint: 'drupal_pages',
    layer: 'drupal',
    params: {
      sort: '-changed',
      'page[limit]': 10,
      'page[offset]': 0
    }
  })
}

function testDrupalRoute (): void {
  const alias = randomItem(PAGE_ALIASES)
  apiGet(`${DRUPAL_BASE_URL}/router/translate-path`, {
    endpoint: 'drupal_router',
    layer: 'drupal',
    params: { path: alias }
  })
}

function testDrupalMeetingImage (): void {
  const code = randomItem(MEETING_CODES)
  apiGet(
    `${DRUPAL_BASE_URL}/jsonapi/media/meetings?filter[name][value]=${encodeURIComponent(code)}&include=field_media_image`,
    { endpoint: 'drupal_image', layer: 'drupal' }
  )
}

export default function (): void {
  group('drupal direct', () => {
    testDrupalMenu()
    testDrupalArticleList()
    testDrupalPageList()
    testDrupalRoute()
    testDrupalMeetingImage()
  })
  sleep(randomBetween(0.5, 1.5))
}
