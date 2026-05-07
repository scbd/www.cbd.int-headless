// __ENV is a k6 global — no import needed
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __ENV: Record<string, string>

export const BASE_URL: string = __ENV.BASE_URL ?? 'https://preview-www.cbd.int'

// Direct service URLs for isolated stack tests — override via k6 --env
export const DRUPAL_BASE_URL: string = __ENV.DRUPAL_BASE_URL ?? 'http://drupal'
export const API_BASE_URL: string = __ENV.API_BASE_URL ?? 'https://api.cbd.int'

export const DEFAULT_HEADERS: Record<string, string> = {
  Accept: 'application/json',
  'Accept-Language': 'en'
}

export const SSR_HEADERS: Record<string, string> = {
  Accept: 'text/html,application/xhtml+xml',
  'Accept-Language': 'en-GB,en;q=0.9',
  'Cache-Control': 'no-cache'
}
