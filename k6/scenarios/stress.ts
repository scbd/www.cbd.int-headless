/**
 * Stress test — finds the breaking point.
 *
 * Ramps VUs in 4 stages up to 500. Watch for the VU count where:
 *   - http_req_failed rate exceeds 5%
 *   - http_req_duration p99 approaches 9 000 ms (API timeout)
 *   - http_req_blocked p95 spikes (TCP connection pool exhaustion)
 *
 * Record the VU count at each failure mode — that is your capacity limit.
 *
 * Run: k6 run scenarios/stress.ts
 */
import type { Options } from 'k6/options'
import { group, sleep } from 'k6'
import { STRESS_THRESHOLDS } from '../config/thresholds'
import { randomBetween, randomInt } from '../utils/random'

import { testHealthcheck } from '../tests/healthcheck'
import { testMenuByCode } from '../tests/api/menus'
import { testAllMeetings } from '../tests/api/meetings'
import { testAllNotifications } from '../tests/api/notifications'
import { testAllDecisions } from '../tests/api/decisions'
import { testAllSearch } from '../tests/api/search'
import { testAllRecentUpdates } from '../tests/api/recent-updates'
import { testHomePage } from '../tests/pages/ssr-pages'

export const options: Options = {
  stages: [
    { duration: '2m', target: 100 }, // stage 1
    { duration: '4m', target: 200 }, // stage 2
    { duration: '4m', target: 350 }, // stage 3
    { duration: '4m', target: 500 }, // stage 4 — maximum stress
    { duration: '5m', target: 500 }, // hold at max
    { duration: '5m', target: 0 } // ramp down — watch for recovery
  ],
  thresholds: STRESS_THRESHOLDS
}

const SCENARIOS = [
  { weight: 30, fn: (): void => { testMenuByCode(); testAllRecentUpdates() } },
  { weight: 20, fn: (): void => { testAllMeetings() } },
  { weight: 15, fn: (): void => { testHomePage() } },
  { weight: 15, fn: (): void => { testAllNotifications() } },
  { weight: 10, fn: (): void => { testAllSearch() } },
  { weight: 10, fn: (): void => { testAllDecisions() } }
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
  group('stress', () => {
    testHealthcheck()
    pickScenario()()
  })
  sleep(randomBetween(0.5, 1.0))
}
