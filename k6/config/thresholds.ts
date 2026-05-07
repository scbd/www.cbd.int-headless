import type { Options } from 'k6/options'

type Thresholds = NonNullable<Options['thresholds']>

// Smoke / average-load: strict
export const STANDARD_THRESHOLDS: Thresholds = {
  http_req_duration: ['p(95)<3000', 'p(99)<6000'],
  http_req_failed: ['rate<0.01'],
  // Menus are cached 900 s — should always be fast
  'http_req_duration{endpoint:menus}': ['p(95)<500'],
  // Countries and GBF targets are cached in-app
  'http_req_duration{endpoint:countries}': ['p(95)<1000'],
  'http_req_duration{endpoint:gbf_targets}': ['p(95)<1500'],
  // Fan-out endpoints have higher allowance
  'http_req_duration{endpoint:meetings}': ['p(95)<5000'],
  'http_req_duration{endpoint:notifications}': ['p(95)<5000'],
  'http_req_duration{endpoint:statements}': ['p(95)<5000'],
  'http_req_duration{endpoint:press_releases}': ['p(95)<5000'],
  'http_req_duration{endpoint:recent_updates}': ['p(95)<5000'],
  // Search merges two Drupal queries
  'http_req_duration{endpoint:search}': ['p(95)<6000']
}

// Peak / stress: relaxed
export const STRESS_THRESHOLDS: Thresholds = {
  http_req_duration: ['p(95)<6000', 'p(99)<9500'],
  http_req_failed: ['rate<0.05']
}

// Smoke only: very strict
export const SMOKE_THRESHOLDS: Thresholds = {
  http_req_duration: ['p(95)<2000', 'p(99)<4000'],
  http_req_failed: ['rate<0.001']
}

// Soak: same as standard but watch for drift over 35 min
export const SOAK_THRESHOLDS: Thresholds = {
  ...STANDARD_THRESHOLDS,
  // Allow slightly more degradation at end of long run
  http_req_duration: ['p(95)<4000', 'p(99)<7000']
}
