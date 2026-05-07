/**
 * Soak test — 50 VUs for 35 minutes.
 *
 * Purpose: detect issues that only appear under sustained load:
 *   - Memory leaks in Nuxt / Nitro process (watch Node.js RSS)
 *   - LRU cache churn: Nitro max 100 items, app-level max 50 per service
 *   - TCP connection pool exhaustion or leak
 *   - Gradual latency creep (p95 at minute 5 vs minute 30)
 *
 * Before running: set up external monitoring for Nuxt process memory
 * (see STRESS-TEST-PLAN.md § 9).
 *
 * Run: k6 run scenarios/soak.ts
 */
import type { Options } from 'k6/options'
import { group, sleep } from 'k6'
import { SOAK_THRESHOLDS } from '../config/thresholds.ts'
import { randomBetween, randomInt } from '../utils/random.ts'

import { testHealthcheck } from '../tests/healthcheck.ts'
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
import { testHomePage, testDynamicPage, testSearchPage } from '../tests/pages/ssr-pages.ts'

export const options: Options = {
  stages: [
    { duration: '1m', target: 50 }, // ramp up
    { duration: '30m', target: 50 }, // sustained soak
    { duration: '1m', target: 0 } // ramp down
  ],
  thresholds: SOAK_THRESHOLDS
}

// Full spread across all endpoints to exercise the LRU cache eviction
const SCENARIOS = [
  { weight: 15, fn: (): void => { testMenuByCode(); testAllRecentUpdates() } },
  { weight: 10, fn: (): void => { testHomePage() } },
  { weight: 10, fn: (): void => { testAllMeetings() } },
  { weight: 10, fn: (): void => { testAllNotifications() } },
  { weight: 8, fn: (): void => { testSearchPage(); testAllSearch() } },
  { weight: 8, fn: (): void => { testDynamicPage(); testAllContent() } },
  { weight: 7, fn: (): void => { testAllDecisions() } },
  { weight: 7, fn: (): void => { testAllStatements() } },
  { weight: 5, fn: (): void => { testAllArticles() } },
  { weight: 5, fn: (): void => { testAllPressReleases() } },
  { weight: 5, fn: (): void => { testAllCountries() } },
  { weight: 4, fn: (): void => { testGbfTargets(); testAllSubjects() } },
  { weight: 3, fn: (): void => { testAllNbsaps() } },
  { weight: 3, fn: (): void => { testHealthcheck() } }
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
  group('soak', () => {
    pickScenario()()
  })
  sleep(randomBetween(1, 2))
}
