import type { CalendarDoc, NotificationAttachment } from '~/types/calendar-activity';
import { htmlToText, normalizeWhitespace } from './text';

export const NOTIFICATION_BASE_URL = 'https://www.cbd.int';

export type NotificationKey = string;

const notificationKeyCache = new WeakMap<CalendarDoc, NotificationKey[]>();

function appendNotificationKey(
  key: string,
  keys: NotificationKey[],
  seen: Set<NotificationKey>,
): void {
  const trimmed = key.trim();

  if (!trimmed) {
    return;
  }

  const match = trimmed.match(/^\d{4}-\d{3}$/u);

  if (!match) {
    return;
  }

  const normalized = match[0];

  if (seen.has(normalized)) {
    return;
  }

  seen.add(normalized);
  keys.push(normalized);
}

function collectNotificationKeys(
  value: unknown,
  keys: NotificationKey[],
  seen: Set<NotificationKey>,
): void {
  if (typeof value === 'string') {
    const matches = value.match(/\d{4}-\d{3}/gu);

    if (matches) {
      matches.forEach(match => appendNotificationKey(match, keys, seen));
      return;
    }

    appendNotificationKey(value, keys, seen);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach(entry => collectNotificationKeys(entry, keys, seen));
  }
}

/**
 * Resolve a notification URL against the CBD domain.
 * @param path - Path or absolute URL.
 * @returns Absolute URL string.
 */
export function resolveNotificationUrl(path: string): string {
  try {
    return new URL(path, NOTIFICATION_BASE_URL).toString();
  } catch {
    return path;
  }
}

/**
 * Derive a filename from a URL when the name is missing.
 * @param url - Attachment URL.
 * @returns File name.
 */
export function deriveNameFromUrl(url: string): string {
  if (!url) {
    return '';
  }

  const normalized = url.split('?')[0] ?? url;
  const segments = normalized.split('/').filter(Boolean);

  return segments.length > 0 ? segments[segments.length - 1] ?? url : url;
}

/**
 * Build the canonical link for a notification symbol.
 * @param key - Notification symbol (format "YYYY-NNN").
 * @returns Absolute URL for the notification page.
 */
export function buildNotificationLink(key: NotificationKey): string {
  return resolveNotificationUrl(`/notifications/${key}`);
}

/**
 * Convert notification attachment metadata from SOLR documents.
 * @param files - Raw file entries from SOLR.
 * @returns Array of attachment objects.
 */
export function parseNotificationAttachments(files?: string[]): NotificationAttachment[] {
  if (!files || files.length === 0) {
    return [];
  }

  const attachments: NotificationAttachment[] = [];

  files.forEach(entry => {
    if (!entry) {
      return;
    }

    try {
      const parsed = JSON.parse(entry) as unknown;
      const collection = Array.isArray(parsed) ? parsed : [parsed];

      collection.forEach(item => {
        if (!item || typeof item !== 'object') {
          return;
        }

        const candidate = item as Record<string, unknown>;
        const url = typeof candidate.url === 'string'
          ? candidate.url
          : typeof candidate.link === 'string'
            ? candidate.link
            : '';

        if (!url) {
          return;
        }

        attachments.push({
          url: resolveNotificationUrl(url),
          name: typeof candidate.name === 'string' ? candidate.name : deriveNameFromUrl(url),
        });
      });
    } catch {
      attachments.push({
        url: resolveNotificationUrl(entry),
        name: deriveNameFromUrl(entry),
      });
    }
  });

  const seen = new Set<string>();

  return attachments.filter(attachment => {
    if (!attachment.url || seen.has(attachment.url)) {
      return false;
    }

    seen.add(attachment.url);
    if (!attachment.name || attachment.name.trim().length === 0) {
      attachment.name = deriveNameFromUrl(attachment.url);
    }
    return true;
  });
}

/**
 * Build a short excerpt from HTML or plain text content.
 * @param source - Raw content.
 * @returns Excerpt text.
 */
export function buildNotificationExcerpt(source: string | null | undefined): string | undefined {
  if (!source) {
    return undefined;
  }

  const plain = source.includes('<') && source.includes('>')
    ? htmlToText(source)
    : normalizeWhitespace(source);

  if (!plain) {
    return undefined;
  }

  if (plain.length <= 280) {
    return plain;
  }

  return `${plain.slice(0, 277).trimEnd()}...`;
}

/**
 * Get distinct notification keys from a calendar document.
 * Uses `symbol` field exclusively per MR-03.
 * @param doc - Calendar document.
 * @returns Unique notification keys.
 */
export function getNotificationKeys(doc: CalendarDoc): NotificationKey[] {
  const cached = notificationKeyCache.get(doc);

  if (cached) {
    return cached;
  }

  const keys: NotificationKey[] = [];
  const seen = new Set<NotificationKey>();

  const anyDoc = doc as Record<string, unknown>;

  collectNotificationKeys(anyDoc['notificationKey'], keys, seen);
  collectNotificationKeys(anyDoc['notificationSymbol'], keys, seen);
  collectNotificationKeys(anyDoc['notificationKeys'], keys, seen);
  collectNotificationKeys(anyDoc['relatedDocuments'], keys, seen);

  const notifications = (doc as Record<string, unknown>)['notifications'];

  collectNotificationKeys(notifications, keys, seen);

  notificationKeyCache.set(doc, keys);
  return keys;
}
