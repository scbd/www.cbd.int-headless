import http from 'k6/http'
import { check } from 'k6'
import type { RefinedResponse, ResponseType } from 'k6/http'
import { DEFAULT_HEADERS, SSR_HEADERS } from '../config/env'

export interface RequestOptions {
  endpoint: string // tag used in thresholds, e.g. 'meetings'
  layer?: string // 'api' | 'ssr' | 'drupal' | 'solr' | 'cbd-api'
  params?: Record<string, string | number | boolean>
  expectStatus?: number
  expectBody?: boolean
}

function buildTags (opts: RequestOptions): Record<string, string> {
  return {
    endpoint: opts.endpoint,
    layer: opts.layer ?? 'api'
  }
}

function buildQueryString (params?: Record<string, string | number | boolean>): string {
  if (params == null) return ''
  const qs = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&')
  return qs.length > 0 ? `?${qs}` : ''
}

export function apiGet (url: string, opts: RequestOptions): RefinedResponse<ResponseType> {
  const fullUrl = url + buildQueryString(opts.params)
  const res = http.get(fullUrl, {
    headers: DEFAULT_HEADERS,
    tags: buildTags(opts)
  })

  const expectedStatus = opts.expectStatus ?? 200
  check(res, {
    [`${opts.endpoint} status ${expectedStatus}`]: (r) => r.status === expectedStatus,
    ...(opts.expectBody !== false && {
      [`${opts.endpoint} has body`]: (r) => (typeof r.body === 'string' ? r.body.length : (r.body?.byteLength ?? 0)) > 0
    })
  })

  return res
}

export function ssrGet (url: string, opts: RequestOptions): RefinedResponse<ResponseType> {
  const res = http.get(url, {
    headers: SSR_HEADERS,
    tags: { ...buildTags(opts), layer: 'ssr' }
  })

  check(res, {
    [`${opts.endpoint} status 200`]: (r) => r.status === 200,
    [`${opts.endpoint} is HTML`]: (r) => (r.headers['Content-Type'] ?? '').includes('text/html')
  })

  return res
}

export function solrPost (
  url: string,
  body: Record<string, unknown>,
  opts: RequestOptions
): RefinedResponse<ResponseType> {
  const res = http.post(url, JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json', ...DEFAULT_HEADERS },
    tags: buildTags(opts)
  })

  check(res, {
    [`${opts.endpoint} status 200`]: (r) => r.status === 200,
    [`${opts.endpoint} solr no error`]: (r) => {
      try {
        const json = r.json() as Record<string, unknown>
        const header = json.responseHeader as Record<string, unknown> | undefined
        return header?.status === 0
      } catch {
        return false
      }
    }
  })

  return res
}
