export const useFormatDate = (): ((date: Date | string, locale?: string) => string) => {
  const { locale: i18nLocale } = useI18n()

  const formatDate = (date: Date | string, locale?: string): string => {
    if (date === undefined || date === null || date === '') return ''
    if (locale === undefined || locale === null || locale === '') locale = i18nLocale.value ?? 'en'

    const convertedDate = typeof date === 'string' ? new Date(date) : date
    return Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(convertedDate)
  }

  return formatDate
}
