import { Locales } from '../types/api/locales'
import { LTypeString, LTypeArray } from '../types/api/ltypes'
import type { LString } from '@scbd/vue-components'
import _ from 'lodash'

export function localizeFields (fields: string, locale?: string): string | undefined {
  if (fields === null || fields === '') { return }

  if (locale !== null && locale !== '' && locale !== 'en') {
    return fields.replace(/_EN/ig, '_' + (locale ?? 'en').toUpperCase())
  };

  return fields
};

export function solrEscape (value: string | number | Date): string {
  if (value === undefined) throw new Error('Value is undefined')
  if (value === null) throw new Error('Value is null')
  if (value === '') throw new Error('Value is null')

  if (_.isNumber(value)) value = value.toString()
  if (_.isDate(value)) value = value.toISOString()

  value = value.toString()

  value = value.replace(/\\/g, '\\\\')
  value = value.replace(/\+/g, '\\+')
  value = value.replace(/-/g, '\\-')
  value = value.replace(/&&/g, '\\&&')
  value = value.replace(/\|\|/g, '\\||')
  value = value.replace(/!/g, '\\!')
  value = value.replace(/\(/g, '\\(')
  value = value.replace(/\)/g, '\\)')
  value = value.replace(/\{/g, '\\{')
  value = value.replace(/\}/g, '\\}')
  value = value.replace(/\[/g, '\\[')
  value = value.replace(/\]/g, '\\]')
  value = value.replace(/\^/g, '\\^')
  value = value.replace(/"/g, '\\"')
  value = value.replace(/~/g, '\\~')
  value = value.replace(/\*/g, '\\*')
  value = value.replace(/\?/g, '\\?')
  value = value.replace(/:/g, '\\:')

  return value
};

export function toLString (item: any, field: string, type: LTypeString = LTypeString.t, locales: Locales[] = Object.values(Locales)): LString {
  return locales.reduce<LString>((ltext: LString, locale) => {
    const localeField = `${field}_${locale.toUpperCase()}_${type}`
    const value = item[localeField]

    if (value === undefined || value === null) return ltext

    ltext[locale as keyof LString] = item[localeField]
    return ltext
  }, {})
};

export function toLStringArray (item: any, field: string, type: LTypeArray = LTypeArray.txt, locales: Locales[] = Object.values(Locales)): LString[] {
  let maxEntries = 0

  for (const locale of locales) {
    const value = item[`${field}_${locale.toUpperCase()}_${type}`]

    maxEntries = Math.max(maxEntries, value?.length ?? 0)
  };

  if (maxEntries === 0) {
    return []
  };

  const result: LString[] = []

  for (let i = 0; i < maxEntries; i++) {
    const lstring = locales.reduce<LString>((ltext: LString, locale) => {
      ltext[locale as keyof LString] = item[`${field}_${locale.toUpperCase()}_${type}`][i]
      return ltext
    }, {})

    result.push(lstring)
  };

  return result
};

export function andOr (query: string | string[], sep: string): string {
  if (_.isArray(query)) {
    query = _.map(query, function (criteria) {
      if (_.isArray(criteria)) {
        return andOr(criteria, sep === 'AND' ? 'OR' : 'AND')
      }

      return criteria
    })

    query = '(' + query.join(' ' + sep + ' ') + ')'
  };

  return query
};

export function normalizeCode (code: string): string {
  return code.toUpperCase()
}
