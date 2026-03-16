import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const LOCALES = ['en', 'ar', 'es', 'fr', 'ru', 'zh']
const I18N_PATH = 'i18n/{locale}/app/pages/calendar-of-activities-and-actions/index.json'
const REQUIRED_KEYS = ['title', 'description', 'iframeTitle', 'unavailable']

describe('calendar-of-activities-and-actions i18n', () => {
  for (const locale of LOCALES) {
    const filePath = resolve(__dirname, '../../..', I18N_PATH.replace('{locale}', locale))

    it(`${locale} locale file exists`, () => {
      expect(existsSync(filePath)).toBe(true)
    })

    it(`${locale} locale file contains required keys`, () => {
      const content = JSON.parse(readFileSync(filePath, 'utf-8'))
      for (const key of REQUIRED_KEYS) {
        expect(content).toHaveProperty(key)
        expect(typeof content[key]).toBe('string')
        expect(content[key].length).toBeGreaterThan(0)
      }
    })
  }

  it('English source has valid JSON with exactly the required keys', () => {
    const filePath = resolve(__dirname, '../../..', I18N_PATH.replace('{locale}', 'en'))
    const content = JSON.parse(readFileSync(filePath, 'utf-8'))
    expect(Object.keys(content).sort()).toEqual(REQUIRED_KEYS.sort())
  })

  it('non-English locales must have translations that differ from English', () => {
    const enPath = resolve(__dirname, '../../..', I18N_PATH.replace('{locale}', 'en'))
    const enContent: Record<string, string> = JSON.parse(readFileSync(enPath, 'utf-8'))
    const nonEnglishLocales = LOCALES.filter(l => l !== 'en')

    for (const locale of nonEnglishLocales) {
      const filePath = resolve(__dirname, '../../..', I18N_PATH.replace('{locale}', locale))
      const content: Record<string, string> = JSON.parse(readFileSync(filePath, 'utf-8'))

      const allMatch = REQUIRED_KEYS.every(key => content[key] === enContent[key])
      expect(
        allMatch,
        `${locale} locale appears to be untranslated — all values match English`
      ).toBe(false)
    }
  })
})
