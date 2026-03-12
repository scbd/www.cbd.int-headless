import { describe, it, expect } from 'vitest';
import {
  normalizeWhitespace,
  htmlToText,
  decodeEntities,
  humanizeIdentifier,
} from '~/utils/calendar/text';

// ---------------------------------------------------------------------------
// normalizeWhitespace
// ---------------------------------------------------------------------------

describe('normalizeWhitespace', () => {
  it('collapses multiple spaces into one', () => {
    expect(normalizeWhitespace('hello   world')).toBe('hello world');
  });

  it('trims leading and trailing whitespace', () => {
    expect(normalizeWhitespace('  hello  ')).toBe('hello');
  });

  it('replaces newlines with spaces', () => {
    expect(normalizeWhitespace('hello\nworld')).toBe('hello world');
  });

  it('replaces carriage returns', () => {
    expect(normalizeWhitespace('hello\r\nworld')).toBe('hello world');
  });

  it('handles tabs and mixed whitespace', () => {
    expect(normalizeWhitespace('hello\t\t  \n world')).toBe('hello world');
  });

  it('returns empty string for whitespace-only input', () => {
    expect(normalizeWhitespace('   \n\t  ')).toBe('');
  });

  it('returns empty string for empty input', () => {
    expect(normalizeWhitespace('')).toBe('');
  });
});

// ---------------------------------------------------------------------------
// htmlToText
// ---------------------------------------------------------------------------

describe('htmlToText', () => {
  it('strips HTML tags', () => {
    expect(htmlToText('<p>Hello <b>world</b></p>')).toBe('Hello world');
  });

  it('replaces <br> with space', () => {
    expect(htmlToText('line one<br>line two')).toBe('line one line two');
  });

  it('replaces <br/> and <br /> self-closing tags', () => {
    expect(htmlToText('a<br/>b<br />c')).toBe('a b c');
  });

  it('replaces </p> with space', () => {
    expect(htmlToText('<p>para one</p><p>para two</p>')).toBe('para one para two');
  });

  it('replaces </li> with semicolon', () => {
    expect(htmlToText('<ul><li>item one</li><li>item two</li></ul>')).toBe('item one; item two;');
  });

  it('decodes HTML entities in the result', () => {
    expect(htmlToText('<p>Fish &amp; chips</p>')).toBe('Fish & chips');
  });

  it('handles empty string', () => {
    expect(htmlToText('')).toBe('');
  });

  it('handles plain text without tags', () => {
    expect(htmlToText('just text')).toBe('just text');
  });
});

// ---------------------------------------------------------------------------
// decodeEntities
// ---------------------------------------------------------------------------

describe('decodeEntities', () => {
  it('decodes &nbsp;', () => {
    expect(decodeEntities('hello&nbsp;world')).toBe('hello world');
  });

  it('decodes &amp;', () => {
    expect(decodeEntities('fish &amp; chips')).toBe('fish & chips');
  });

  it('decodes &quot;', () => {
    expect(decodeEntities('&quot;quoted&quot;')).toBe('"quoted"');
  });

  it('decodes &#39;', () => {
    expect(decodeEntities('it&#39;s')).toBe("it's");
  });

  it('decodes smart quotes', () => {
    expect(decodeEntities('&ldquo;hello&rdquo;')).toBe('\u201Chello\u201D');
    expect(decodeEntities('&lsquo;hello&rsquo;')).toBe('\u2018hello\u2019');
  });

  it('decodes dashes', () => {
    expect(decodeEntities('2020&ndash;2025')).toBe('2020\u20132025');
    expect(decodeEntities('item&mdash;note')).toBe('item\u2014note');
  });

  it('is case-insensitive', () => {
    expect(decodeEntities('&NBSP;&AMP;')).toBe(' &');
  });

  it('returns plain text unchanged', () => {
    expect(decodeEntities('no entities here')).toBe('no entities here');
  });
});

// ---------------------------------------------------------------------------
// humanizeIdentifier
// ---------------------------------------------------------------------------

describe('humanizeIdentifier', () => {
  it('splits on underscores and capitalizes', () => {
    expect(humanizeIdentifier('HELLO_WORLD')).toBe('Hello World');
  });

  it('splits on hyphens and capitalizes', () => {
    expect(humanizeIdentifier('CBD-SUBJECT-MARINE')).toBe('Cbd Subject Marine');
  });

  it('preserves mixed-case identifiers as-is', () => {
    expect(humanizeIdentifier('camelCase')).toBe('camelCase');
    expect(humanizeIdentifier('MyComponent')).toBe('MyComponent');
  });

  it('returns empty string for empty input', () => {
    expect(humanizeIdentifier('')).toBe('');
  });

  it('returns empty string for whitespace-only input', () => {
    expect(humanizeIdentifier('   ')).toBe('');
  });

  it('handles single word all caps', () => {
    expect(humanizeIdentifier('BIODIVERSITY')).toBe('Biodiversity');
  });

  it('handles single word all lowercase', () => {
    expect(humanizeIdentifier('biodiversity')).toBe('Biodiversity');
  });
});
