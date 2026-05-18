// ---------------------------------------------------------------------------
// TEST FIXTURES — replace placeholder values with real data before running
// ---------------------------------------------------------------------------

// SSR page aliases (used by tests/pages/ssr-pages.ts)
// Pattern: absolute path from root, no trailing slash
export const PAGE_ALIASES: string[] = [
  '/gbf/introduction/background',
  '/gbf/vision-mission',
  '/gbf/goals',
  '/gbf/targets',
  '/gbf/decisions',
  '/gbf/decisions/monitoring',
  '/gbf/targets/1',
  '/gbf/targets/2',
  '/gbf/targets/3',
  '/gbf/targets/4',
  '/gbf/targets/5',
  '/gbf/targets/6',
  '/gbf/targets/7',
  '/gbf/targets/8',
  '/gbf/targets/9',
  '/gbf/targets/10',
  '/gbf/targets/11',
  '/gbf/targets/12',
  '/gbf/targets/13',
  '/gbf/targets/14',
  '/gbf/targets/15',
  '/gbf/targets/16',
  '/gbf/targets/17',
  '/gbf/targets/18',
  '/gbf/targets/19',
  '/gbf/targets/20',
  '/gbf/targets/21',
  '/gbf/targets/22',
  '/gbf/targets/23',
  '/convention',
  '/convention/about/text-of-the-convention',
  '/convention/about/idb',
  '/convention/about/secretariat/staff/executive-secretary',
  '/convention/areas-of-work',
  '/convention/bodies',
  '/convention/decisions',
  '/convention/parties',
  '/convention/parties/focal-points',
  '/convention/parties/status-of-contribution',
  '/convention/resources',
  '/convention/resources/global-biodiversity-outlook',
  '/convention/resources/CBD-handbook'
]

// Article path aliases (used by tests/pages/ssr-pages.ts + tests/api/content.ts)
export const ARTICLE_ALIASES: string[] = [
  '/article/2026-NationalReports',
  '/article/2026-CaliFund',
  '/article/2025-08-09-Int-Day-World-IndigenousPeoples',
  '/article/Publication-Guide-to-Cali-Fund',
  '/article/idb-2025-nudges',
  '/article/g7-canada-kananaskis-summit-2025-new',
  '/article/new-regional-capacity-development-support-programme-2025',
  '/article/mother-earth-day-2025',
  '/article/aarhus-convention-gmo-amendment-2025',
  '/article/cop16-resumed-session-closing-2025'
]

// Meeting symbol codes
export const MEETING_CODES: string[] = [
  'SYN-AHTEG-2026-01',
  'NP-CC-05',
  'NP-CB-IAC-2026-01',
  'CCB-OM-2026-03',
  'CP-CC-21',
  'CCB-OM-2026-04',
  'CP-LG-15',
  'NP-ABSCH-IAC-06',
  'SBSTTA-28',
  'SBI-07',
  'CP-BCH-RA-WS-2026-01',
  'COP-17',
  'NP-MOP-06',
  'CP-MOP-12'
]

// Notification symbol codes
export const NOTIFICATION_CODES: string[] = [
  '2026-035',
  '2026-034',
  '2026-033',
  '2026-032',
  '2026-031',
  '2026-030',
  '2026-029',
  '2026-028',
  '2026-027',
  '2026-026',
  '2026-025',
  '2026-024',
  '2026-023',
  '2026-022',
  '2026-021',
  '2026-020',
  '2026-019',
  '2026-018',
  '2026-017',
  '2026-016',
  '2026-015',
  '2026-014',
  '2026-013',
  '2026-012',
  '2026-011',
  '2026-010'
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
