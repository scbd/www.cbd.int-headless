import type { CalendarDoc } from '~/types/calendar-activity';
import { getDocStringValue } from './document-processing';

// ---------------------------------------------------------------------------
// Status equivalence mapping
// ---------------------------------------------------------------------------

/**
 * Maps thesaurus status identifiers to their equivalent SOLR short codes.
 *
 * Some SOLR documents store an abbreviated code (e.g. `CONFIRM`) while
 * others store the full thesaurus identifier (e.g. `NCHM-EVENT-STATUS-CONFIRMED`).
 * Both forms must be treated as the same status for filtering and display.
 */
export const STATUS_EQUIVALENCES: ReadonlyArray<{
  thesaurusId: string;
  solrCode: string;
}> = [
  { thesaurusId: 'NCHM-EVENT-STATUS-CONFIRMED', solrCode: 'CONFIRM' },
  { thesaurusId: 'NCHM-EVENT-STATUS-TENTATIVE', solrCode: 'TENTAT' },
  { thesaurusId: 'NCHM-EVENT-STATUS-POSTPONED', solrCode: 'POST' },
  { thesaurusId: 'NCHM-EVENT-STATUS-CANCELLED', solrCode: 'CANCEL' },
  { thesaurusId: 'NCHM-EVENT-STATUS-COMPLETED', solrCode: 'COMPLETED' },
];

/**
 * SOLR status codes always treated as "Completed" in facet counts.
 */
export const COMPLETED_FACET_ALIASES: readonly string[] = ['NOT_SET', 'NODATE'];

/**
 * Additional SOLR status codes to include when querying for Completed.
 */
export const COMPLETED_QUERY_ALIASES: readonly string[] = [
  ...COMPLETED_FACET_ALIASES,
  'CONFIRM',
  'NCHM-EVENT-STATUS-CONFIRMED',
];

/** Lookup from any status value to its full set of equivalent values. */
const STATUS_ALIAS_MAP: ReadonlyMap<string, readonly string[]> = (() => {
  const map = new Map<string, readonly string[]>();

  for (const { thesaurusId, solrCode } of STATUS_EQUIVALENCES) {
    const aliases = Object.freeze([thesaurusId, solrCode]);

    map.set(thesaurusId, aliases);
    map.set(solrCode, aliases);
  }

  const completedEntry = map.get('NCHM-EVENT-STATUS-COMPLETED');

  if (completedEntry) {
    const extended = Object.freeze([...completedEntry, ...COMPLETED_QUERY_ALIASES]);

    map.set('NCHM-EVENT-STATUS-COMPLETED', extended);
    map.set('COMPLETED', extended);

    for (const alias of COMPLETED_FACET_ALIASES) {
      map.set(alias, extended);
    }
  }

  return map;
})();

/**
 * Expand an array of selected status values so that each value also includes
 * its equivalent form. This ensures the SOLR query matches documents storing
 * either the short code or the full thesaurus identifier.
 *
 * @example
 * expandStatusValuesForQuery(['NCHM-EVENT-STATUS-CONFIRMED'])
 * // => ['NCHM-EVENT-STATUS-CONFIRMED', 'CONFIRM']
 */
export function expandStatusValuesForQuery(values: string[]): string[] {
  const expanded = new Set<string>();

  for (const value of values) {
    const aliases = STATUS_ALIAS_MAP.get(value);

    if (aliases) {
      for (const alias of aliases) {
        expanded.add(alias);
      }
    } else {
      expanded.add(value);
    }
  }

  return [...expanded];
}

/**
 * Normalize a status label or thesaurus identifier to an uppercase key used for filtering.
 * @param label - Raw status label or thesaurus identifier.
 * @returns Normalized status key.
 */
export function normalizeStatusKey(label: string | undefined): string | null {
  if (!label) return null;
  const value = String(label).trim().toLowerCase();

  if (!value) return null;

  // Handle thesaurus-style identifiers (e.g., NCHM-EVENT-STATUS-CONFIRMED)
  const thesaurusMatch = value.match(/^nchm[-_](?:event[-_])?status[-_](.+)$/i);

  if (thesaurusMatch) {
    const statusPart = thesaurusMatch[1]!.replace(/[-_]+/g, '_').toUpperCase();

    if (statusPart === 'CONFIRMED') return 'CONFIRMED';
    if (statusPart === 'TENTATIVE') return 'TENTATIVE';
    if (statusPart === 'COMPLETED') return 'COMPLETED';
    if (statusPart === 'ONGOING') return 'ONGOING';
    if (statusPart === 'TO_BE_CONFIRMED' || statusPart === 'TBC') return 'TO_BE_CONFIRMED';
    return statusPart;
  }

  // Full English labels
  if (value === 'confirmed') return 'CONFIRMED';
  if (value === 'tentative') return 'TENTATIVE';
  if (value === 'completed') return 'COMPLETED';
  if (value === 'ongoing') return 'ONGOING';
  if (value === 'to be confirmed' || value === 'tbc') return 'TO_BE_CONFIRMED';

  // SOLR abbreviated short codes (status_s values)
  if (value === 'confirm') return 'CONFIRMED';
  if (value === 'tentat') return 'TENTATIVE';
  if (value === 'post') return 'POSTPONED';
  if (value === 'cancel') return 'CANCELLED';

  return value.replace(/\s+/g, '_').toUpperCase();
}

/**
 * Produce a human-readable status label.
 * @param key - Normalized status key.
 * @param fallback - Optional fallback label.
 * @returns Display label.
 */
export function normalizeStatusLabel(key: string | null | undefined, fallback?: string): string {
  if (key) {
    const normalized = String(key).toLowerCase();
    const labels: Record<string, string> = {
      confirmed: 'Confirmed',
      tentative: 'Tentative',
      completed: 'Completed',
      ongoing: 'Ongoing',
      postponed: 'Postponed',
      cancelled: 'Cancelled',
      to_be_confirmed: 'To be confirmed',
    };

    const match = labels[normalized];

    if (match) {
      return match;
    }
  }

  if (typeof fallback === 'string' && fallback.trim().length > 0) {
    return fallback.trim();
  }
  return key ? String(key) : '';
}

/**
 * Derive the bootstrap status color for a document.
 * @param doc - Calendar document.
 * @returns Bootstrap color key.
 */
export function statusColor(doc: CalendarDoc): string {
  const rawStatus = getDocStringValue(doc, 'status');
  const keyRaw = getDocStringValue(doc, 'statusKey');

  const normalizedKey = keyRaw?.toUpperCase() ?? normalizeStatusKey(rawStatus) ?? '';

  switch (normalizedKey) {
    case 'COMPLETED':
      return 'success';
    case 'CONFIRMED':
      return 'primary';
    case 'TO_BE_CONFIRMED':
      return 'warning';
    case 'ONGOING':
      return 'info';
    default:
      return 'secondary';
  }
}
