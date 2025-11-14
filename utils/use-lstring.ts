import type LString from 'api-client/types/lstring'

export default function useLstring (ltext: LString | LString[], preferredLocale?: 'ar' | 'en' | 'es' | 'fr' | 'ru' | 'zh'): string {
  const { locale } = useI18n()

  if (ltext === undefined || ltext === null) return ''

  if (Array.isArray(ltext)) {
    const lArray = ltext.find((l) => l[preferredLocale ?? locale.value] ?? l !== undefined)
    return lArray?.[preferredLocale ?? locale.value] as string ?? ''
  }

  return ltext[preferredLocale ?? locale.value] as string ?? ''
}
