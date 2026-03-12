import { describe, it, expect } from 'vitest';
import { DateTime } from 'luxon';
import {
  parseFlexibleDate,
  formatNotificationDate,
  formatGridDate,
  safeDate,
  getQuarter,
  isQuarterStart,
  formatDateRange,
  formatGridDateRange,
} from '~/utils/calendar/date';
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
    startDate: '2025-04-15',
    endDate: '2025-04-20',
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
// parseFlexibleDate
// ---------------------------------------------------------------------------

describe('parseFlexibleDate', () => {
  it('parses d-MMM-yy format', () => {
    const result = parseFlexibleDate('1-Jan-25');

    expect(result).toContain('2025-01-01');
  });

  it('parses d-MMM-yyyy format', () => {
    const result = parseFlexibleDate('15-Mar-2025');

    expect(result).toContain('2025-03-15');
  });

  it('parses dd-MMM-yy format', () => {
    const result = parseFlexibleDate('01-Jan-25');

    expect(result).toContain('2025-01-01');
  });

  it('parses dd-MMM-yyyy format', () => {
    const result = parseFlexibleDate('15-Mar-2025');

    expect(result).toContain('2025-03-15');
  });

  it('parses quarter format Q1 2025', () => {
    const result = parseFlexibleDate('Q1 2025');

    expect(result).toContain('2025-01-01');
  });

  it('parses quarter format Q2 2025', () => {
    const result = parseFlexibleDate('Q2 2025');

    expect(result).toContain('2025-04-01');
  });

  it('parses quarter format Q3 2025', () => {
    const result = parseFlexibleDate('Q3 2025');

    expect(result).toContain('2025-07-01');
  });

  it('parses quarter format Q4 2025', () => {
    const result = parseFlexibleDate('Q4 2025');

    expect(result).toContain('2025-10-01');
  });

  it('parses quarter with short year', () => {
    const result = parseFlexibleDate('Q1 25');

    expect(result).toContain('2025-01-01');
  });

  it('parses year-only format', () => {
    const result = parseFlexibleDate('2025');

    expect(result).toContain('2025-01-01');
  });

  it('returns null for undefined', () => {
    expect(parseFlexibleDate(undefined)).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(parseFlexibleDate('')).toBeNull();
  });

  it('returns null for unrecognized format', () => {
    expect(parseFlexibleDate('not-a-date')).toBeNull();
  });

  it('returns null for whitespace-only', () => {
    expect(parseFlexibleDate('   ')).toBeNull();
  });

  it('parses month-year formats', () => {
    const result = parseFlexibleDate('Jan 2025');

    expect(result).toContain('2025-01-01');
  });
});

// ---------------------------------------------------------------------------
// formatNotificationDate
// ---------------------------------------------------------------------------

describe('formatNotificationDate', () => {
  it('formats ISO date for notification display', () => {
    expect(formatNotificationDate('2024-01-15T00:00:00.000Z')).toBe('15 Jan 2024');
  });

  it('returns null for null input', () => {
    expect(formatNotificationDate(null)).toBeNull();
  });

  it('returns null for undefined input', () => {
    expect(formatNotificationDate(undefined)).toBeNull();
  });

  it('returns null for invalid date', () => {
    expect(formatNotificationDate('not-a-date')).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(formatNotificationDate('')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// formatGridDate
// ---------------------------------------------------------------------------

describe('formatGridDate', () => {
  it('formats ISO date as yyyy-MM-dd', () => {
    expect(formatGridDate('2024-01-15T00:00:00.000Z')).toBe('2024-01-15');
  });

  it('returns null for null', () => {
    expect(formatGridDate(null)).toBeNull();
  });

  it('returns null for undefined', () => {
    expect(formatGridDate(undefined)).toBeNull();
  });

  it('returns null for invalid date', () => {
    expect(formatGridDate('invalid')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// safeDate
// ---------------------------------------------------------------------------

describe('safeDate', () => {
  it('returns DateTime for valid ISO string', () => {
    const result = safeDate('2025-01-15');

    expect(result).not.toBeNull();
    expect(result!.year).toBe(2025);
    expect(result!.month).toBe(1);
    expect(result!.day).toBe(15);
  });

  it('returns null for null', () => {
    expect(safeDate(null)).toBeNull();
  });

  it('returns null for undefined', () => {
    expect(safeDate(undefined)).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(safeDate('')).toBeNull();
  });

  it('returns null for invalid date string', () => {
    expect(safeDate('not-valid')).toBeNull();
  });

  it('returns null for 0', () => {
    expect(safeDate(0)).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// getQuarter
// ---------------------------------------------------------------------------

describe('getQuarter', () => {
  it('returns 1 for January', () => {
    expect(getQuarter(DateTime.utc(2025, 1, 1))).toBe(1);
  });

  it('returns 1 for March', () => {
    expect(getQuarter(DateTime.utc(2025, 3, 31))).toBe(1);
  });

  it('returns 2 for April', () => {
    expect(getQuarter(DateTime.utc(2025, 4, 1))).toBe(2);
  });

  it('returns 3 for July', () => {
    expect(getQuarter(DateTime.utc(2025, 7, 15))).toBe(3);
  });

  it('returns 4 for October', () => {
    expect(getQuarter(DateTime.utc(2025, 10, 1))).toBe(4);
  });

  it('returns 4 for December', () => {
    expect(getQuarter(DateTime.utc(2025, 12, 31))).toBe(4);
  });
});

// ---------------------------------------------------------------------------
// isQuarterStart
// ---------------------------------------------------------------------------

describe('isQuarterStart', () => {
  it('returns true for Jan 1', () => {
    expect(isQuarterStart(DateTime.utc(2025, 1, 1))).toBe(true);
  });

  it('returns true for Apr 1', () => {
    expect(isQuarterStart(DateTime.utc(2025, 4, 1))).toBe(true);
  });

  it('returns true for Jul 1', () => {
    expect(isQuarterStart(DateTime.utc(2025, 7, 1))).toBe(true);
  });

  it('returns true for Oct 1', () => {
    expect(isQuarterStart(DateTime.utc(2025, 10, 1))).toBe(true);
  });

  it('returns false for Jan 2', () => {
    expect(isQuarterStart(DateTime.utc(2025, 1, 2))).toBe(false);
  });

  it('returns false for Feb 1', () => {
    expect(isQuarterStart(DateTime.utc(2025, 2, 1))).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// formatDateRange
// ---------------------------------------------------------------------------

describe('formatDateRange', () => {
  it('formats same-day range', () => {
    const doc = makeDoc({ startDate: '2025-04-15', endDate: '2025-04-15' });

    expect(formatDateRange(doc)).toBe('15 April 2025');
  });

  it('formats same-month range', () => {
    const doc = makeDoc({ startDate: '2025-04-15', endDate: '2025-04-20' });

    expect(formatDateRange(doc)).toBe('15 - 20 April 2025');
  });

  it('formats same-year cross-month range', () => {
    const doc = makeDoc({ startDate: '2025-04-15', endDate: '2025-05-20' });

    expect(formatDateRange(doc)).toBe('15 April - 20 May 2025');
  });

  it('formats cross-year range', () => {
    const doc = makeDoc({ startDate: '2024-12-15', endDate: '2025-01-10' });

    expect(formatDateRange(doc)).toBe('15 December 2024 - 10 January 2025');
  });

  it('returns start date when end is missing', () => {
    const doc = makeDoc({ startDate: '2025-04-15', endDate: null });

    expect(formatDateRange(doc)).toBe('15 April 2025');
  });

  it('returns end date when start is missing', () => {
    const doc = makeDoc({ startDate: null, endDate: '2025-04-20' });

    expect(formatDateRange(doc)).toBe('20 April 2025');
  });

  it('returns empty string when both dates are missing', () => {
    const doc = makeDoc({ startDate: null, endDate: null });

    expect(formatDateRange(doc)).toBe('');
  });

  it('formats notification with actionDate', () => {
    const doc = makeDoc({
      schema: 'notification',
      actionDate: '2025-03-15',
      startDate: null,
      endDate: null,
      symbol: '2025-001',
      reference: 'ref',
      sender: 'sender',
      recipients: [],
      deadline: null,
      files: [],
      fulltext: { en: '' },
    });

    expect(formatDateRange(doc)).toBe('15 March 2025');
  });

  it('formats tentative activity with quarter labels — same quarter', () => {
    const doc = makeDoc({
      schema: 'calendarActivity',
      startDate: '2025-04-01',
      endDate: '2025-06-30',
      statusKey: 'TENTATIVE',
      type: 'activity',
      subType: null,
      description: { en: '' },
      statusNarrative: { en: '' },
      agendaItems: [],
      subjects: [],
      decisions: [],
      responsibleUnitsAndOfficers: [],
      gbfTargets: [],
      gbfSections: [],
      outcome: null,
    });

    expect(formatDateRange(doc)).toBe('Q2 2025');
  });

  it('formats tentative activity — different quarters same year', () => {
    const doc = makeDoc({
      schema: 'calendarActivity',
      startDate: '2025-04-01',
      endDate: '2025-09-30',
      statusKey: 'TENTATIVE',
      type: 'activity',
      subType: null,
      description: { en: '' },
      statusNarrative: { en: '' },
      agendaItems: [],
      subjects: [],
      decisions: [],
      responsibleUnitsAndOfficers: [],
      gbfTargets: [],
      gbfSections: [],
      outcome: null,
    });

    expect(formatDateRange(doc)).toBe('Q2 - Q3 2025');
  });

  it('formats tentative activity — cross year quarters', () => {
    const doc = makeDoc({
      schema: 'calendarActivity',
      startDate: '2025-10-01',
      endDate: '2026-03-31',
      statusKey: 'TENTATIVE',
      type: 'activity',
      subType: null,
      description: { en: '' },
      statusNarrative: { en: '' },
      agendaItems: [],
      subjects: [],
      decisions: [],
      responsibleUnitsAndOfficers: [],
      gbfTargets: [],
      gbfSections: [],
      outcome: null,
    });

    expect(formatDateRange(doc)).toBe('Q4 2025 - Q1 2026');
  });
});

// ---------------------------------------------------------------------------
// formatGridDateRange
// ---------------------------------------------------------------------------

describe('formatGridDateRange', () => {
  it('formats same-day range as yyyy-MM-dd', () => {
    const doc = makeDoc({ startDate: '2025-04-15', endDate: '2025-04-15' });

    expect(formatGridDateRange(doc)).toBe('2025-04-15');
  });

  it('formats multi-day range with en-dash', () => {
    const doc = makeDoc({ startDate: '2025-04-15', endDate: '2025-04-20' });

    expect(formatGridDateRange(doc)).toBe('2025-04-15 \u2013 2025-04-20');
  });

  it('returns start date when end is missing', () => {
    const doc = makeDoc({ startDate: '2025-04-15', endDate: null });

    expect(formatGridDateRange(doc)).toBe('2025-04-15');
  });

  it('returns empty string when both dates are missing', () => {
    const doc = makeDoc({ startDate: null, endDate: null });

    expect(formatGridDateRange(doc)).toBe('');
  });

  it('formats notification with actionDate', () => {
    const doc = makeDoc({
      schema: 'notification',
      actionDate: '2025-03-15',
      startDate: null,
      endDate: null,
      symbol: '2025-001',
      reference: 'ref',
      sender: 'sender',
      recipients: [],
      deadline: null,
      files: [],
      fulltext: { en: '' },
    });

    expect(formatGridDateRange(doc)).toBe('2025-03-15');
  });

  it('formats tentative activity with quarter labels', () => {
    const doc = makeDoc({
      schema: 'calendarActivity',
      startDate: '2025-04-01',
      endDate: '2025-06-30',
      statusKey: 'TENTATIVE',
      type: 'activity',
      subType: null,
      description: { en: '' },
      statusNarrative: { en: '' },
      agendaItems: [],
      subjects: [],
      decisions: [],
      responsibleUnitsAndOfficers: [],
      gbfTargets: [],
      gbfSections: [],
      outcome: null,
    });

    expect(formatGridDateRange(doc)).toBe('Q2 2025');
  });
});
