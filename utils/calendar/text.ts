/**
 * Normalize whitespace by collapsing consecutive whitespace and trimming edges.
 * @param value - Text to normalize.
 * @returns Normalized string with single spaces and no leading/trailing whitespace.
 */
export function normalizeWhitespace(value: string): string {
  return value
    .replace(/\r\n|\r|\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Convert an HTML string into human-readable text while preserving intentional separators.
 * @param html - HTML markup to convert.
 * @returns Decoded plain-text content.
 */
export function htmlToText(html: string): string {
  return decodeEntities(
    html
      .replace(/<\s*br\s*\/?>/gi, ' ')
      .replace(/<\s*\/p\s*>/gi, ' ')
      .replace(/<\s*\/li\s*>/gi, '; ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );
}

/**
 * Decode common HTML entities from the provided text.
 * @param text - String that may include HTML entities.
 * @returns Plain text with entities converted.
 */
export function decodeEntities(text: string): string {
  return text
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&ldquo;/gi, '\u201C')
    .replace(/&rdquo;/gi, '\u201D')
    .replace(/&lsquo;/gi, '\u2018')
    .replace(/&rsquo;/gi, '\u2019')
    .replace(/&mdash;/gi, '\u2014')
    .replace(/&ndash;/gi, '\u2013');
}

/**
 * Humanize a technical identifier by splitting on separators and capitalizing parts.
 * @param value - Identifier to humanize.
 * @returns Human-readable label.
 */
export function humanizeIdentifier(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    return '';
  }

  const hasMixedCase = /[a-z]/.test(trimmed) && /[A-Z]/.test(trimmed);

  if (hasMixedCase) {
    return trimmed;
  }

  return trimmed
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .split(' ')
    .map(part => part ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() : '')
    .join(' ');
}
