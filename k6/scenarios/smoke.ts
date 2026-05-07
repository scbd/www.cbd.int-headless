/**
 * Smoke test — 5 VUs for 2 minutes.
 *
 * Purpose: quick sanity check that all endpoints respond correctly.
 * Run before any heavier scenario. If this fails, stop immediately.
 * Run: k6 run scenarios/smoke.ts
 */
import type { Options } from 'k6/options'
import { group, sleep } from 'k6'
import { SMOKE_THRESHOLDS } from '../config/thresholds.ts'
import { randomBetween } from '../utils/random.ts'

import { testHealthcheck } from '../tests/healthcheck.ts'
import { testHomePage } from '../tests/pages/ssr-pages.ts'
import { testMenuByCode } from '../tests/api/menus.ts'
import { testArticlesList } from '../tests/api/articles.ts'
import { testMeetingsList } from '../tests/api/meetings.ts'
import { testNotificationsList } from '../tests/api/notifications.ts'
import { testDecisionsList } from '../tests/api/decisions.ts'
import { testCountriesList } from '../tests/api/countries.ts'
import { testGbfTargets } from '../tests/api/gbf-targets.ts'
import { testSearch } from '../tests/api/search.ts'
import { testStatementsList } from '../tests/api/statements.ts'
import { testPressReleasesList } from '../tests/api/press-releases.ts'
import { testRecentUpdatesList } from '../tests/api/recent-updates.ts'
import { testNbsapsList } from '../tests/api/nbsaps.ts'

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
