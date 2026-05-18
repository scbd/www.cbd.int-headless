/**
 * Smoke test — 5 VUs for 2 minutes.
 *
 * Purpose: quick sanity check that all endpoints respond correctly.
 * Run before any heavier scenario. If this fails, stop immediately.
 * Run: k6 run scenarios/smoke.ts
 */
import type { Options } from 'k6/options'
import { group, sleep } from 'k6'
import { SMOKE_THRESHOLDS } from '../config/thresholds'
import { randomBetween } from '../utils/random'

import { testHealthcheck } from '../tests/healthcheck'
import { testHomePage } from '../tests/pages/ssr-pages'
import { testMenuByCode } from '../tests/api/menus'
import { testArticlesList } from '../tests/api/articles'
import { testMeetingsList } from '../tests/api/meetings'
import { testNotificationsList } from '../tests/api/notifications'
import { testDecisionsList } from '../tests/api/decisions'
import { testCountriesList } from '../tests/api/countries'
import { testGbfTargets } from '../tests/api/gbf-targets'
import { testSearch } from '../tests/api/search'
import { testStatementsList } from '../tests/api/statements'
import { testPressReleasesList } from '../tests/api/press-releases'
import { testRecentUpdatesList } from '../tests/api/recent-updates'
import { testNbsapsList } from '../tests/api/nbsaps'

export const options: Options = {
  vus: 5,
  duration: '2m',
  thresholds: SMOKE_THRESHOLDS
}

export default function (): void {
  group('smoke', () => {
    testHealthcheck()
    testHomePage()
    testMenuByCode()
    testArticlesList()
    testMeetingsList()
    testNotificationsList()
    testDecisionsList()
    testCountriesList()
    testGbfTargets()
    testSearch()
    testStatementsList()
    testPressReleasesList()
    testRecentUpdatesList()
    testNbsapsList()
  })

  sleep(randomBetween(1, 2))
}
