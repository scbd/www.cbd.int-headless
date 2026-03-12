import { describe, it, expect } from 'vitest';
import {
  THESAURUS_DOMAINS,
  CALENDAR_RECORD_TYPES,
  SOLR_FACET_FIELDS,
  CALENDAR_LIST_FIELDS,
  CALENDAR_DETAIL_FIELDS,
  ITEMS_PER_PAGE,
  CALENDAR_ACTIVITIES_PATH,
} from '~/constants/calendar-activities';

// ---------------------------------------------------------------------------
// THESAURUS_DOMAINS
// ---------------------------------------------------------------------------

describe('THESAURUS_DOMAINS', () => {
  it('contains all expected domain keys', () => {
    const expectedKeys = [
      'COUNTRIES',
      'GBF_GOALS',
      'GBF_TARGETS',
      'GBF_SECTIONS',
      'EVENT_STATUS',
      'ACTIVITY_TYPES',
      'CBD_SUBJECTS',
      'SCBD_UNITS',
      'GOVERNING_BODIES',
      'SUBSIDIARY_BODIES',
    ];

    expect(Object.keys(THESAURUS_DOMAINS)).toEqual(expectedKeys);
  });

  it('has correct identifier values matching CBD thesaurus API', () => {
    expect(THESAURUS_DOMAINS.COUNTRIES).toBe('countries');
    expect(THESAURUS_DOMAINS.GBF_TARGETS).toBe('GBF-TARGETS');
    expect(THESAURUS_DOMAINS.GBF_SECTIONS).toBe('GBF-SECTIONS');
    expect(THESAURUS_DOMAINS.ACTIVITY_TYPES).toBe('CALENDAR-OF-ACTIVITY-TYPES');
    expect(THESAURUS_DOMAINS.CBD_SUBJECTS).toBe('CBD-SUBJECTS');
    expect(THESAURUS_DOMAINS.GOVERNING_BODIES).toBe('GOVERNING-BODIES');
    expect(THESAURUS_DOMAINS.SUBSIDIARY_BODIES).toBe('SUBSIDIARY-BODIES');
  });

  it('values are readonly strings (as const)', () => {
    // as const provides compile-time immutability — verify values are strings
    for (const value of Object.values(THESAURUS_DOMAINS)) {
      expect(typeof value).toBe('string');
      expect(value.length).toBeGreaterThan(0);
    }
  });
});

// ---------------------------------------------------------------------------
// CALENDAR_RECORD_TYPES
// ---------------------------------------------------------------------------

describe('CALENDAR_RECORD_TYPES', () => {
  it('has exactly 3 record types', () => {
    expect(CALENDAR_RECORD_TYPES).toHaveLength(3);
  });

  it('includes meeting, notification, and calendarActivity', () => {
    const values = CALENDAR_RECORD_TYPES.map((r) => r.value);
    expect(values).toEqual(['meeting', 'notification', 'calendarActivity']);
  });

  it('each entry has value and labelKey', () => {
    for (const record of CALENDAR_RECORD_TYPES) {
      expect(record).toHaveProperty('value');
      expect(record).toHaveProperty('labelKey');
      expect(typeof record.value).toBe('string');
      expect(typeof record.labelKey).toBe('string');
      expect(record.labelKey).toMatch(/^calendar\.types\./);
    }
  });
});

// ---------------------------------------------------------------------------
// SOLR_FACET_FIELDS
// ---------------------------------------------------------------------------

describe('SOLR_FACET_FIELDS', () => {
  it('contains all expected facet keys', () => {
    const expectedKeys = [
      'schema',
      'subjects',
      'governingBody',
      'subsidiaryBody',
      'statusCOA',
      'activityType',
      'gbfTargets',
      'gbfSections',
      'countries',
      'decisions',
      'themes',
    ];

    expect(Object.keys(SOLR_FACET_FIELDS)).toEqual(expectedKeys);
  });

  it('all facet values use exclusion tags', () => {
    for (const [, value] of Object.entries(SOLR_FACET_FIELDS)) {
      expect(value).toMatch(/^\{!ex=\w+\}/);
    }
  });

  it('exclusion tag names are unique', () => {
    const tags = Object.values(SOLR_FACET_FIELDS).map(
      (v) => v.match(/\{!ex=(\w+)\}/)![1]
    );
    const uniqueTags = new Set(tags);
    expect(uniqueTags.size).toBe(tags.length);
  });

  it('all SOLR field names end with _s or _ss', () => {
    for (const value of Object.values(SOLR_FACET_FIELDS)) {
      const fieldName = value.replace(/\{!ex=\w+\}/, '');
      expect(fieldName).toMatch(/_s{1,2}$/);
    }
  });
});

// ---------------------------------------------------------------------------
// SOLR field lists
// ---------------------------------------------------------------------------

describe('CALENDAR_LIST_FIELDS', () => {
  it('is a comma-separated string', () => {
    expect(typeof CALENDAR_LIST_FIELDS).toBe('string');
    expect(CALENDAR_LIST_FIELDS).toContain(',');
  });

  it('includes essential fields', () => {
    const fields = CALENDAR_LIST_FIELDS.split(',');
    expect(fields).toContain('id');
    expect(fields).toContain('schema_s');
    expect(fields).toContain('identifier_s');
    expect(fields).toContain('startDateCOA_dt');
    expect(fields).toContain('endDateCOA_dt');
    expect(fields).toContain('meetingCode_s');
    expect(fields).toContain('type_s');
    expect(fields).toContain('symbol_s');
  });

  it('includes title fields for all UN languages', () => {
    const fields = CALENDAR_LIST_FIELDS.split(',');
    for (const lang of ['EN', 'FR', 'ES', 'AR', 'RU', 'ZH']) {
      expect(fields).toContain(`title_${lang}_t`);
    }
  });

  it('has no duplicate fields', () => {
    const fields = CALENDAR_LIST_FIELDS.split(',');
    const unique = new Set(fields);
    expect(unique.size).toBe(fields.length);
  });
});

describe('CALENDAR_DETAIL_FIELDS', () => {
  it('is a comma-separated string', () => {
    expect(typeof CALENDAR_DETAIL_FIELDS).toBe('string');
    expect(CALENDAR_DETAIL_FIELDS).toContain(',');
  });

  it('is a superset of list fields', () => {
    const listFields = CALENDAR_LIST_FIELDS.split(',');
    const detailFields = CALENDAR_DETAIL_FIELDS.split(',');

    for (const field of listFields) {
      expect(detailFields).toContain(field);
    }
  });

  it('includes description and narrative fields for all UN languages', () => {
    const fields = CALENDAR_DETAIL_FIELDS.split(',');
    for (const lang of ['EN', 'FR', 'ES', 'AR', 'RU', 'ZH']) {
      expect(fields).toContain(`description_${lang}_t`);
      expect(fields).toContain(`statusNarrative_${lang}_t`);
      expect(fields).toContain(`fulltext_${lang}_t`);
    }
  });

  it('includes detail-only fields', () => {
    const fields = CALENDAR_DETAIL_FIELDS.split(',');
    expect(fields).toContain('agendaItems_ss');
    expect(fields).toContain('responsibleUnitsAndOfficers_ss');
    expect(fields).toContain('hostGovernments_ss');
    expect(fields).toContain('outcome_s');
    expect(fields).toContain('createdDate_dt');
    expect(fields).toContain('updatedDate_dt');
  });

  it('contains all unique detail-specific fields beyond list fields', () => {
    const listFields = new Set(CALENDAR_LIST_FIELDS.split(','));
    const detailFields = CALENDAR_DETAIL_FIELDS.split(',');
    const detailOnly = detailFields.filter((f) => !listFields.has(f));
    const uniqueDetailOnly = new Set(detailOnly);
    // Detail-only fields should themselves be unique
    expect(uniqueDetailOnly.size).toBe(detailOnly.length);
  });
});

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

describe('ITEMS_PER_PAGE', () => {
  it('is 10', () => {
    expect(ITEMS_PER_PAGE).toBe(10);
  });

  it('is a positive integer', () => {
    expect(Number.isInteger(ITEMS_PER_PAGE)).toBe(true);
    expect(ITEMS_PER_PAGE).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// URL path
// ---------------------------------------------------------------------------

describe('CALENDAR_ACTIVITIES_PATH', () => {
  it('is /calendar-of-activities', () => {
    expect(CALENDAR_ACTIVITIES_PATH).toBe('/calendar-of-activities');
  });

  it('starts with /', () => {
    expect(CALENDAR_ACTIVITIES_PATH).toMatch(/^\//);
  });
});
