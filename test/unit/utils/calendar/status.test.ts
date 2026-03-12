import { describe, it, expect } from 'vitest';
import {
  STATUS_EQUIVALENCES,
  COMPLETED_FACET_ALIASES,
  COMPLETED_QUERY_ALIASES,
  expandStatusValuesForQuery,
  normalizeStatusKey,
  normalizeStatusLabel,
  statusColor,
} from '~/utils/calendar/status';
import type { CalendarDoc } from '~/types/calendar-activity';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

function makeDoc(overrides: Record<string, unknown>): CalendarDoc {
  return {
    id: 'doc-1',
    schema: 'meeting',
    identifier: 'TEST',
    title: { en: 'Test' },
    startDate: '2025-01-01',
    endDate: '2025-01-02',
    createdDate: '2025-01-01',
    status: 'confirmed',
    statusKey: 'confirmed',
    statusCOA: 'confirmed',
    url: null,
    governingBodies: [],
    subsidiaryBodies: [],
    governingBodiesCOA: [],
    subsidiaryBodiesCOA: [],
    relatedRecords: [],
    relatedMeetings: [],
    relatedActivities: [],
    actionRequired: false,
    actionRequiredByParties: false,
    actionRequiredByPartiesCOA: false,
    symbol: '',
    meetingCode: '',
    eventCity: { en: '' },
    eventCountry: { en: '' },
    hostGovernments: [],
    themes: [],
    ...overrides,
  } as unknown as CalendarDoc;
}

// ---------------------------------------------------------------------------
// STATUS_EQUIVALENCES
// ---------------------------------------------------------------------------

describe('STATUS_EQUIVALENCES', () => {
  it('contains 5 status pairs', () => {
    expect(STATUS_EQUIVALENCES).toHaveLength(5);
  });

  it('maps CONFIRMED ↔ CONFIRM', () => {
    const confirmed = STATUS_EQUIVALENCES.find(e => e.solrCode === 'CONFIRM');

    expect(confirmed?.thesaurusId).toBe('NCHM-EVENT-STATUS-CONFIRMED');
  });

  it('maps TENTATIVE ↔ TENTAT', () => {
    const tentative = STATUS_EQUIVALENCES.find(e => e.solrCode === 'TENTAT');

    expect(tentative?.thesaurusId).toBe('NCHM-EVENT-STATUS-TENTATIVE');
  });

  it('maps POSTPONED ↔ POST', () => {
    const postponed = STATUS_EQUIVALENCES.find(e => e.solrCode === 'POST');

    expect(postponed?.thesaurusId).toBe('NCHM-EVENT-STATUS-POSTPONED');
  });

  it('maps CANCELLED ↔ CANCEL', () => {
    const cancelled = STATUS_EQUIVALENCES.find(e => e.solrCode === 'CANCEL');

    expect(cancelled?.thesaurusId).toBe('NCHM-EVENT-STATUS-CANCELLED');
  });

  it('maps COMPLETED ↔ COMPLETED', () => {
    const completed = STATUS_EQUIVALENCES.find(e => e.solrCode === 'COMPLETED');

    expect(completed?.thesaurusId).toBe('NCHM-EVENT-STATUS-COMPLETED');
  });
});

// ---------------------------------------------------------------------------
// COMPLETED_FACET_ALIASES
// ---------------------------------------------------------------------------

describe('COMPLETED_FACET_ALIASES', () => {
  it('includes NOT_SET and NODATE', () => {
    expect(COMPLETED_FACET_ALIASES).toContain('NOT_SET');
    expect(COMPLETED_FACET_ALIASES).toContain('NODATE');
  });
});

// ---------------------------------------------------------------------------
// COMPLETED_QUERY_ALIASES
// ---------------------------------------------------------------------------

describe('COMPLETED_QUERY_ALIASES', () => {
  it('includes facet aliases plus CONFIRM and thesaurus id', () => {
    expect(COMPLETED_QUERY_ALIASES).toContain('NOT_SET');
    expect(COMPLETED_QUERY_ALIASES).toContain('NODATE');
    expect(COMPLETED_QUERY_ALIASES).toContain('CONFIRM');
    expect(COMPLETED_QUERY_ALIASES).toContain('NCHM-EVENT-STATUS-CONFIRMED');
  });
});

// ---------------------------------------------------------------------------
// expandStatusValuesForQuery
// ---------------------------------------------------------------------------

describe('expandStatusValuesForQuery', () => {
  it('expands thesaurus ID to include SOLR code', () => {
    const result = expandStatusValuesForQuery(['NCHM-EVENT-STATUS-CONFIRMED']);

    expect(result).toContain('NCHM-EVENT-STATUS-CONFIRMED');
    expect(result).toContain('CONFIRM');
  });

  it('expands SOLR code to include thesaurus ID', () => {
    const result = expandStatusValuesForQuery(['TENTAT']);

    expect(result).toContain('TENTAT');
    expect(result).toContain('NCHM-EVENT-STATUS-TENTATIVE');
  });

  it('expands COMPLETED to include all aliases', () => {
    const result = expandStatusValuesForQuery(['COMPLETED']);

    expect(result).toContain('COMPLETED');
    expect(result).toContain('NCHM-EVENT-STATUS-COMPLETED');
    expect(result).toContain('NOT_SET');
    expect(result).toContain('NODATE');
    expect(result).toContain('CONFIRM');
  });

  it('passes through unknown values unchanged', () => {
    const result = expandStatusValuesForQuery(['CUSTOM_STATUS']);

    expect(result).toEqual(['CUSTOM_STATUS']);
  });

  it('deduplicates expanded values', () => {
    const result = expandStatusValuesForQuery(['CONFIRM', 'NCHM-EVENT-STATUS-CONFIRMED']);
    const unique = [...new Set(result)];

    expect(result).toEqual(unique);
  });

  it('handles empty input', () => {
    expect(expandStatusValuesForQuery([])).toEqual([]);
  });

  it('handles multiple mixed values', () => {
    const result = expandStatusValuesForQuery(['TENTAT', 'CUSTOM']);

    expect(result).toContain('TENTAT');
    expect(result).toContain('NCHM-EVENT-STATUS-TENTATIVE');
    expect(result).toContain('CUSTOM');
  });
});

// ---------------------------------------------------------------------------
// normalizeStatusKey
// ---------------------------------------------------------------------------

describe('normalizeStatusKey', () => {
  it('normalizes thesaurus ID CONFIRMED', () => {
    expect(normalizeStatusKey('NCHM-EVENT-STATUS-CONFIRMED')).toBe('CONFIRMED');
  });

  it('normalizes thesaurus ID TENTATIVE', () => {
    expect(normalizeStatusKey('NCHM-EVENT-STATUS-TENTATIVE')).toBe('TENTATIVE');
  });

  it('normalizes thesaurus ID COMPLETED', () => {
    expect(normalizeStatusKey('NCHM-EVENT-STATUS-COMPLETED')).toBe('COMPLETED');
  });

  it('normalizes thesaurus ID ONGOING', () => {
    expect(normalizeStatusKey('NCHM-EVENT-STATUS-ONGOING')).toBe('ONGOING');
  });

  it('normalizes thesaurus ID TO_BE_CONFIRMED', () => {
    expect(normalizeStatusKey('NCHM-EVENT-STATUS-TO_BE_CONFIRMED')).toBe('TO_BE_CONFIRMED');
  });

  it('normalizes English label "confirmed"', () => {
    expect(normalizeStatusKey('confirmed')).toBe('CONFIRMED');
  });

  it('normalizes English label "tentative"', () => {
    expect(normalizeStatusKey('tentative')).toBe('TENTATIVE');
  });

  it('normalizes English label "completed"', () => {
    expect(normalizeStatusKey('completed')).toBe('COMPLETED');
  });

  it('normalizes English label "ongoing"', () => {
    expect(normalizeStatusKey('ongoing')).toBe('ONGOING');
  });

  it('normalizes "to be confirmed"', () => {
    expect(normalizeStatusKey('to be confirmed')).toBe('TO_BE_CONFIRMED');
  });

  it('normalizes "tbc" as TO_BE_CONFIRMED', () => {
    expect(normalizeStatusKey('tbc')).toBe('TO_BE_CONFIRMED');
  });

  it('normalizes SOLR short code CONFIRM', () => {
    expect(normalizeStatusKey('CONFIRM')).toBe('CONFIRMED');
  });

  it('normalizes SOLR short code TENTAT', () => {
    expect(normalizeStatusKey('TENTAT')).toBe('TENTATIVE');
  });

  it('normalizes SOLR short code POST', () => {
    expect(normalizeStatusKey('POST')).toBe('POSTPONED');
  });

  it('normalizes SOLR short code CANCEL', () => {
    expect(normalizeStatusKey('CANCEL')).toBe('CANCELLED');
  });

  it('returns null for undefined', () => {
    expect(normalizeStatusKey(undefined)).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(normalizeStatusKey('')).toBeNull();
  });

  it('returns null for whitespace-only string', () => {
    expect(normalizeStatusKey('   ')).toBeNull();
  });

  it('uppercases unknown values', () => {
    expect(normalizeStatusKey('draft')).toBe('DRAFT');
  });
});

// ---------------------------------------------------------------------------
// normalizeStatusLabel
// ---------------------------------------------------------------------------

describe('normalizeStatusLabel', () => {
  it('returns "Confirmed" for confirmed key', () => {
    expect(normalizeStatusLabel('confirmed')).toBe('Confirmed');
  });

  it('returns "Tentative" for tentative key', () => {
    expect(normalizeStatusLabel('tentative')).toBe('Tentative');
  });

  it('returns "Completed" for completed key', () => {
    expect(normalizeStatusLabel('completed')).toBe('Completed');
  });

  it('returns "Ongoing" for ongoing key', () => {
    expect(normalizeStatusLabel('ongoing')).toBe('Ongoing');
  });

  it('returns "Postponed" for postponed key', () => {
    expect(normalizeStatusLabel('postponed')).toBe('Postponed');
  });

  it('returns "Cancelled" for cancelled key', () => {
    expect(normalizeStatusLabel('cancelled')).toBe('Cancelled');
  });

  it('returns "To be confirmed" for to_be_confirmed key', () => {
    expect(normalizeStatusLabel('to_be_confirmed')).toBe('To be confirmed');
  });

  it('returns fallback for unknown key', () => {
    expect(normalizeStatusLabel('UNKNOWN', 'Custom')).toBe('Custom');
  });

  it('returns key as string for unknown key without fallback', () => {
    expect(normalizeStatusLabel('DRAFT')).toBe('DRAFT');
  });

  it('returns empty string for null key without fallback', () => {
    expect(normalizeStatusLabel(null)).toBe('');
  });

  it('returns empty string for undefined key', () => {
    expect(normalizeStatusLabel(undefined)).toBe('');
  });

  it('returns trimmed fallback when key is null', () => {
    expect(normalizeStatusLabel(null, '  Custom  ')).toBe('Custom');
  });

  it('ignores empty fallback', () => {
    expect(normalizeStatusLabel(null, '   ')).toBe('');
  });
});

// ---------------------------------------------------------------------------
// statusColor
// ---------------------------------------------------------------------------

describe('statusColor', () => {
  it('returns "success" for COMPLETED', () => {
    expect(statusColor(makeDoc({ statusKey: 'COMPLETED' }))).toBe('success');
  });

  it('returns "primary" for CONFIRMED', () => {
    expect(statusColor(makeDoc({ statusKey: 'CONFIRMED' }))).toBe('primary');
  });

  it('returns "warning" for TO_BE_CONFIRMED', () => {
    expect(statusColor(makeDoc({ statusKey: 'TO_BE_CONFIRMED' }))).toBe('warning');
  });

  it('returns "info" for ONGOING', () => {
    expect(statusColor(makeDoc({ statusKey: 'ONGOING' }))).toBe('info');
  });

  it('returns "secondary" for unknown status', () => {
    expect(statusColor(makeDoc({ statusKey: 'DRAFT' }))).toBe('secondary');
  });

  it('falls back to normalizing status when statusKey is missing', () => {
    expect(statusColor(makeDoc({ statusKey: undefined, status: 'confirmed' }))).toBe('primary');
  });
});
