import { lstring } from '@scbd/vue-components'
import type { LString, Locale } from '@scbd/vue-components'

export const useLString = (): { toLocaleText: (ltext: LString | string, localeOverride?: Locale) => string } => {
  const { locale } = useI18n()

  const toLocaleText = (ltext: LString | string, localeOverride?: Locale): string => {
    if (typeof ltext === 'string') {
      return ltext
    }
    return lstring(ltext, localeOverride ?? locale.value, locale.value)
  }

  return { toLocaleText }
}
