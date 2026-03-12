import { describe, it, expect } from 'vitest';
import {
  CBD_GREEN,
  normalizeTypeKey,
  getTypeColor,
} from '~/utils/calendar/type-colors';
import type { CalendarTypeKey, CalendarTypeColor } from '~/utils/calendar/type-colors';

// ---------------------------------------------------------------------------
// CBD_GREEN
// ---------------------------------------------------------------------------

describe('CBD_GREEN', () => {
  it('is the expected hex color', () => {
    expect(CBD_GREEN).toBe('#009b48');
  });
});

// ---------------------------------------------------------------------------
// normalizeTypeKey
// ---------------------------------------------------------------------------

describe('normalizeTypeKey', () => {
  it('returns "cop" for "COP"', () => {
    expect(normalizeTypeKey('COP')).toBe('cop');
  });

  it('returns "cop" for "Conference of the Parties"', () => {
    expect(normalizeTypeKey('Conference of the Parties')).toBe('cop');
  });

  it('returns "sbstta" for "SBSTTA"', () => {
    expect(normalizeTypeKey('SBSTTA')).toBe('sbstta');
  });

  it('returns "sbstta" for "Subsidiary Body on Scientific"', () => {
    expect(normalizeTypeKey('Subsidiary Body on Scientific')).toBe('sbstta');
  });

  it('returns "sbi" for "SBI"', () => {
    expect(normalizeTypeKey('SBI')).toBe('sbi');
  });

  it('returns "sbi" for "Subsidiary Body on Implementation"', () => {
    expect(normalizeTypeKey('Subsidiary Body on Implementation')).toBe('sbi');
  });

  it('returns "meeting" for "meeting"', () => {
    expect(normalizeTypeKey('meeting')).toBe('meeting');
  });

  it('returns "meeting" for "session"', () => {
    expect(normalizeTypeKey('session')).toBe('meeting');
  });

  it('returns "meeting" for "conference"', () => {
    expect(normalizeTypeKey('conference')).toBe('meeting');
  });

  it('returns "meeting" for "plenary"', () => {
    expect(normalizeTypeKey('plenary')).toBe('meeting');
  });

  it('returns "notification" for "notification"', () => {
    expect(normalizeTypeKey('notification')).toBe('notification');
  });

  it('returns "nominations" for "nominations"', () => {
    expect(normalizeTypeKey('nominations')).toBe('nominations');
  });

  it('returns "submission" for "submission"', () => {
    expect(normalizeTypeKey('submission')).toBe('submission');
  });

  it('returns "peerReview" for "peer review"', () => {
    expect(normalizeTypeKey('peer review')).toBe('peerReview');
  });

  it('returns "peerReview" for "peer-review"', () => {
    expect(normalizeTypeKey('peer-review')).toBe('peerReview');
  });

  it('returns "report" for "report"', () => {
    expect(normalizeTypeKey('report')).toBe('report');
  });

  it('returns "forum" for "forum"', () => {
    expect(normalizeTypeKey('forum')).toBe('forum');
  });

  it('returns "webinar" for "webinar"', () => {
    expect(normalizeTypeKey('webinar')).toBe('webinar');
  });

  it('returns "workshop" for "workshop"', () => {
    expect(normalizeTypeKey('workshop')).toBe('workshop');
  });

  it('returns "workshop" for "colloquium"', () => {
    expect(normalizeTypeKey('colloquium')).toBe('workshop');
  });

  it('returns "workshop" for "seminar"', () => {
    expect(normalizeTypeKey('seminar')).toBe('workshop');
  });

  it('returns "training" for "training"', () => {
    expect(normalizeTypeKey('training')).toBe('training');
  });

  it('returns "training" for "capacity building"', () => {
    expect(normalizeTypeKey('capacity building')).toBe('training');
  });

  it('returns "consultation" for "consultation"', () => {
    expect(normalizeTypeKey('consultation')).toBe('consultation');
  });

  it('returns "consultation" for "dialogue"', () => {
    expect(normalizeTypeKey('dialogue')).toBe('consultation');
  });

  it('returns "campaign" for "campaign"', () => {
    expect(normalizeTypeKey('campaign')).toBe('campaign');
  });

  it('returns "campaign" for "awareness"', () => {
    expect(normalizeTypeKey('awareness')).toBe('campaign');
  });

  it('returns "campaign" for "outreach"', () => {
    expect(normalizeTypeKey('outreach')).toBe('campaign');
  });

  it('returns "activity" for "activity"', () => {
    expect(normalizeTypeKey('activity')).toBe('activity');
  });

  it('returns "activity" for "initiative"', () => {
    expect(normalizeTypeKey('initiative')).toBe('activity');
  });

  it('returns "activity" for "programme"', () => {
    expect(normalizeTypeKey('programme')).toBe('activity');
  });

  it('returns "other" for null', () => {
    expect(normalizeTypeKey(null)).toBe('other');
  });

  it('returns "other" for undefined', () => {
    expect(normalizeTypeKey(undefined)).toBe('other');
  });

  it('returns "other" for empty string', () => {
    expect(normalizeTypeKey('')).toBe('other');
  });

  it('returns "other" for unrecognized value', () => {
    expect(normalizeTypeKey('xyz123')).toBe('other');
  });
});

// ---------------------------------------------------------------------------
// getTypeColor
// ---------------------------------------------------------------------------

describe('getTypeColor', () => {
  const allTypeKeys: CalendarTypeKey[] = [
    'cop', 'sbstta', 'sbi', 'meeting', 'notification', 'nominations',
    'submission', 'peerReview', 'report', 'forum', 'activity',
    'calendarActivity', 'webinar', 'workshop', 'training', 'consultation',
    'campaign', 'other',
  ];

  it('returns valid hex colors for all type keys', () => {
    for (const key of allTypeKeys) {
      const color = getTypeColor(key);

      expect(color.background).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(color.text).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });

  it('returns CBD_GREEN for cop', () => {
    expect(getTypeColor('cop').background).toBe(CBD_GREEN);
  });

  it('returns CBD_GREEN for sbstta', () => {
    expect(getTypeColor('sbstta').background).toBe(CBD_GREEN);
  });

  it('returns CBD_GREEN for sbi', () => {
    expect(getTypeColor('sbi').background).toBe(CBD_GREEN);
  });

  it('normalizes raw type strings', () => {
    const color = getTypeColor('Conference of the Parties');

    expect(color.background).toBe(CBD_GREEN);
  });

  it('returns "other" colors for null', () => {
    const color = getTypeColor(null);

    expect(color).toEqual(getTypeColor('other'));
  });

  it('returns "other" colors for undefined', () => {
    const color = getTypeColor(undefined);

    expect(color).toEqual(getTypeColor('other'));
  });

  it('returns white text for all types', () => {
    for (const key of allTypeKeys) {
      expect(getTypeColor(key).text).toBe('#ffffff');
    }
  });
});
