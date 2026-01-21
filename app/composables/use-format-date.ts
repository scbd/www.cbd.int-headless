export const useFormatDate = (): { toFormatDate: (date: Date | string, localeOverride?: string) => string } => {
  const { locale } = useI18n()

  const toFormatDate = (date: Date | string, localeOverride?: string): string => {
    if (date === undefined || date === null || date === '') return ''
    const useLocale = (localeOverride !== undefined && localeOverride !== null && localeOverride !== '') ? localeOverride : locale.value

    const convertedDate = typeof date === 'string' ? new Date(date) : date
    return Intl.DateTimeFormat(useLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(convertedDate)
  }
  return { toFormatDate }
}
