import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const nuxtConfig = readFileSync(resolve(__dirname, '../../../nuxt.config.ts'), 'utf-8')
const drupalService = readFileSync(resolve(__dirname, '../../../services/drupal.ts'), 'utf-8')

describe('nuxt.config.ts runtime config', () => {
  it('declares injectCalendarMenuItem in runtimeConfig', () => {
    expect(nuxtConfig).toContain('injectCalendarMenuItem')
  })

  it('declares iframeCalendarUrl in public config', () => {
    expect(nuxtConfig).toContain('iframeCalendarUrl')
  })
})

describe('drupal.ts runtime config toggle', () => {
  it('guards injection with shouldInjectCalendarItem and config flag', () => {
    expect(drupalService).toContain('shouldInjectCalendarItem(code, options.branch)')
    expect(drupalService).toContain('useRuntimeConfig().injectCalendarMenuItem !== false')
  })
})
