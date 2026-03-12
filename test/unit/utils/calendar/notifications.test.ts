import { describe, it, expect } from 'vitest';
import {
  NOTIFICATION_BASE_URL,
  resolveNotificationUrl,
  deriveNameFromUrl,
  buildNotificationLink,
  parseNotificationAttachments,
  buildNotificationExcerpt,
  getNotificationKeys,
} from '~/utils/calendar/notifications';
import type { CalendarDoc } from '~/types/calendar-activity';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

function makeDoc(overrides: Record<string, unknown>): CalendarDoc {
  return {
    id: 'doc-1',
    schema: 'notification',
    identifier: 'TEST',
    title: { en: 'Test' },
    startDate: '2025-01-01',
    endDate: null,
    createdDate: '2025-01-01',
    status: 'published',
    statusKey: 'published',
    statusCOA: 'published',
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
    reference: '',
    sender: '',
    recipients: [],
    actionDate: null,
    deadline: null,
    files: [],
    fulltext: { en: '' },
    ...overrides,
  } as unknown as CalendarDoc;
}

// ---------------------------------------------------------------------------
// NOTIFICATION_BASE_URL
// ---------------------------------------------------------------------------

describe('NOTIFICATION_BASE_URL', () => {
  it('is https://www.cbd.int', () => {
    expect(NOTIFICATION_BASE_URL).toBe('https://www.cbd.int');
  });
});

// ---------------------------------------------------------------------------
// resolveNotificationUrl
// ---------------------------------------------------------------------------

describe('resolveNotificationUrl', () => {
  it('resolves relative path against CBD domain', () => {
    expect(resolveNotificationUrl('/notifications/2024-001')).toBe(
      'https://www.cbd.int/notifications/2024-001',
    );
  });

  it('passes through absolute URLs', () => {
    expect(resolveNotificationUrl('https://example.com/doc.pdf')).toBe(
      'https://example.com/doc.pdf',
    );
  });

  it('resolves colon-prefixed paths against base URL', () => {
    // new URL(':::invalid', base) succeeds with relative resolution
    const result = resolveNotificationUrl(':::invalid');

    expect(result).toContain('cbd.int');
  });
});

// ---------------------------------------------------------------------------
// deriveNameFromUrl
// ---------------------------------------------------------------------------

describe('deriveNameFromUrl', () => {
  it('extracts last path segment', () => {
    expect(deriveNameFromUrl('https://cbd.int/docs/report.pdf')).toBe('report.pdf');
  });

  it('strips query params before extracting', () => {
    expect(deriveNameFromUrl('https://cbd.int/docs/file.pdf?v=1')).toBe('file.pdf');
  });

  it('returns empty string for empty input', () => {
    expect(deriveNameFromUrl('')).toBe('');
  });

  it('returns URL when no segments', () => {
    expect(deriveNameFromUrl('file.pdf')).toBe('file.pdf');
  });
});

// ---------------------------------------------------------------------------
// buildNotificationLink
// ---------------------------------------------------------------------------

describe('buildNotificationLink', () => {
  it('builds link from notification key', () => {
    expect(buildNotificationLink('2024-001')).toBe(
      'https://www.cbd.int/notifications/2024-001',
    );
  });

  it('builds link for different key format', () => {
    expect(buildNotificationLink('2025-123')).toBe(
      'https://www.cbd.int/notifications/2025-123',
    );
  });
});

// ---------------------------------------------------------------------------
// parseNotificationAttachments
// ---------------------------------------------------------------------------

describe('parseNotificationAttachments', () => {
  it('returns empty array for undefined', () => {
    expect(parseNotificationAttachments(undefined)).toEqual([]);
  });

  it('returns empty array for empty array', () => {
    expect(parseNotificationAttachments([])).toEqual([]);
  });

  it('parses JSON entries with url field', () => {
    const files = [JSON.stringify({ url: '/docs/file.pdf', name: 'File' })];
    const result = parseNotificationAttachments(files);

    expect(result).toHaveLength(1);
    expect(result[0]!.name).toBe('File');
    expect(result[0]!.url).toContain('file.pdf');
  });

  it('parses JSON entries with link field', () => {
    const files = [JSON.stringify({ link: '/docs/file.pdf', name: 'File' })];
    const result = parseNotificationAttachments(files);

    expect(result).toHaveLength(1);
    expect(result[0]!.url).toContain('file.pdf');
  });

  it('derives name from URL when name is missing', () => {
    const files = [JSON.stringify({ url: '/docs/report.pdf' })];
    const result = parseNotificationAttachments(files);

    expect(result[0]!.name).toBe('report.pdf');
  });

  it('handles plain URL strings (non-JSON)', () => {
    const files = ['https://cbd.int/docs/file.pdf'];
    const result = parseNotificationAttachments(files);

    expect(result).toHaveLength(1);
    expect(result[0]!.url).toContain('file.pdf');
  });

  it('deduplicates by URL', () => {
    const files = [
      JSON.stringify({ url: '/docs/file.pdf', name: 'File' }),
      JSON.stringify({ url: '/docs/file.pdf', name: 'Duplicate' }),
    ];
    const result = parseNotificationAttachments(files);

    expect(result).toHaveLength(1);
  });

  it('skips entries without URL', () => {
    const files = [JSON.stringify({ name: 'No URL' })];
    const result = parseNotificationAttachments(files);

    expect(result).toHaveLength(0);
  });

  it('handles JSON arrays within entries', () => {
    const files = [JSON.stringify([
      { url: '/docs/a.pdf', name: 'A' },
      { url: '/docs/b.pdf', name: 'B' },
    ])];
    const result = parseNotificationAttachments(files);

    expect(result).toHaveLength(2);
  });
});

// ---------------------------------------------------------------------------
// buildNotificationExcerpt
// ---------------------------------------------------------------------------

describe('buildNotificationExcerpt', () => {
  it('returns undefined for null', () => {
    expect(buildNotificationExcerpt(null)).toBeUndefined();
  });

  it('returns undefined for undefined', () => {
    expect(buildNotificationExcerpt(undefined)).toBeUndefined();
  });

  it('returns undefined for empty string', () => {
    expect(buildNotificationExcerpt('')).toBeUndefined();
  });

  it('returns plain text unchanged when under 280 chars', () => {
    expect(buildNotificationExcerpt('Short text')).toBe('Short text');
  });

  it('truncates long text to 280 chars with ellipsis', () => {
    const longText = 'A'.repeat(300);
    const result = buildNotificationExcerpt(longText);

    expect(result!.length).toBeLessThanOrEqual(280);
    expect(result!.endsWith('...')).toBe(true);
  });

  it('strips HTML tags from content', () => {
    const html = '<p>Hello <b>world</b></p>';
    const result = buildNotificationExcerpt(html);

    expect(result).toBe('Hello world');
  });

  it('normalizes whitespace in plain text', () => {
    expect(buildNotificationExcerpt('  multiple   spaces  ')).toBe('multiple spaces');
  });
});

// ---------------------------------------------------------------------------
// getNotificationKeys (MR-03)
// ---------------------------------------------------------------------------

describe('getNotificationKeys', () => {
  it('extracts keys from notificationKey field', () => {
    const doc = makeDoc({ notificationKey: '2024-001' });
    const keys = getNotificationKeys(doc);

    expect(keys).toContain('2024-001');
  });

  it('extracts keys from notificationSymbol field', () => {
    const doc = makeDoc({ notificationSymbol: '2025-123' });
    const keys = getNotificationKeys(doc);

    expect(keys).toContain('2025-123');
  });

  it('extracts keys from arrays', () => {
    const doc = makeDoc({ notificationKeys: ['2024-001', '2024-002'] });
    const keys = getNotificationKeys(doc);

    expect(keys).toContain('2024-001');
    expect(keys).toContain('2024-002');
  });

  it('deduplicates keys', () => {
    const doc = makeDoc({
      notificationKey: '2024-001',
      notificationSymbol: '2024-001',
    });
    const keys = getNotificationKeys(doc);
    const unique = [...new Set(keys)];

    expect(keys).toEqual(unique);
  });

  it('returns empty array when no notification fields', () => {
    const doc = makeDoc({});
    const keys = getNotificationKeys(doc);

    expect(keys).toEqual([]);
  });

  it('only matches YYYY-NNN format', () => {
    const doc = makeDoc({ notificationKey: 'invalid-key' });
    const keys = getNotificationKeys(doc);

    expect(keys).toEqual([]);
  });

  it('extracts keys embedded in longer strings', () => {
    const doc = makeDoc({
      notificationKey: 'SCBD/SPS/DC/2024-001/2',
    });
    const keys = getNotificationKeys(doc);

    expect(keys).toContain('2024-001');
  });

  it('caches results for same doc object', () => {
    const doc = makeDoc({ notificationKey: '2024-001' });
    const first = getNotificationKeys(doc);
    const second = getNotificationKeys(doc);

    expect(first).toBe(second);
  });
});
