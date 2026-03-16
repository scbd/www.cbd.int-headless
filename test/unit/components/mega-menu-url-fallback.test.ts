import { describe, it, expect } from 'vitest'

// Replicate getUrlProperty from navigation-mega-menu-dynamic-content.vue:78
function getUrlProperty (row: any): string {
  if ('urls' in row && row.urls?.length > 0) return row.urls[0] ?? '#'
  if ('url' in row && row.url != null) return row.url
  if ('alias' in row) return row.alias ?? '#'
  return '#'
}

describe('mega-menu getUrlProperty fallback chain', () => {
  it('returns urls[0] when present', () => expect(getUrlProperty({ urls: ['/a'] })).toBe('/a'))
  it('returns url when urls absent', () => expect(getUrlProperty({ url: '/b' })).toBe('/b'))
  it('returns alias when url absent', () => expect(getUrlProperty({ alias: '/c' })).toBe('/c'))
  it('returns # when nothing matches', () => expect(getUrlProperty({ id: '1' })).toBe('#'))
  it('returns # for empty urls array', () => expect(getUrlProperty({ urls: [] })).toBe('#'))
})
