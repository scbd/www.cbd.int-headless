import { describe, it, expect } from 'vitest';
import {
  parseDecisionLabel,
  resolveDecisionHref,
  resolveDecisionHrefWithFallback,
  parseCbdDecisionPath,
} from '~/utils/calendar/decision-links';

// ---------------------------------------------------------------------------
// parseDecisionLabel
// ---------------------------------------------------------------------------

describe('parseDecisionLabel', () => {
  it('parses COP decision "COP 15/4"', () => {
    const result = parseDecisionLabel('COP 15/4');

    expect(result).not.toBeNull();
    expect(result!.type).toBe('COP');
    expect(result!.meetingNumber).toBe(15);
    expect(result!.decisionNumber).toBe(4);
  });

  it('parses CP decision "CP-11/7"', () => {
    const result = parseDecisionLabel('CP-11/7');

    expect(result).not.toBeNull();
    expect(result!.type).toBe('CP');
    expect(result!.meetingNumber).toBe(11);
    expect(result!.decisionNumber).toBe(7);
  });

  it('parses NP decision "NP-4/1"', () => {
    const result = parseDecisionLabel('NP-4/1');

    expect(result).not.toBeNull();
    expect(result!.type).toBe('NP');
    expect(result!.meetingNumber).toBe(4);
    expect(result!.decisionNumber).toBe(1);
  });

  it('parses case-insensitively', () => {
    const result = parseDecisionLabel('cop 15/4');

    expect(result).not.toBeNull();
    expect(result!.type).toBe('COP');
  });

  it('extracts paragraph tokens from "COP 15/4 P. 1, 2(a)"', () => {
    const result = parseDecisionLabel('COP 15/4 P. 1, 2(a)');

    expect(result).not.toBeNull();
    expect(result!.paragraphs.length).toBeGreaterThan(0);
    expect(result!.paragraphs).toContain('1');
  });

  it('returns null for null input', () => {
    expect(parseDecisionLabel(null)).toBeNull();
  });

  it('returns null for undefined input', () => {
    expect(parseDecisionLabel(undefined)).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(parseDecisionLabel('')).toBeNull();
  });

  it('returns null for whitespace-only', () => {
    expect(parseDecisionLabel('   ')).toBeNull();
  });

  it('returns null for unrecognized format', () => {
    expect(parseDecisionLabel('Decision ABC')).toBeNull();
  });

  it('returns null for bare number', () => {
    expect(parseDecisionLabel('42')).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// resolveDecisionHref
// ---------------------------------------------------------------------------

describe('resolveDecisionHref', () => {
  it('generates COP URL', () => {
    const href = resolveDecisionHref('COP 15/4');

    expect(href).toBe('https://www.cbd.int/decisions/cop/15/04');
  });

  it('generates CP MOP URL', () => {
    const href = resolveDecisionHref('CP-11/7');

    expect(href).toBe('https://www.cbd.int/decisions/mop?m=cp-mop-11-07');
  });

  it('generates NP MOP URL', () => {
    const href = resolveDecisionHref('NP-4/1');

    expect(href).toBe('https://www.cbd.int/decisions/np-mop?m=np-mop-04-01');
  });

  it('includes paragraph segment for COP with paragraph', () => {
    const href = resolveDecisionHref('COP 15/4 P. 1');

    expect(href).toBe('https://www.cbd.int/decisions/cop/15/04/1');
  });

  it('pads decision numbers to 2 digits', () => {
    const href = resolveDecisionHref('COP 15/4');

    expect(href).toContain('/04');
  });

  it('returns undefined for null', () => {
    expect(resolveDecisionHref(null)).toBeUndefined();
  });

  it('returns undefined for invalid label', () => {
    expect(resolveDecisionHref('invalid')).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// resolveDecisionHrefWithFallback
// ---------------------------------------------------------------------------

describe('resolveDecisionHrefWithFallback', () => {
  it('returns computed URL when no explicit href', () => {
    const result = resolveDecisionHrefWithFallback(null, 'COP 15/4');

    expect(result).toBe('https://www.cbd.int/decisions/cop/15/04');
  });

  it('returns explicit href when no label', () => {
    const result = resolveDecisionHrefWithFallback('https://example.com/decision', null);

    expect(result).toBe('https://example.com/decision');
  });

  it('prefers explicit href when paths differ', () => {
    const result = resolveDecisionHrefWithFallback(
      'https://www.cbd.int/other/path',
      'COP 15/4',
    );

    expect(result).toBe('https://www.cbd.int/other/path');
  });

  it('returns computed URL over raw when both exist and paths match but params differ', () => {
    const result = resolveDecisionHrefWithFallback(
      'https://www.cbd.int/decisions/mop',
      'CP-11/7',
    );

    expect(result).toBe('https://www.cbd.int/decisions/mop?m=cp-mop-11-07');
  });

  it('returns undefined when both are null', () => {
    expect(resolveDecisionHrefWithFallback(null, null)).toBeUndefined();
  });

  it('returns raw href for invalid URL gracefully', () => {
    const result = resolveDecisionHrefWithFallback('not-a-url', 'COP 15/4');

    expect(result).toBe('not-a-url');
  });

  it('trims empty raw href and uses computed', () => {
    const result = resolveDecisionHrefWithFallback('   ', 'COP 15/4');

    expect(result).toBe('https://www.cbd.int/decisions/cop/15/04');
  });
});

// ---------------------------------------------------------------------------
// parseCbdDecisionPath
// ---------------------------------------------------------------------------

describe('parseCbdDecisionPath', () => {
  it('parses COP decision path', () => {
    const result = parseCbdDecisionPath('CBD/COP/DEC/15/4');

    expect(result).not.toBeNull();
    expect(result!.label).toBe('COP 15/4');
    expect(result!.href).toContain('decisions/cop/15/04');
  });

  it('parses CP MOP decision path', () => {
    const result = parseCbdDecisionPath('CBD/CP/MOP/DEC/11/7');

    expect(result).not.toBeNull();
    expect(result!.label).toBe('CP-MOP 11/7');
    expect(result!.href).toContain('decisions/mop');
  });

  it('parses NP MOP decision path', () => {
    const result = parseCbdDecisionPath('CBD/NP/MOP/DEC/4/1');

    expect(result).not.toBeNull();
    expect(result!.label).toBe('NP-MOP 4/1');
    expect(result!.href).toContain('decisions/np-mop');
  });

  it('includes paragraph segments in label', () => {
    const result = parseCbdDecisionPath('CBD/COP/DEC/15/4/1');

    expect(result).not.toBeNull();
    expect(result!.label).toContain('P. 1');
  });

  it('returns null for empty string', () => {
    expect(parseCbdDecisionPath('')).toBeNull();
  });

  it('returns null for non-CBD paths', () => {
    expect(parseCbdDecisionPath('UNEP/COP/15/4')).toBeNull();
  });

  it('returns null for incomplete paths', () => {
    expect(parseCbdDecisionPath('CBD/COP')).toBeNull();
  });

  it('is case-insensitive', () => {
    const result = parseCbdDecisionPath('cbd/cop/dec/15/4');

    expect(result).not.toBeNull();
    expect(result!.label).toBe('COP 15/4');
  });
});
