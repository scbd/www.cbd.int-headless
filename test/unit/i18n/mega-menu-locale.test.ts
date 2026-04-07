import { describe, it, expect } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const LOCALES = ['en', 'ar', 'es', 'fr', 'ru', 'zh']
const I18N_PATH = 'i18n/{locale}/app/components/navigation/mega-menu/navigation-mega-menu-dynamic-content.json'

describe('mega-menu dynamic-content i18n', () => {
  for (const locale of LOCALES) {
    const filePath = resolve(__dirname, '../../..', I18N_PATH.replace('{locale}', locale))

    it(`${locale} locale file exists with actionRequired key`, () => {
      expect(existsSync(filePath)).toBe(true)
      const content = JSON.parse(readFileSync(filePath, 'utf-8'))
      expect(content).toHaveProperty('actionRequired')
      expect(content.actionRequired.length).toBeGreaterThan(0)
    })
  }
})
