import type LString from 'api-client/types/lstring'
import type { Locale } from '../types/lstring'
import lstring from '@scbd/vue-components/lstring'

export const useLString = (): ((ltext: LString | string, localeOverride?: Locale) => string) => {
  const { locale } = useI18n()

  return (ltext: LString | string, localeOverride?: Locale): string => {
    if (typeof ltext === 'string') {
      return ltext
    }
    return lstring(ltext, localeOverride ?? locale.value)
  }
}
