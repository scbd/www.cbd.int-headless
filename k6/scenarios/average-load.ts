/**
 * Average load test — simulates normal daily traffic.
 *
 * Baseline: 10,000 page views/day = ~7 page views/min avg.
 * 50 VUs with ~1-2 s think time produces ~25-50 req/s.
 * This exceeds the average (~0.12 req/s) but tests the caching
 * layer under sustained concurrent load.
 *
 * Run: k6 run scenarios/average-load.ts
 */
import type { Options } from 'k6/options'
import { group, sleep } from 'k6'
import { STANDARD_THRESHOLDS } from '../config/thresholds.ts'
import { randomBetween, randomInt } from '../utils/random.ts'

import { testHealthcheck } from '../tests/healthcheck.ts'
import { testHomePage, testDynamicPage, testSearchPage, testMeetingsPage } from '../tests/pages/ssr-pages.ts'
import { testMenuByCode } from '../tests/api/menus.ts'
import { testAllArticles } from '../tests/api/articles.ts'
import { testAllMeetings } from '../tests/api/meetings.ts'
import { testAllNotifications } from '../tests/api/notifications.ts'
import { testAllDecisions } from '../tests/api/decisions.ts'
import { testAllCountries } from '../tests/api/countries.ts'
import { testGbfTargets } from '../tests/api/gbf-targets.ts'
import { testAllSearch } from '../tests/api/search.ts'
import { testAllStatements } from '../tests/api/statements.ts'
import { testAllPressReleases } from '../tests/api/press-releases.ts'
import { testAllRecentUpdates } from '../tests/api/recent-updates.ts'
import { testAllNbsaps } from '../tests/api/nbsaps.ts'
import { testAllSubjects } from '../tests/api/subjects.ts'
import { testAllContent } from '../tests/api/content.ts'
import { testAllPortals } from '../tests/api/portals.ts'

export const options: Options = {
  stages: [
    { duration: '1m', target: 50 }, // ramp up
    { duration: '5m', target: 50 }, // steady state
    { duration: '1m', target: 0 } // ramp down
  ],
  thresholds: STANDARD_THRESHOLDS
}

// Weighted scenario distribution — mirrors realistic user behaviour
const SCENARIOS = [
  // High-frequency: every page loads menu + recent updates
  { weight: 20, fn: (): void => { testMenuByCode(); testAllRecentUpdates() } },
  // Home page
  { weight: 15, fn: (): void => { testHomePage() } },
  // Content browsing
  { weight: 10, fn: (): void => { testDynamicPage(); testAllContent() } },
  // Meetings (large meeting = high traffic spike endpoint)
  { weight: 10, fn: (): void => { testMeetingsPage(); testAllMeetings() } },
  // Search
  { weight: 10, fn: (): void => { testSearchPage(); testAllSearch() } },
  // Notifications
  { weight: 8, fn: (): void => { testAllNotifications() } },
  // Decisions
  { weight: 7, fn: (): void => { testAllDecisions() } },
  // Statements + press releases
  { weight: 5, fn: (): void => { testAllStatements(); testAllPressReleases() } },
  // Articles
  { weight: 5, fn: (): void => { testAllArticles() } },
  // Reference data (countries, GBF targets, subjects)
  { weight: 5, fn: (): void => { testAllCountries(); testGbfTargets(); testAllSubjects() } },
  // NBSAP + portals
  { weight: 5, fn: (): void => { testAllNbsaps(); testAllPortals() } }
]

const TOTAL_WEIGHT = SCENARIOS.reduce((sum, s) => sum + s.weight, 0)

function pickScenario (): () => void {
  const rand = randomInt(1, TOTAL_WEIGHT)
  let acc = 0
  for (const s of SCENARIOS) {
    acc += s.weight
    if (rand <= acc) return s.fn
  }
  return SCENARIOS[0].fn
}

export default function (): void {
  group('average-load', () => {
    testHealthcheck()
    pickScenario()()
  })
  sleep(randomBetween(1, 2))
}
