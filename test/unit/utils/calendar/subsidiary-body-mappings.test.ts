import { describe, it, expect } from 'vitest';
import {
  subsidiaryBodyToSubject,
  subjectToSubsidiaryBody,
  mapIdentifier,
  getAllSubsidiaryBodyIdentifiers,
  getAllSubjectIdentifiers,
  isSubsidiaryBodyIdentifier,
  isSubjectIdentifier,
} from '~/utils/calendar/subsidiary-body-mappings';

// ---------------------------------------------------------------------------
// subsidiaryBodyToSubject
// ---------------------------------------------------------------------------

describe('subsidiaryBodyToSubject', () => {
  it('maps CAL-SUBSIDIARY-BODY-SBI → CBD-SUBJECT-SBI', () => {
    expect(subsidiaryBodyToSubject('CAL-SUBSIDIARY-BODY-SBI')).toBe('CBD-SUBJECT-SBI');
  });

  it('maps CAL-SUBSIDIARY-BODY-SBSTTA → CBD-SUBJECT-SBSTTA', () => {
    expect(subsidiaryBodyToSubject('CAL-SUBSIDIARY-BODY-SBSTTA')).toBe('CBD-SUBJECT-SBSTTA');
  });

  it('maps CAL-SUBSIDIARY-BODY-CP → CBD-SUBJECT-CPB', () => {
    expect(subsidiaryBodyToSubject('CAL-SUBSIDIARY-BODY-CP')).toBe('CBD-SUBJECT-CPB');
  });

  it('maps CAL-SUBSIDIARY-BODY-NP → CBD-SUBJECT-NPB', () => {
    expect(subsidiaryBodyToSubject('CAL-SUBSIDIARY-BODY-NP')).toBe('CBD-SUBJECT-NPB');
  });

  it('maps CAL-SUBSIDIARY-BODY-8J → CBD-SUBJECT-8J', () => {
    expect(subsidiaryBodyToSubject('CAL-SUBSIDIARY-BODY-8J')).toBe('CBD-SUBJECT-8J');
  });

  it('maps CAL-SUBSIDIARY-BODY-COP → CBD-SUBJECT-COP', () => {
    expect(subsidiaryBodyToSubject('CAL-SUBSIDIARY-BODY-COP')).toBe('CBD-SUBJECT-COP');
  });

  it('maps short name SBI → CBD-SUBJECT-SBI', () => {
    expect(subsidiaryBodyToSubject('SBI')).toBe('CBD-SUBJECT-SBI');
  });

  it('maps short name SBSTTA → CBD-SUBJECT-SBSTTA', () => {
    expect(subsidiaryBodyToSubject('SBSTTA')).toBe('CBD-SUBJECT-SBSTTA');
  });

  it('maps short name COP → CBD-SUBJECT-COP', () => {
    expect(subsidiaryBodyToSubject('COP')).toBe('CBD-SUBJECT-COP');
  });

  it('returns undefined for unknown identifier', () => {
    expect(subsidiaryBodyToSubject('UNKNOWN')).toBeUndefined();
  });

  it('returns undefined for empty string', () => {
    expect(subsidiaryBodyToSubject('')).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// subjectToSubsidiaryBody
// ---------------------------------------------------------------------------

describe('subjectToSubsidiaryBody', () => {
  it('maps CBD-SUBJECT-SBI → SBI', () => {
    expect(subjectToSubsidiaryBody('CBD-SUBJECT-SBI')).toBe('SBI');
  });

  it('maps CBD-SUBJECT-SBSTTA → SBSTTA', () => {
    expect(subjectToSubsidiaryBody('CBD-SUBJECT-SBSTTA')).toBe('SBSTTA');
  });

  it('maps CBD-SUBJECT-CPB → CP', () => {
    expect(subjectToSubsidiaryBody('CBD-SUBJECT-CPB')).toBe('CP');
  });

  it('maps CBD-SUBJECT-NPB → NP', () => {
    expect(subjectToSubsidiaryBody('CBD-SUBJECT-NPB')).toBe('NP');
  });

  it('maps CBD-SUBJECT-8J → 8J', () => {
    expect(subjectToSubsidiaryBody('CBD-SUBJECT-8J')).toBe('8J');
  });

  it('maps CBD-SUBJECT-COP → COP', () => {
    expect(subjectToSubsidiaryBody('CBD-SUBJECT-COP')).toBe('COP');
  });

  it('returns undefined for unknown identifier', () => {
    expect(subjectToSubsidiaryBody('CBD-SUBJECT-UNKNOWN')).toBeUndefined();
  });

  it('returns undefined for empty string', () => {
    expect(subjectToSubsidiaryBody('')).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// mapIdentifier (bidirectional)
// ---------------------------------------------------------------------------

describe('mapIdentifier', () => {
  it('maps subsidiary body to subject', () => {
    expect(mapIdentifier('SBI')).toBe('CBD-SUBJECT-SBI');
  });

  it('maps subject to subsidiary body', () => {
    expect(mapIdentifier('CBD-SUBJECT-SBI')).toBe('SBI');
  });

  it('returns undefined for unknown identifier', () => {
    expect(mapIdentifier('UNKNOWN')).toBeUndefined();
  });

  it('returns undefined for empty string', () => {
    expect(mapIdentifier('')).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// getAllSubsidiaryBodyIdentifiers
// ---------------------------------------------------------------------------

describe('getAllSubsidiaryBodyIdentifiers', () => {
  it('returns 6 short identifiers', () => {
    const ids = getAllSubsidiaryBodyIdentifiers();

    expect(ids).toHaveLength(6);
    expect(ids).toContain('SBI');
    expect(ids).toContain('SBSTTA');
    expect(ids).toContain('CP');
    expect(ids).toContain('NP');
    expect(ids).toContain('8J');
    expect(ids).toContain('COP');
  });
});

// ---------------------------------------------------------------------------
// getAllSubjectIdentifiers
// ---------------------------------------------------------------------------

describe('getAllSubjectIdentifiers', () => {
  it('returns 6 subject identifiers', () => {
    const ids = getAllSubjectIdentifiers();

    expect(ids).toHaveLength(6);
    expect(ids).toContain('CBD-SUBJECT-SBI');
    expect(ids).toContain('CBD-SUBJECT-SBSTTA');
    expect(ids).toContain('CBD-SUBJECT-CPB');
    expect(ids).toContain('CBD-SUBJECT-NPB');
    expect(ids).toContain('CBD-SUBJECT-8J');
    expect(ids).toContain('CBD-SUBJECT-COP');
  });
});

// ---------------------------------------------------------------------------
// isSubsidiaryBodyIdentifier
// ---------------------------------------------------------------------------

describe('isSubsidiaryBodyIdentifier', () => {
  it('returns true for full identifier', () => {
    expect(isSubsidiaryBodyIdentifier('CAL-SUBSIDIARY-BODY-SBI')).toBe(true);
  });

  it('returns true for short name', () => {
    expect(isSubsidiaryBodyIdentifier('SBI')).toBe(true);
  });

  it('returns false for subject identifier', () => {
    expect(isSubsidiaryBodyIdentifier('CBD-SUBJECT-SBI')).toBe(false);
  });

  it('returns false for unknown', () => {
    expect(isSubsidiaryBodyIdentifier('UNKNOWN')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isSubsidiaryBodyIdentifier('')).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// isSubjectIdentifier
// ---------------------------------------------------------------------------

describe('isSubjectIdentifier', () => {
  it('returns true for subject identifier', () => {
    expect(isSubjectIdentifier('CBD-SUBJECT-SBI')).toBe(true);
  });

  it('returns false for subsidiary body identifier', () => {
    expect(isSubjectIdentifier('SBI')).toBe(false);
  });

  it('returns false for unknown', () => {
    expect(isSubjectIdentifier('UNKNOWN')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isSubjectIdentifier('')).toBe(false);
  });
});
