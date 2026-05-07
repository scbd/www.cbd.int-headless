/**
 * Solr isolated load tests.
 *
 * Purpose: measure Solr's own query performance, bypassing Nuxt entirely.
 * Run: k6 run --env API_BASE_URL=https://api.cbd.int tests/solr/direct.ts
 *
 * Key metric: the `QTime` field in Solr responses is recorded as a custom
 * Trend metric for direct comparison with wall-clock http_req_duration.
 */
import type { Options } from 'k6/options'
import { group, sleep, check } from 'k6'
import { Trend } from 'k6/metrics'
import http from 'k6/http'
import { API_BASE_URL, DEFAULT_HEADERS } from '../../config/env.ts'
import { randomBetween, randomItem } from '../../utils/random.ts'
import { DECISION_CODES, MEETING_CODES } from '../../fixtures/index.ts'
import { STANDARD_THRESHOLDS } from '../../config/thresholds.ts'

export const options: Options = {
  stages: [
    { duration: '1m', target: 20 },
    { duration: '3m', target: 20 },
    { duration: '30s', target: 0 }
  ],
  thresholds: STANDARD_THRESHOLDS
}

const solrQTime = new Trend('solr_qtime_ms', true)

const SOLR_URL = `${API_BASE_URL}/api/v2013/index/select`

function solrQuery (body: Record<string, unknown>, endpoint: string): void {
  const res = http.post(SOLR_URL, JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json', ...DEFAULT_HEADERS },
    tags: { endpoint, layer: 'solr' }
  })

  const ok = check(res, {
    [`solr ${endpoint} status 200`]: (r) => r.status === 200,
    [`solr ${endpoint} no error`]: (r) => {
      try {
        const json = r.json() as Record<string, unknown>
        const header = json.responseHeader as Record<string, unknown> | undefined
        return header?.status === 0
      } catch {
        return false
      }
    }
  })

  if (ok === true) {
    try {
      const json = res.json() as Record<string, unknown>
      const header = json.responseHeader as Record<string, unknown> | undefined
      const qtime = Number(header?.QTime ?? 0)
      solrQTime.add(qtime, { endpoint })
    } catch {
      // ignore parse errors
    }
  }
}

function testSolrDecisionsList (): void {
  solrQuery({
    df: 'text_EN_txt',
    fq: 'schema_s:decision',
    q: '*.*',
    sort: 'updatedDate_dt DESC',
    fl: 'id,symbol_s,title_EN_t',
    wt: 'json',
    start: 0,
    rows: 10
  }, 'solr_decisions')
}

function testSolrDecisionByCode (): void {
  const code = randomItem(DECISION_CODES)
  solrQuery({
    df: 'text_EN_txt',
    fq: 'schema_s:decision',
    q: `symbol_s:${code}`,
    wt: 'json',
    start: 0,
    rows: 1
  }, 'solr_decision_item')
}

function testSolrMeetingsList (): void {
  solrQuery({
    df: 'text_EN_txt',
    fq: 'schema_s:meeting',
    q: '*.*',
    sort: 'startDate_dt ASC',
    fl: 'id,symbol_s,title_EN_t,startDate_dt,endDate_dt',
    wt: 'json',
    start: 0,
    rows: 10
  }, 'solr_meetings')
}

function testSolrMeetingByCode (): void {
  const code = randomItem(MEETING_CODES)
  solrQuery({
    df: 'text_EN_txt',
    fq: 'schema_s:meeting',
    q: `symbol_s:${code}`,
    wt: 'json',
    start: 0,
    rows: 1
  }, 'solr_meeting_item')
}

function testSolrNotificationsList (): void {
  solrQuery({
    df: 'text_EN_txt',
    fq: 'schema_s:notification',
    q: '*.*',
    sort: 'updatedDate_dt DESC',
    fl: 'id,symbol_s,title_EN_t',
    wt: 'json',
    start: 0,
    rows: 10
  }, 'solr_notifications')
}

function testSolrRecentUpdates (): void {
  solrQuery({
    df: 'text_EN_txt',
    fq: '(schema_s:meeting) OR (schema_s:notification) OR (schema_s:statement AND _state_s:public)',
    q: '*:*',
    sort: 'updatedDate_dt DESC',
    fl: 'id,schema_s,symbol_s,title_EN_t,updatedDate_dt',
    wt: 'json',
    start: 0,
    rows: 10
  }, 'solr_recent_updates')
}

export default function (): void {
  group('solr direct', () => {
    testSolrDecisionsList()
    testSolrDecisionByCode()
    testSolrMeetingsList()
    testSolrMeetingByCode()
    testSolrNotificationsList()
    testSolrRecentUpdates()
  })
  sleep(randomBetween(0.5, 1.5))
}
