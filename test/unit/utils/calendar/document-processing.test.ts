import { describe, it, expect } from 'vitest';
import {
  getDocStringValue,
  getDocBooleanValue,
  getDocSubjects,
  getDocSubsidiaryBodies,
  getDocGoverningBodies,
  getDocGbfSections,
  getDocGlobalTargets,
  getDocRecipients,
  getDocThemes,
  getDocFiles,
  getDocCountries,
  getDocDecisionIdentifiers,
  getDocDecisionLabels,
  collectValueLabelPairs,
  collectGlobalTargetEntries,
  collectCountryEntries,
} from '~/utils/calendar/document-processing';
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
// getDocStringValue
// ---------------------------------------------------------------------------

describe('getDocStringValue', () => {
  it('returns string value for matching key', () => {
    const doc = makeDoc({ status: 'confirmed' });

    expect(getDocStringValue(doc, 'status')).toBe('confirmed');
  });

  it('returns first non-empty value across multiple keys', () => {
    const doc = makeDoc({ status: '', statusKey: 'CONFIRMED' });

    expect(getDocStringValue(doc, 'status', 'statusKey')).toBe('CONFIRMED');
  });

  it('returns undefined when no matching key has a value', () => {
    const doc = makeDoc({});

    expect(getDocStringValue(doc, 'nonExistent')).toBeUndefined();
  });

  it('skips empty strings', () => {
    const doc = makeDoc({ status: '   ' });

    expect(getDocStringValue(doc, 'status')).toBeUndefined();
  });

  it('trims the returned value', () => {
    const doc = makeDoc({ status: '  confirmed  ' });

    expect(getDocStringValue(doc, 'status')).toBe('confirmed');
  });
});

// ---------------------------------------------------------------------------
// getDocBooleanValue
// ---------------------------------------------------------------------------

describe('getDocBooleanValue', () => {
  it('returns true for boolean true', () => {
    const doc = makeDoc({ actionRequired: true });

    expect(getDocBooleanValue(doc, 'actionRequired')).toBe(true);
  });

  it('returns false for boolean false', () => {
    const doc = makeDoc({ actionRequired: false });

    expect(getDocBooleanValue(doc, 'actionRequired')).toBe(false);
  });

  it('coerces string "true" to true', () => {
    const doc = makeDoc({ actionRequired: 'true' });

    expect(getDocBooleanValue(doc, 'actionRequired')).toBe(true);
  });

  it('coerces string "yes" to true', () => {
    const doc = makeDoc({ actionRequired: 'yes' });

    expect(getDocBooleanValue(doc, 'actionRequired')).toBe(true);
  });

  it('coerces string "y" to true', () => {
    const doc = makeDoc({ actionRequired: 'y' });

    expect(getDocBooleanValue(doc, 'actionRequired')).toBe(true);
  });

  it('coerces string "false" to false', () => {
    const doc = makeDoc({ actionRequired: 'false' });

    expect(getDocBooleanValue(doc, 'actionRequired')).toBe(false);
  });

  it('coerces string "no" to false', () => {
    const doc = makeDoc({ actionRequired: 'no' });

    expect(getDocBooleanValue(doc, 'actionRequired')).toBe(false);
  });

  it('coerces string "n" to false', () => {
    const doc = makeDoc({ actionRequired: 'n' });

    expect(getDocBooleanValue(doc, 'actionRequired')).toBe(false);
  });

  it('returns undefined for unrecognized string', () => {
    const doc = makeDoc({ actionRequired: 'maybe' });

    expect(getDocBooleanValue(doc, 'actionRequired')).toBeUndefined();
  });

  it('returns undefined for missing key', () => {
    const doc = makeDoc({});

    expect(getDocBooleanValue(doc, 'nonExistent')).toBeUndefined();
  });

  it('tries multiple keys in order', () => {
    const doc = makeDoc({ actionRequired: undefined, actionRequiredByParties: true });

    expect(getDocBooleanValue(doc, 'actionRequired', 'actionRequiredByParties')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Array field accessors
// ---------------------------------------------------------------------------

describe('getDocSubjects', () => {
  it('returns subjects array', () => {
    const doc = makeDoc({ subjects: ['biodiversity', 'marine'] });

    expect(getDocSubjects(doc)).toEqual(['biodiversity', 'marine']);
  });

  it('returns empty array when subjects missing', () => {
    expect(getDocSubjects(makeDoc({}))).toEqual([]);
  });

  it('splits comma-separated string', () => {
    const doc = makeDoc({ subjects: 'biodiversity,marine' });

    expect(getDocSubjects(doc)).toEqual(['biodiversity', 'marine']);
  });
});

describe('getDocSubsidiaryBodies', () => {
  it('returns subsidiary bodies array', () => {
    const doc = makeDoc({ subsidiaryBody: ['SBI', 'SBSTTA'] });

    expect(getDocSubsidiaryBodies(doc)).toEqual(['SBI', 'SBSTTA']);
  });

  it('returns empty array when missing', () => {
    expect(getDocSubsidiaryBodies(makeDoc({}))).toEqual([]);
  });
});

describe('getDocGoverningBodies', () => {
  it('returns governing bodies array', () => {
    const doc = makeDoc({ governingBody: ['CBD-COP'] });

    expect(getDocGoverningBodies(doc)).toEqual(['CBD-COP']);
  });

  it('returns empty array when missing', () => {
    expect(getDocGoverningBodies(makeDoc({}))).toEqual([]);
  });
});

describe('getDocGbfSections', () => {
  it('returns GBF sections array', () => {
    const doc = makeDoc({ gbfSections: ['GBF-SECTION-A'] });

    expect(getDocGbfSections(doc)).toEqual(['GBF-SECTION-A']);
  });

  it('returns empty array when missing', () => {
    expect(getDocGbfSections(makeDoc({}))).toEqual([]);
  });
});

describe('getDocGlobalTargets', () => {
  it('returns targets from gbfTargets field', () => {
    const doc = makeDoc({ gbfTargets: ['GBF-TARGET-01'] });

    expect(getDocGlobalTargets(doc)).toEqual(['GBF-TARGET-01']);
  });

  it('returns empty array when missing', () => {
    expect(getDocGlobalTargets(makeDoc({}))).toEqual([]);
  });
});

describe('getDocRecipients', () => {
  it('returns recipients array', () => {
    const doc = makeDoc({ recipient: ['Parties'] });

    expect(getDocRecipients(doc)).toEqual(['Parties']);
  });
});

describe('getDocThemes', () => {
  it('returns themes array', () => {
    const doc = makeDoc({ themes: ['biodiversity'] });

    expect(getDocThemes(doc)).toEqual(['biodiversity']);
  });
});

describe('getDocFiles', () => {
  it('returns files array', () => {
    const doc = makeDoc({ files: ['https://cbd.int/doc.pdf'] });

    expect(getDocFiles(doc)).toEqual(['https://cbd.int/doc.pdf']);
  });
});

describe('getDocCountries', () => {
  it('returns countries from eventCountry', () => {
    const doc = makeDoc({ eventCountry: 'CA' });

    expect(getDocCountries(doc)).toEqual(['CA']);
  });

  it('returns empty array when missing', () => {
    expect(getDocCountries(makeDoc({}))).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// getDocDecisionIdentifiers
// ---------------------------------------------------------------------------

describe('getDocDecisionIdentifiers', () => {
  it('returns decision identifiers from decisions array', () => {
    const doc = makeDoc({ decisions: ['CAL-DECISION-COP-15-4', 'CAL-DECISION-CP-11-7'] });

    expect(getDocDecisionIdentifiers(doc)).toEqual(['CAL-DECISION-COP-15-4', 'CAL-DECISION-CP-11-7']);
  });

  it('returns empty array when decisions missing', () => {
    expect(getDocDecisionIdentifiers(makeDoc({}))).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// getDocDecisionLabels (MR-02)
// ---------------------------------------------------------------------------

describe('getDocDecisionLabels', () => {
  it('uses decisions array with early return per MR-02', () => {
    const doc = makeDoc({ decisions: ['CAL-DECISION-COP-15-4'] });
    const labels = getDocDecisionLabels(doc);

    expect(labels).toHaveLength(1);
    expect(labels[0]).toBe('COP 15/4');
  });

  it('uses labelMap when provided', () => {
    const doc = makeDoc({ decisions: ['CAL-DECISION-COP-15-4'] });
    const labelMap = new Map([['CAL-DECISION-COP-15-4', 'Decision 15/4']]);
    const labels = getDocDecisionLabels(doc, labelMap);

    expect(labels).toEqual(['Decision 15/4']);
  });

  it('humanizes CP decision identifiers', () => {
    const doc = makeDoc({ decisions: ['CAL-DECISION-CP-11-7'] });
    const labels = getDocDecisionLabels(doc);

    expect(labels[0]).toBe('CP-11/7');
  });

  it('humanizes NP decision identifiers', () => {
    const doc = makeDoc({ decisions: ['CAL-DECISION-NP-4-1'] });
    const labels = getDocDecisionLabels(doc);

    expect(labels[0]).toBe('NP-4/1');
  });

  it('falls back to legacy copDecision when decisions is empty', () => {
    const doc = makeDoc({ decisions: [], copDecision: 'COP 15/4' });
    const labels = getDocDecisionLabels(doc);

    expect(labels.length).toBeGreaterThan(0);
  });

  it('strips COP prefix from legacy labels per MR-02', () => {
    const doc = makeDoc({ decisions: [], copDecision: 'COP 15/4' });
    const labels = getDocDecisionLabels(doc);

    expect(labels[0]).toBe('15/4');
  });

  it('deduplicates labels', () => {
    const doc = makeDoc({
      decisions: ['CAL-DECISION-COP-15-4', 'CAL-DECISION-COP-15-4'],
    });
    const labels = getDocDecisionLabels(doc);

    expect(labels).toHaveLength(1);
  });

  it('returns empty array when no decisions', () => {
    const doc = makeDoc({});

    expect(getDocDecisionLabels(doc)).toEqual([]);
  });

  it('humanizes bare number identifiers', () => {
    const doc = makeDoc({ decisions: ['CAL-DECISION-15-4'] });
    const labels = getDocDecisionLabels(doc);

    expect(labels[0]).toBe('15/4');
  });
});

// ---------------------------------------------------------------------------
// collectValueLabelPairs
// ---------------------------------------------------------------------------

describe('collectValueLabelPairs', () => {
  it('pairs values with labels', () => {
    const result = collectValueLabelPairs(['a', 'b'], ['Label A', 'Label B']);

    expect(result).toEqual([
      { value: 'a', label: 'Label A' },
      { value: 'b', label: 'Label B' },
    ]);
  });

  it('uses first label as fallback when fewer labels', () => {
    const result = collectValueLabelPairs(['a', 'b'], ['Label A']);

    expect(result[1]!.label).toBe('Label A');
  });

  it('returns null label when no labels provided', () => {
    const result = collectValueLabelPairs(['a']);

    expect(result).toEqual([{ value: 'a', label: null }]);
  });

  it('returns empty array for empty values', () => {
    expect(collectValueLabelPairs([])).toEqual([]);
  });

  it('splits comma-separated strings', () => {
    const result = collectValueLabelPairs('a,b');

    expect(result).toHaveLength(2);
  });

  it('falls back to first label as value when values is empty but labels exist', () => {
    const result = collectValueLabelPairs([], ['Label']);

    expect(result).toEqual([{ value: 'Label', label: 'Label' }]);
  });
});

// ---------------------------------------------------------------------------
// collectGlobalTargetEntries
// ---------------------------------------------------------------------------

describe('collectGlobalTargetEntries', () => {
  it('collects from gbfTargets field', () => {
    const doc = makeDoc({ gbfTargets: ['GBF-TARGET-01'] });
    const entries = collectGlobalTargetEntries(doc);

    expect(entries.length).toBeGreaterThan(0);
    expect(entries[0]!.value).toBe('GBF-TARGET-01');
  });

  it('returns empty for doc without target fields', () => {
    const doc = makeDoc({});

    expect(collectGlobalTargetEntries(doc)).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// collectCountryEntries
// ---------------------------------------------------------------------------

describe('collectCountryEntries', () => {
  it('collects from eventCountry field', () => {
    const doc = makeDoc({ eventCountry: 'CA', eventCountryEn: 'Canada' });
    const entries = collectCountryEntries(doc);

    expect(entries.length).toBeGreaterThan(0);
    expect(entries[0]!.value).toBe('CA');
    expect(entries[0]!.label).toBe('Canada');
  });

  it('returns empty for doc without country fields', () => {
    const doc = makeDoc({});

    expect(collectCountryEntries(doc)).toEqual([]);
  });
});
