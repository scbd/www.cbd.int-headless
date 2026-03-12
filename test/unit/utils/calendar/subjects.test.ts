import { describe, it, expect } from 'vitest';
import {
  buildSubjectLabelMap,
  resolveSubjectLabel,
  fallbackSubjectLabel,
} from '~/utils/calendar/subjects';

// ---------------------------------------------------------------------------
// buildSubjectLabelMap
// ---------------------------------------------------------------------------

describe('buildSubjectLabelMap', () => {
  it('builds a map from value/label options', () => {
    const options = [
      { value: 'CBD-SUBJECT-MARINE', label: 'Marine and Coastal' },
      { value: 'CBD-SUBJECT-FORESTS', label: 'Forests' },
    ];
    const result = buildSubjectLabelMap(options);

    expect(result['CBD-SUBJECT-MARINE']).toBe('Marine and Coastal');
    expect(result['CBD-SUBJECT-FORESTS']).toBe('Forests');
  });

  it('returns empty object for empty options', () => {
    expect(buildSubjectLabelMap([])).toEqual({});
  });

  it('overwrites duplicates with last value', () => {
    const options = [
      { value: 'A', label: 'First' },
      { value: 'A', label: 'Second' },
    ];
    const result = buildSubjectLabelMap(options);

    expect(result['A']).toBe('Second');
  });
});

// ---------------------------------------------------------------------------
// resolveSubjectLabel
// ---------------------------------------------------------------------------

describe('resolveSubjectLabel', () => {
  const labels = {
    'CBD-SUBJECT-MARINE': 'Marine and Coastal',
    'CBD-SUBJECT-FORESTS': 'Forests',
  };

  it('returns the label for a known identifier', () => {
    expect(resolveSubjectLabel('CBD-SUBJECT-MARINE', labels)).toBe('Marine and Coastal');
  });

  it('returns empty string for unknown identifier', () => {
    expect(resolveSubjectLabel('CBD-SUBJECT-UNKNOWN', labels)).toBe('');
  });

  it('returns empty string for empty identifier', () => {
    expect(resolveSubjectLabel('', labels)).toBe('');
  });
});

// ---------------------------------------------------------------------------
// fallbackSubjectLabel
// ---------------------------------------------------------------------------

describe('fallbackSubjectLabel', () => {
  it('strips CBD-SUBJECT- prefix and humanizes', () => {
    expect(fallbackSubjectLabel('CBD-SUBJECT-MARINE-COASTAL')).toBe('Marine Coastal');
  });

  it('strips CBD- prefix and humanizes', () => {
    expect(fallbackSubjectLabel('CBD-FORESTS')).toBe('Forests');
  });

  it('handles underscores', () => {
    expect(fallbackSubjectLabel('CBD_SUBJECT_MARINE_COASTAL')).toBe('Marine Coastal');
  });

  it('returns original when nothing to strip', () => {
    expect(fallbackSubjectLabel('')).toBe('');
  });

  it('capitalizes each word', () => {
    expect(fallbackSubjectLabel('CBD-SUBJECT-INLAND-WATERS')).toBe('Inland Waters');
  });

  it('returns identifier when cleaned result is empty', () => {
    // Edge case: prefix covers entire string
    expect(fallbackSubjectLabel('CBD-SUBJECT-')).toBe('CBD-SUBJECT-');
  });
});
