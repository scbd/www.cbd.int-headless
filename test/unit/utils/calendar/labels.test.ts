import { describe, it, expect } from 'vitest';
import {
  resolveCountryLabel,
  normalizeDecisionLabel,
  responsibleUnitLabel,
  responsibleOfficerLabel,
  SCBD_UNITS_DIVISIONS,
} from '~/utils/calendar/labels';
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
// resolveCountryLabel
// ---------------------------------------------------------------------------

describe('resolveCountryLabel', () => {
  it('returns provided label when available', () => {
    expect(resolveCountryLabel('CA', 'Canada')).toBe('Canada');
  });

  it('trims provided label', () => {
    expect(resolveCountryLabel('CA', '  Canada  ')).toBe('Canada');
  });

  it('uses Intl.DisplayNames for 2-letter codes when no label provided', () => {
    const result = resolveCountryLabel('CA');

    expect(result).toBe('Canada');
  });

  it('returns Intl display name even for ZZ', () => {
    // Intl.DisplayNames returns "Unknown Region" for ZZ
    expect(resolveCountryLabel('zz')).toBe('Unknown Region');
  });

  it('returns empty string for empty value', () => {
    expect(resolveCountryLabel('', null)).toBe('');
  });

  it('humanizes longer identifiers', () => {
    const result = resolveCountryLabel('SOME-COUNTRY');

    expect(result).toBe('Some Country');
  });

  it('skips empty provided label and falls through', () => {
    const result = resolveCountryLabel('US', '   ');

    expect(result).toBe('United States');
  });
});

// ---------------------------------------------------------------------------
// normalizeDecisionLabel
// ---------------------------------------------------------------------------

describe('normalizeDecisionLabel', () => {
  it('returns null for null input', () => {
    expect(normalizeDecisionLabel(null)).toBeNull();
  });

  it('returns null for undefined input', () => {
    expect(normalizeDecisionLabel(undefined)).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(normalizeDecisionLabel('')).toBeNull();
  });

  it('returns null for whitespace-only', () => {
    expect(normalizeDecisionLabel('   ')).toBeNull();
  });

  it('preserves labels that already contain COP', () => {
    expect(normalizeDecisionLabel('COP 15/4')).toBe('COP 15/4');
  });

  it('preserves CP- prefixed labels', () => {
    expect(normalizeDecisionLabel('CP-11/7')).toBe('CP-11/7');
  });

  it('preserves NP- prefixed labels', () => {
    expect(normalizeDecisionLabel('NP-4/1')).toBe('NP-4/1');
  });

  it('adds COP prefix to bare decision numbers', () => {
    expect(normalizeDecisionLabel('15/4')).toBe('COP 15/4');
  });

  it('adds COP prefix to bare text', () => {
    expect(normalizeDecisionLabel('Decision 15/4')).toBe('COP Decision 15/4');
  });
});

// ---------------------------------------------------------------------------
// responsibleUnitLabel / responsibleOfficerLabel
// ---------------------------------------------------------------------------

describe('responsibleUnitLabel', () => {
  it('returns responsibleUnit from doc', () => {
    const doc = makeDoc({ responsibleUnit: 'ISD' });

    expect(responsibleUnitLabel(doc)).toBe('ISD');
  });

  it('returns undefined when not present', () => {
    expect(responsibleUnitLabel(makeDoc({}))).toBeUndefined();
  });
});

describe('responsibleOfficerLabel', () => {
  it('returns responsibleOfficer from doc', () => {
    const doc = makeDoc({ responsibleOfficer: 'John Doe' });

    expect(responsibleOfficerLabel(doc)).toBe('John Doe');
  });

  it('returns undefined when not present', () => {
    expect(responsibleOfficerLabel(makeDoc({}))).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// SCBD_UNITS_DIVISIONS
// ---------------------------------------------------------------------------

describe('SCBD_UNITS_DIVISIONS', () => {
  it('contains 17 organizational units', () => {
    expect(Object.keys(SCBD_UNITS_DIVISIONS)).toHaveLength(17);
  });

  it('maps SSSFD to full name', () => {
    expect(SCBD_UNITS_DIVISIONS.SSSFD).toBe('Science, Society and Sustainable Futures Division');
  });

  it('maps ISD to full name', () => {
    expect(SCBD_UNITS_DIVISIONS.ISD).toBe('Implementation Support Division');
  });

  it('maps AD to full name', () => {
    expect(SCBD_UNITS_DIVISIONS.AD).toBe('Administration Division');
  });

  it('has non-empty string values for all keys', () => {
    for (const value of Object.values(SCBD_UNITS_DIVISIONS)) {
      expect(typeof value).toBe('string');
      expect(value.length).toBeGreaterThan(0);
    }
  });
});
