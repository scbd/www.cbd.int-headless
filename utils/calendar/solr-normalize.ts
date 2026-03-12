/**
 * SOLR field-name normalization utilities.
 *
 * Converts raw SOLR field names with type suffixes (e.g. `governingBodies_ss`,
 * `startDateCOA_dt`) to camelCase property names. Also normalizes full
 * documents by transforming every key.
 *
 * Ported from `@scbd/calendar-of-activities-and-actions/shared/services/solr.ts`
 * and kept private to `utils/calendar/` — only consumed by `document-processing.ts`.
 */

const solrSuffixes = ['_ss', '_ds', '_dt', '_txt', '_s', '_t', '_b', '_i', '_ls', '_l', '_d'];

const isAllUpperCase = (segment: string): boolean =>
  segment.toUpperCase() === segment && segment.toLowerCase() !== segment;

const stripSolrSuffix = (field: string): string => {
  const lowerField = field.toLowerCase();

  for (const suffix of solrSuffixes) {
    if (lowerField.endsWith(suffix)) {
      return field.slice(0, -suffix.length);
    }
  }
  return field;
};

const camelizeSegments = (segments: string[]): string => {
  if (segments.length === 0) {
    return '';
  }

  return segments
    .map((segment, index) => {
      if (index === 0) {
        if (!segment) {
          return segment;
        }
        if (isAllUpperCase(segment)) {
          return segment.toLowerCase();
        }
        return segment.charAt(0).toLowerCase() + segment.slice(1);
      }

      const lower = segment.toLowerCase();

      if (!lower) {
        return lower;
      }
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
};

/**
 * Normalize a raw SOLR field name to camelCase.
 *
 * @example
 * normalizeSolrFieldName('governingBodies_ss') // → 'governingBodies'
 * normalizeSolrFieldName('startDateCOA_dt')    // → 'startDateCOA'
 * normalizeSolrFieldName('title_EN_t')         // → 'titleEn'
 */
export const normalizeSolrFieldName = (field: string): string => {
  if (field.startsWith('_')) {
    return field;
  }

  const withoutSuffix = stripSolrSuffix(field);
  const segments = withoutSuffix.split('_').filter(Boolean);

  if (segments.length === 0) {
    return withoutSuffix;
  }
  return camelizeSegments(segments);
};

/**
 * Normalize every key in a SOLR document from raw field names to camelCase.
 * Merges duplicate keys that normalize to the same name.
 */
export const normalizeSolrDocument = <T extends Record<string, unknown>>(doc: T): Record<string, unknown> => {
  const normalized: Record<string, unknown> = {};

  for (const [rawKey, value] of Object.entries(doc)) {
    const key = normalizeSolrFieldName(rawKey);

    if (!(key in normalized)) {
      normalized[key] = value;
      continue;
    }

    const existing = normalized[key];

    if (Array.isArray(existing)) {
      const candidates = Array.isArray(value) ? value : [value];
      const filtered = candidates.filter(item => item !== undefined && item !== null);

      for (const candidate of filtered) {
        if (!existing.some(entry => entry === candidate)) {
          existing.push(candidate);
        }
      }
      continue;
    }

    if (Array.isArray(value)) {
      normalized[key] = (value as unknown[]).slice();
      continue;
    }

    if (existing === null || existing === undefined) {
      normalized[key] = value;
    }
  }

  return normalized;
};
