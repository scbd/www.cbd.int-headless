/**
 * Calendar activity service — builds SOLR queries, fetches, normalizes, and
 * returns faceted search results for all three calendar document schemas
 * (meeting, notification, calendarActivity).
 *
 * @module services/calendar-activity
 * @see SC-01 in shared-contracts.md for response shape
 */

import { notFound } from 'api-client/api-error';
import SolrIndexApi from '~~/api/solr-index';
import {
  normalizeSolrFieldName,
  normalizeSolrDocument,
  expandStatusValuesForQuery,
} from '~~/utils/calendar';
import {
  SOLR_FACET_FIELDS,
  CALENDAR_LIST_FIELDS,
  CALENDAR_DETAIL_FIELDS,
  ITEMS_PER_PAGE,
} from '~~/constants/calendar-activities';
import type {
  CalendarSearchParams,
  CalendarSearchResult,
  CalendarDoc,
  ParsedFacets,
} from '~~/types/calendar-activity';

// ---------------------------------------------------------------------------
// API client
// ---------------------------------------------------------------------------

const api = new SolrIndexApi({
  baseURL: useRuntimeConfig().apiBaseUrl,
});

// ---------------------------------------------------------------------------
// SOLR date helper
// ---------------------------------------------------------------------------

/**
 * Convert a date string (ISO date or datetime) to a SOLR-compatible datetime.
 *
 * SOLR expects `YYYY-MM-DDTHH:mm:ssZ`. Bare dates like `2026-02-15` get
 * `T00:00:00Z` appended. Full ISO strings are returned as-is.
 */
function toSolrDateString(iso: string): string {
  if (iso.includes('T')) {
    return iso.endsWith('Z') ? iso : `${iso}Z`;
  }
  return `${iso}T00:00:00Z`;
}

// ---------------------------------------------------------------------------
// Locale helper
// ---------------------------------------------------------------------------

type LocaleCode = 'en' | 'fr' | 'es' | 'ar' | 'ru' | 'zh';

function getTextFieldForLocale(locale: LocaleCode = 'en'): string {
  return `text_${locale.toUpperCase()}_txt`;
}

// ---------------------------------------------------------------------------
// Tagged filter-query builder
// ---------------------------------------------------------------------------

function buildFilterQuery(field: string, tag: string, values: string[]): string {
  if (values.length === 1) {
    return `{!tag=${tag}}${field}:"${values[0]}"`;
  }
  const joined = values.map(v => `"${v}"`).join(' OR ');
  return `{!tag=${tag}}${field}:(${joined})`;
}

// ---------------------------------------------------------------------------
// Partial-match expansion
// ---------------------------------------------------------------------------

const STEM_PREFIX_LENGTH = 4;

function expandTermForPartialMatch(term: string): string {
  const lower = term.toLowerCase();

  // Hyphenated tokens → phrase query
  if (term.includes('-')) {
    return `"${term}"`;
  }

  if (lower.length > STEM_PREFIX_LENGTH) {
    const stemPrefix = lower.slice(0, STEM_PREFIX_LENGTH);
    return `(${term} OR ${lower}* OR ${stemPrefix}*)`;
  }

  if (lower.length === STEM_PREFIX_LENGTH) {
    return `(${term} OR ${lower}*)`;
  }

  return term;
}

// ---------------------------------------------------------------------------
// SOLR POST body definition
// ---------------------------------------------------------------------------

interface SolrSelectBody {
  df: string;
  fq: string[];
  q: string;
  sort: string;
  wt: string;
  start: number;
  rows: number;
  fl: string;
  facet: boolean;
  'facet.field': readonly string[] | string[];
  'facet.mincount': number;
  'facet.limit': number;
}

// ---------------------------------------------------------------------------
// Query builder
// ---------------------------------------------------------------------------

/**
 * Build a SOLR POST body for the calendar index.
 *
 * Includes tagged `fq` filter queries (for facet exclusion), facet fields from
 * `SOLR_FACET_FIELDS`, pagination, and partial-match text search.
 *
 * The SOLR proxy does NOT support `defType`, `qf`, or `mm` — only the
 * standard Lucene query parser with `df` and `q.op` is available.
 */
export function buildCalendarQuery(params: CalendarSearchParams = {}): SolrSelectBody {
  const {
    types,
    subjects,
    statuses,
    subsidiaryBodies,
    governingBodies,
    copDecisions,
    activityTypes,
    globalTargets,
    gbfSections,
    countries,
    startDate,
    endDate,
    actionRequired,
    searchText,
    sort = 'startDateCOA_dt asc',
    skip = 0,
    limit = ITEMS_PER_PAGE,
  } = params;

  const locale: LocaleCode = 'en';

  const fq: string[] = [
    '(_state_s:public OR (*:* NOT _state_s:*))',
    '{!tag=version}(*:* NOT version_s:*)',
    '{!tag=schemaType}schemaType_s:scbd',
  ];

  // Schema filter
  const schemas = ['meeting', 'notification', 'calendarActivity'];
  const schemaValues = types?.length ? types : schemas;
  fq.push(`{!tag=schema}schema_s:(${schemaValues.join(' OR ')})`);

  // Multi-value array filters
  const multiValueFilters: Array<{ values: string[] | undefined; field: string; tag: string }> = [
    { values: subjects, field: 'thematicArea_ss', tag: 'subjects' },
    { values: governingBodies, field: 'governingBodiesCOA_ss', tag: 'governingBody' },
    { values: subsidiaryBodies, field: 'subsidiaryBodiesCOA_ss', tag: 'subsidiaryBody' },
    { values: activityTypes, field: 'type_s', tag: 'activityType' },
    { values: globalTargets, field: 'gbfTargets_ss', tag: 'gbfTargets' },
    { values: gbfSections, field: 'gbfSections_ss', tag: 'gbfSections' },
    { values: countries, field: 'eventCountry_s', tag: 'countries' },
    { values: copDecisions, field: 'decisions_ss', tag: 'decisions' },
  ];

  for (const { values, field, tag } of multiValueFilters) {
    if (Array.isArray(values) && values.length) {
      fq.push(buildFilterQuery(field, tag, values));
    }
  }

  // Status filter — expand to both short codes and thesaurus IDs
  if (statuses?.length) {
    const expandedStatuses = expandStatusValuesForQuery(statuses);
    const statusClause = buildFilterQuery('status_s', 'status', expandedStatuses);
    const activityStatusClause = buildFilterQuery('activityStatus_s', 'status', expandedStatuses);
    const stripTag = (clause: string): string => clause.replace(/^\{!tag=[^}]+\}/, '');
    fq.push(`{!tag=status}(${stripTag(statusClause)} OR ${stripTag(activityStatusClause)})`);
  }

  // Date range — default start to 2024-01-01 when not provided
  {
    const sd = toSolrDateString(startDate || '2024-01-01');
    fq.push(
      `{!tag=startDate}(`
      + `startDateCOA_dt:[${sd} TO *]`
      + ` OR endDateCOA_dt:[${sd} TO *]`
      + ` OR ((*:* NOT startDateCOA_dt:*) AND (*:* NOT endDateCOA_dt:*) AND date_dt:[${sd} TO *])`
      + `)`,
    );
  }

  if (endDate) {
    const ed = toSolrDateString(endDate);
    fq.push(
      `{!tag=endDate}(`
      + `startDateCOA_dt:[* TO ${ed}]`
      + ` OR ((*:* NOT startDateCOA_dt:*) AND endDateCOA_dt:[* TO ${ed}])`
      + ` OR ((*:* NOT startDateCOA_dt:*) AND (*:* NOT endDateCOA_dt:*) AND date_dt:[* TO ${ed}])`
      + `)`,
    );
  }

  // Action required flag
  if (actionRequired) {
    fq.push('{!tag=actionRequired}actionRequiredByPartiesCOA_b:true');
  }

  // Text search
  let q = 'schemaType_s:scbd';

  if (searchText?.trim()) {
    const trimmed = searchText.trim();
    const hasQuotes = trimmed.includes('"');
    const hasWildcard = trimmed.includes('*');
    const hasBooleanOps = /\b(AND|OR|NOT)\b/.test(trimmed);
    const isMultiWord = trimmed.includes(' ');

    if (hasQuotes || hasWildcard || hasBooleanOps) {
      q = trimmed;
    } else if (isMultiWord) {
      const tokens = trimmed.split(/\s+/);
      q = tokens.map(t => expandTermForPartialMatch(t)).join(' AND ');
    } else {
      q = expandTermForPartialMatch(trimmed);
    }
  }

  return {
    df: getTextFieldForLocale(locale),
    fq,
    q,
    sort,
    wt: 'json',
    start: skip,
    rows: limit,
    facet: true,
    'facet.field': Object.values(SOLR_FACET_FIELDS),
    'facet.mincount': 1,
    'facet.limit': 512,
    fl: CALENDAR_LIST_FIELDS,
  };
}

// ---------------------------------------------------------------------------
// Facet parser
// ---------------------------------------------------------------------------

/**
 * Parse raw SOLR `facet_counts` into a record keyed by camelCase field name.
 * Each entry is an array of `{ value, count }` pairs; zero-count entries are
 * excluded.
 */
export function parseFacets(facetCounts?: Record<string, unknown>): ParsedFacets {
  const result: ParsedFacets = {};

  const facetFields = (facetCounts as { facet_fields?: Record<string, Array<string | number>> })?.facet_fields;
  if (!facetFields) return result;

  for (const [rawField, pairs] of Object.entries(facetFields)) {
    const cleanField = rawField.replace(/^\{!ex=[^}]+\}/, '');
    const key = normalizeSolrFieldName(cleanField);
    const parsed: Array<{ value: string; count: number }> = [];

    for (let i = 0; i < pairs.length; i += 2) {
      const value = String(pairs[i]);
      const count = Number(pairs[i + 1]) || 0;
      if (count > 0) {
        parsed.push({ value, count });
      }
    }

    result[key] = parsed;
  }

  return result;
}

// ---------------------------------------------------------------------------
// Document normalizer
// ---------------------------------------------------------------------------

const CALENDAR_ARRAY_FIELDS: ReadonlySet<string> = new Set([
  'notifications', 'meetings', 'activities',
  'subjects', 'governingBody', 'subsidiaryBody',
  'governingBodiesCOA', 'subsidiaryBodiesCOA',
  'gbfTargets', 'gbfSections', 'decisions',
  'agendaItems', 'agendaItemMeetingCodes', 'agendaItemNumbers',
  'responsibleUnitsAndOfficers',
  'hostGovernments', 'themes', 'url', 'recipients', 'files',
]);

/**
 * Normalize a raw SOLR document into a typed `CalendarDoc`.
 *
 * Wraps the generic `normalizeSolrDocument()` with calendar-specific
 * post-processing: COA field aliasing, notification date promotion,
 * and array-field guarantees.
 */
export function normalizeCalendarDoc(raw: Record<string, unknown>): CalendarDoc {
  const doc = normalizeSolrDocument(raw);

  // Ensure id
  if (!doc.id && doc._id) {
    doc.id = doc._id;
  }

  // Alias COA-suffixed fields to canonical property names
  if (doc.startDateCOA !== undefined && doc.startDate === undefined) {
    doc.startDate = doc.startDateCOA;
  }
  if (doc.endDateCOA !== undefined && doc.endDate === undefined) {
    doc.endDate = doc.endDateCOA;
  }

  // Notifications use `date_dt` → promote to `startDate` for uniform handling
  if (doc.schema === 'notification' && doc.date && !doc.startDate) {
    doc.startDate = doc.date;
  }

  if (doc.actionRequiredByPartiesCOA !== undefined && doc.actionRequiredByParties === undefined) {
    doc.actionRequiredByParties = doc.actionRequiredByPartiesCOA;
  }
  if (doc.governingBodiesCOA !== undefined && doc.governingBody === undefined) {
    doc.governingBody = doc.governingBodiesCOA;
  }
  if (doc.subsidiaryBodiesCOA !== undefined && doc.subsidiaryBody === undefined) {
    doc.subsidiaryBody = doc.subsidiaryBodiesCOA;
  }

  // calendarActivity: promote activityStatus to canonical status
  if (doc.schema === 'calendarActivity' && doc.activityStatus && !doc.status) {
    doc.status = doc.activityStatus;
  }

  // Ensure array fields
  for (const field of CALENDAR_ARRAY_FIELDS) {
    if (!Array.isArray(doc[field])) {
      doc[field] = doc[field] != null ? [doc[field]] : [];
    }
  }

  return doc as unknown as CalendarDoc;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Search calendar activities with faceted filtering.
 *
 * @param params - Search parameters (filters, pagination, sort, text).
 * @returns `CalendarSearchResult` conforming to SC-01.
 */
export async function listCalendarActivities(
  params: CalendarSearchParams = {},
): Promise<CalendarSearchResult> {
  const body = buildCalendarQuery(params);
  const data = await api.querySolrFaceted(body);

  const rawDocs: Record<string, unknown>[] = data?.response?.docs ?? [];
  const total: number = data?.response?.numFound ?? 0;

  const docs = rawDocs.map(raw => normalizeCalendarDoc(raw));
  const facets = parseFacets(data?.facet_counts);

  return { docs, total, facets };
}

/**
 * Fetch a single calendar document by its identifier.
 *
 * @param id - SOLR identifier value.
 * @returns `CalendarDoc` or throws a not-found error.
 */
export async function getCalendarActivity(id: string): Promise<CalendarDoc> {
  const body: Record<string, unknown> = {
    q: `identifier_s:"${id}"`,
    fq: [
      '(_state_s:public OR (*:* NOT _state_s:*))',
      'schemaType_s:scbd',
      'schema_s:(meeting OR notification OR calendarActivity)',
    ],
    fl: CALENDAR_DETAIL_FIELDS,
    wt: 'json',
    rows: 1,
    start: 0,
  };

  const data = await api.querySolrFaceted(body);
  const rawDocs: Record<string, unknown>[] = data?.response?.docs ?? [];

  if (rawDocs.length === 0) {
    throw notFound(`Calendar activity '${id}' not found.`);
  }

  return normalizeCalendarDoc(rawDocs[0]);
}
