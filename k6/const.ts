// ---------------------------------------------------------------------------
// TEST FIXTURES — replace placeholder values with real data before running
// ---------------------------------------------------------------------------

// SSR page aliases (used by tests/pages/ssr-pages.ts)
// Pattern: absolute path from root, no trailing slash
export const PAGE_ALIASES: string[] = [
  '/convention/about-the-convention', // REPLACE
  '/convention/history', // REPLACE
  '/convention/parties', // REPLACE
  '/programme-work', // REPLACE
  '/resources' // REPLACE
]

// Article path aliases (used by tests/pages/ssr-pages.ts + tests/api/content.ts)
export const ARTICLE_ALIASES: string[] = [
  '/news/article-placeholder-1', // REPLACE
  '/news/article-placeholder-2', // REPLACE
  '/news/article-placeholder-3' // REPLACE
]

// Meeting symbol codes (e.g. CBD/COP/15)
export const MEETING_CODES: string[] = [
  'CBD/COP/15', // REPLACE
  'CBD/SBI/4', // REPLACE
  'CBD/SBSTTA/25' // REPLACE
]

// Notification symbol codes
export const NOTIFICATION_CODES: string[] = [
  'CBD/SBSTTA/24/1', // REPLACE
  'CBD/SBI/4/1' // REPLACE
]

// Decision symbol codes
export const DECISION_CODES: string[] = [
  'COP-15-3', // REPLACE
  'COP-15-4' // REPLACE
]

// Statement symbol codes
export const STATEMENT_CODES: string[] = [
  'SCBD/SHSM/2024/001', // REPLACE
  'SCBD/SHSM/2024/002' // REPLACE
]

// Press release symbol codes
export const PRESS_RELEASE_CODES: string[] = [
  'CBD-PR-2024-001', // REPLACE
  'CBD-PR-2024-002' // REPLACE
]

// NBSAP unique identifier codes
export const NBSAP_CODES: string[] = [
  'CBD-NBSAP-2024-001', // REPLACE
  'CBD-NBSAP-2024-002' // REPLACE
]

// ISO 3166 country codes (2-letter)
export const COUNTRY_CODES: string[] = [
  'CA', 'FR', 'BR', 'CN', 'IN', 'DE', 'US', 'AU', 'ZA', 'MX'
]

// Thesaurus subject domains
export const SUBJECT_DOMAINS: string[] = [
  'ABS', // REPLACE/verify domain names
  'BIODIVERSITY', // REPLACE/verify
  'CLIMATE-CHANGE' // REPLACE/verify
]

// Notification codes that have submissions
export const SUBMISSION_NOTIFICATION_CODES: string[] = [
  'CBD/SBSTTA/24/1' // REPLACE — must match a notification with submissions
]

// Drupal menu codes
export const MENU_CODES: string[] = [
  'cbd-header', // REPLACE/verify menu machine names in Drupal
  'cbd-footer', // REPLACE
  'cbd-sidebar' // REPLACE
]

// Drupal portal menu codes (used by /api/portals)
export const PORTAL_CODES: string[] = [
  'cbd-header' // REPLACE
]

// Image category + code pairs for /api/images/[category]/[code]
export const IMAGE_FIXTURES: Array<{ category: string, code: string }> = [
  { category: 'meetings', code: 'CBD/COP/15' }, // REPLACE
  { category: 'notifications', code: 'CBD/SBSTTA/24/1' }, // REPLACE
  { category: 'statements', code: 'SCBD/SHSM/2024/001' } // REPLACE
]

// Search terms (varied to avoid identical cache keys)
export const SEARCH_TERMS: string[] = [
  'biodiversity',
  'climate',
  'genetic resources',
  'oceans',
  'protected areas'
]
