export const useFormatDate = (): { toFormatDate: (date: Date | string, localeOverride?: string) => string } => {
  const { locale } = useI18n()

  const toFormatDate = (date: Date | string, localeOverride?: string): string => {
    if (date === undefined || date === null || date === '') return ''

    const convertedDate = typeof date === 'string' ? new Date(date) : date
    return Intl.DateTimeFormat(localeOverride ?? locale.value, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(convertedDate)
  }
  return { toFormatDate }
}

/*
export function formatDate (date: Date | string, locale?: string): string {
  const { locale: i18nLocale } = useI18n()

  if (date === undefined || date === null || date === '') return ''
  if (locale === undefined || locale === null || locale === '') locale = i18nLocale.value ?? 'en'

  const convertedDate = typeof date === 'string' ? new Date(date) : date
  return Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(convertedDate)
}
*/
