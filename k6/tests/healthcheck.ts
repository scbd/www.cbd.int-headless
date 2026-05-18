import { check } from 'k6'
import http from 'k6/http'
import { BASE_URL, DEFAULT_HEADERS } from '../config/env'

export function testHealthcheck (): void {
  const res = http.get(`${BASE_URL}/api/healthcheck`, {
    headers: DEFAULT_HEADERS,
    tags: { endpoint: 'healthcheck', layer: 'api' }
  })

  check(res, {
    'healthcheck status 200': (r) => r.status === 200,
    'healthcheck status ok': (r) => {
      try {
        const body = r.json() as Record<string, unknown>
        return body.status === 'ok'
      } catch {
        return false
      }
    },
    'healthcheck < 500ms': (r) => r.timings.duration < 500
  })
}
