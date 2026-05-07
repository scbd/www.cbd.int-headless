/**
 * Peak load test — simulates 10× traffic spike during large meetings (e.g. COP).
 *
 * 200 VUs with 0.5–1.5 s think time = ~130–400 req/s.
 * Meeting-related endpoints are weighted heavily to mirror the spike profile.
 * The Nitro LRU (max 100 items) will evict under this traffic — watch for
 * cache-miss latency spikes in the http_req_waiting metric.
 *
 * Run: k6 run scenarios/peak-load.ts
 */
import type { Options } from 'k6/options'
import { group, sleep } from 'k6'
import { randomBetween, randomInt } from '../utils/random.ts'

import { testHealthcheck } from '../tests/healthcheck.ts'
import { testHomePage, testMeetingsPage, testNotificationsPage, testSearchPage } from '../tests/pages/ssr-pages.ts'
import { testMenuByCode } from '../tests/api/menus.ts'
import { testAllMeetings } from '../tests/api/meetings.ts'
import { testAllNotifications } from '../tests/api/notifications.ts'
import { testAllDecisions } from '../tests/api/decisions.ts'
import { testAllStatements } from '../tests/api/statements.ts'
import { testAllSearch } from '../tests/api/search.ts'
import { testAllRecentUpdates } from '../tests/api/recent-updates.ts'
import { testAllCountries } from '../tests/api/countries.ts'
import { testGbfTargets } from '../tests/api/gbf-targets.ts'
import { testAllArticles } from '../tests/api/articles.ts'
import { testAllPressReleases } from '../tests/api/press-releases.ts'

export const options: Options = {
  stages: [
    { duration: '2m', target: 200 }, // ramp up — simulates surge at meeting start
    { duration: '8m', target: 200 }, // sustained peak
    { duration: '2m', target: 0 } // ramp down
  ],
  thresholds: {
    // Relaxed slightly from standard — 10× spike is expected to be slower
    http_req_duration: ['p(95)<5000', 'p(99)<9000'],
    http_req_failed: ['rate<0.03'],
    'http_req_duration{endpoint:menus}': ['p(95)<1000'],
    'http_req_duration{endpoint:meetings}': ['p(95)<7000'],
    'http_req_duration{endpoint:notifications}': ['p(95)<7000']
  }
}

// Heavy weighting on meeting-related endpoints to simulate COP traffic
const SCENARIOS = [
  { weight: 25, fn: (): void => { testMenuByCode(); testAllRecentUpdates() } },
  { weight: 20, fn: (): void => { testMeetingsPage(); testAllMeetings() } },
  { weight: 15, fn: (): void => { testHomePage() } },
  { weight: 10, fn: (): void => { testNotificationsPage(); testAllNotifications() } },
  { weight: 10, fn: (): void => { testSearchPage(); testAllSearch() } },
  { weight: 5, fn: (): void => { testAllDecisions() } },
  { weight: 5, fn: (): void => { testAllStatements() } },
  { weight: 5, fn: (): void => { testAllArticles(); testAllPressReleases() } },
  { weight: 5, fn: (): void => { testAllCountries(); testGbfTargets() } }
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
  group('peak-load', () => {
    testHealthcheck()
    pickScenario()()
  })
  sleep(randomBetween(0.5, 1.5))
}
