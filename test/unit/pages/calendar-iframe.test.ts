import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const template = readFileSync(resolve(__dirname, '../../../app/pages/calendar-of-activities-and-actions/index.vue'), 'utf-8')

describe('calendar iframe page template', () => {
  it('shows fallback message when iframeUrl is falsy', () => {
    expect(template).toContain('v-else')
    expect(template).toContain("t('unavailable')")
  })

  it('has sandbox attribute restricting iframe permissions', () => {
    expect(template).toContain('sandbox="allow-scripts allow-same-origin allow-forms allow-popups"')
  })

  it('has referrerpolicy="no-referrer"', () => {
    expect(template).toContain('referrerpolicy="no-referrer"')
  })
})
