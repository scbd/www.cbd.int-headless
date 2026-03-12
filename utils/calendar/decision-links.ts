type DecisionType = 'COP' | 'CP' | 'NP';

interface ParsedDecisionLabel {
  type: DecisionType;
  meetingNumber: number;
  decisionNumber: number;
  paragraphs: string[];
}

export interface DecisionEntry {
  label: string;
  href?: string;
}

function normalizeParagraphToken(token: string): string {
  const trimmed = token.trim();

  if (!trimmed) {
    return '';
  }

  const digitLetterMatch = trimmed.match(/^([0-9]+)\s*\(?\s*([a-z])\s*\)?$/i);

  if (digitLetterMatch) {
    const numberPart = digitLetterMatch[1] ?? '';
    const letterPart = digitLetterMatch[2] ?? '';

    if (numberPart) {
      return `${Number.parseInt(numberPart, 10)}(${letterPart.toLowerCase()})`;
    }
  }

  if (/^[0-9]+$/.test(trimmed)) {
    const numeric = Number.parseInt(trimmed, 10);

    if (Number.isFinite(numeric)) {
      return String(numeric);
    }
  }

  const cleaned = trimmed.replace(/[().]/g, '').replace(/\s+/g, ' ').replace(/,+$/, '');

  return cleaned.replace(/[a-z]/g, character => character.toUpperCase());
}

function extractParagraphTokens(label: string): string[] {
  const tokens: string[] = [];
  const paragraphPattern = /\bP(?:ARAGRAPH|ARAS?)?\.?\s*([0-9A-Z,;\-()\s]+)/gi;

  let match: RegExpExecArray | null;

  // eslint-disable-next-line no-cond-assign
  while ((match = paragraphPattern.exec(label)) !== null) {
    const raw = match[1] ?? '';
    const normalized = raw.replace(/\band\b/gi, ',');
    const withoutKeywords = normalized.replace(/\bpara(?:graphs?|s?)\b/gi, ' ');

    withoutKeywords
      .split(/[;,]/)
      .map(token => normalizeParagraphToken(token))
      .filter(Boolean)
      .forEach(token => {
        if (!tokens.includes(token)) {
          tokens.push(token);
        }
      });
  }

  return tokens;
}

function formatParagraphSegment(paragraph: string): string {
  const trimmed = paragraph.trim();

  if (!trimmed) {
    return '';
  }

  if (/^[0-9]+$/.test(trimmed)) {
    const numeric = Number.parseInt(trimmed, 10);

    if (Number.isFinite(numeric)) {
      return String(numeric);
    }
  }

  return encodeURIComponent(trimmed.replace(/\s+/g, '-').toLowerCase());
}

function formatDecisionLabel(parsed: ParsedDecisionLabel): string {
  const { type, meetingNumber, decisionNumber, paragraphs } = parsed;
  const base = type === 'COP' ? `${type} ${meetingNumber}/${decisionNumber}` : `${type}-${meetingNumber}/${decisionNumber}`;

  if (paragraphs.length === 0) {
    return base;
  }

  const paragraphSuffix = paragraphs.join(',');

  return `${base} P. ${paragraphSuffix}`;
}

const decisionUrls: Record<DecisionType, (parts: ParsedDecisionLabel) => string> = {
  COP: ({ meetingNumber, decisionNumber, paragraphs }) => {
    const meetingSegment = String(meetingNumber);
    const decisionSegment = decisionNumber.toString().padStart(2, '0');
    const baseUrl = `https://www.cbd.int/decisions/cop/${meetingSegment}/${decisionSegment}`;

    if (paragraphs.length === 0) {
      return baseUrl;
    }

    const paragraphSegment = formatParagraphSegment(paragraphs[0]!);

    if (!paragraphSegment) {
      return baseUrl;
    }

    return `${baseUrl}/${paragraphSegment}`;
  },
  CP: ({ meetingNumber, decisionNumber }) => {
    const meetingSegment = meetingNumber.toString().padStart(2, '0');
    const decisionSegment = decisionNumber.toString().padStart(2, '0');

    return `https://www.cbd.int/decisions/mop?m=cp-mop-${meetingSegment}-${decisionSegment}`;
  },
  NP: ({ meetingNumber, decisionNumber }) => {
    const meetingSegment = meetingNumber.toString().padStart(2, '0');
    const decisionSegment = decisionNumber.toString().padStart(2, '0');

    return `https://www.cbd.int/decisions/np-mop?m=np-mop-${meetingSegment}-${decisionSegment}`;
  },
};

function parseDecisionType(token: string): DecisionType | null {
  if (token === 'COP' || token === 'CP' || token === 'NP') {
    return token;
  }
  return null;
}

/**
 * Parse a decision label such as "COP 15/4" or "CP-11/7" into its components.
 * @param label - Decision label string.
 * @returns Parsed components or null when the label is not recognized.
 */
export function parseDecisionLabel(label: string | null | undefined): ParsedDecisionLabel | null {
  if (!label) {
    return null;
  }

  const trimmed = label.trim();

  if (!trimmed) {
    return null;
  }

  const normalized = trimmed.toUpperCase();
  const match = normalized.match(/^(COP|CP|NP)[^0-9]*([0-9]+)[^0-9]*([0-9]+)/);

  if (!match) {
    return null;
  }

  const type = parseDecisionType(match[1]!);

  if (!type) {
    return null;
  }

  const meetingNumber = Number.parseInt(match[2]!, 10);
  const decisionNumber = Number.parseInt(match[3]!, 10);

  if (!Number.isFinite(meetingNumber) || !Number.isFinite(decisionNumber)) {
    return null;
  }

  return {
    type,
    meetingNumber,
    decisionNumber,
    paragraphs: extractParagraphTokens(trimmed),
  } satisfies ParsedDecisionLabel;
}

/**
 * Resolve a decision label to its canonical CBD URL.
 * @param label - Decision label (e.g. "COP 15/4").
 * @returns Absolute URL or undefined.
 */
export function resolveDecisionHref(label: string | null | undefined): string | undefined {
  const parsed = parseDecisionLabel(label);

  if (!parsed) {
    return undefined;
  }

  return decisionUrls[parsed.type](parsed);
}

function normalizeUrl(value?: string | null): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }
  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : undefined;
}

function stripTrailingSlash(pathname: string): string {
  return pathname.replace(/\/+$/, '');
}

function areDecisionPathsEqual(a: URL, b: URL): boolean {
  return a.hostname === b.hostname && stripTrailingSlash(a.pathname) === stripTrailingSlash(b.pathname);
}

/**
 * Resolve a decision URL, preferring the explicit href but falling back to
 * the computed URL from the label.
 * @param rawHref - Explicit href from document.
 * @param label - Decision label for fallback URL computation.
 * @returns Best URL or undefined.
 */
export function resolveDecisionHrefWithFallback(
  rawHref: string | null | undefined,
  label: string | null | undefined,
): string | undefined {
  const normalizedRaw = normalizeUrl(rawHref ?? undefined);
  const expected = resolveDecisionHref(label);

  if (!normalizedRaw) {
    return expected;
  }

  if (!expected) {
    return normalizedRaw;
  }

  try {
    const explicitUrl = new URL(normalizedRaw);
    const expectedUrl = new URL(expected);

    if (!areDecisionPathsEqual(explicitUrl, expectedUrl)) {
      return normalizedRaw;
    }

    const explicitParam = explicitUrl.searchParams.get('m');
    const expectedParam = expectedUrl.searchParams.get('m');

    if (expectedParam && explicitParam !== expectedParam) {
      return expected;
    }

    if (expectedParam && !explicitParam) {
      return expected;
    }

    return normalizedRaw;
  } catch {
    return normalizedRaw;
  }
}

/**
 * Parse a CBD decision path (e.g. "CBD/CP/MOP/DEC/11/7") into a DecisionEntry.
 */
export function parseCbdDecisionPath(path: string): DecisionEntry | null {
  if (!path) {
    return null;
  }

  const trimmed = path.trim().toUpperCase();
  const segments = trimmed.split('/').filter(Boolean);

  if (segments[0] !== 'CBD') {
    return null;
  }

  let type: DecisionType | null = null;
  let decIndex = -1;

  if (segments[1] === 'COP' && segments[2] === 'DEC') {
    type = 'COP';
    decIndex = 3;
  } else if (segments[1] === 'CP' && segments[2] === 'MOP' && segments[3] === 'DEC') {
    type = 'CP';
    decIndex = 4;
  } else if (segments[1] === 'NP' && segments[2] === 'MOP' && segments[3] === 'DEC') {
    type = 'NP';
    decIndex = 4;
  }

  if (!type || decIndex < 0 || decIndex >= segments.length) {
    return null;
  }

  const sessionNum = Number.parseInt(segments[decIndex]!, 10);
  const decisionNum = Number.parseInt(segments[decIndex + 1] ?? '', 10);

  if (!Number.isFinite(sessionNum) || !Number.isFinite(decisionNum)) {
    return null;
  }

  const paragraphs: string[] = [];

  for (let i = decIndex + 2; i < segments.length; i++) {
    const seg = segments[i]!;

    if (/^\d+$/.test(seg)) {
      paragraphs.push(String(Number.parseInt(seg, 10)));
    }
  }

  let label: string;

  if (type === 'COP') {
    label = `COP ${sessionNum}/${decisionNum}`;
  } else if (type === 'CP') {
    label = `CP-MOP ${sessionNum}/${decisionNum}`;
  } else {
    label = `NP-MOP ${sessionNum}/${decisionNum}`;
  }

  if (paragraphs.length > 0) {
    label += ` P. ${paragraphs.join(',')}`;
  }

  let href: string;
  const sessionPadded = sessionNum.toString().padStart(2, '0');
  const decisionPadded = decisionNum.toString().padStart(2, '0');

  if (type === 'COP') {
    href = `https://www.cbd.int/decisions/cop/${String(sessionNum)}/${decisionPadded}`;

    if (paragraphs.length > 0) {
      const paragraphPadded = Number.parseInt(paragraphs[0]!, 10).toString().padStart(2, '0');

      href += `/${paragraphPadded}`;
    }
  } else if (type === 'CP') {
    href = `https://www.cbd.int/decisions/mop?m=cp-mop-${sessionPadded}`;
  } else {
    href = `https://www.cbd.int/decisions/np-mop?m=np-mop-${sessionPadded}`;
  }

  return { label, href };
}
