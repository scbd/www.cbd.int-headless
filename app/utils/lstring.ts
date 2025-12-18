import type LString from 'api-client/types/lstring'
import type { Locale } from '../../types/lstring'
import lstring from '@scbd/vue-components/lstring'

export const useLString = (defaultLocale?: Locale): ((ltext: LString | string, lLocaleOverride?: Locale) => string) => {
  return (ltext: LString | string, lLocaleOverride?: Locale): string => {
    return lstring(ltext, lLocaleOverride ?? defaultLocale)
  }
}
