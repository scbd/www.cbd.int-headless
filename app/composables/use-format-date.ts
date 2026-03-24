export const useFormatDate = (): {
  toFormatDate: (date: Date | string, localeOverride?: string) => string
  toFormatStartDay: (date: string | undefined) => string | undefined
  toFormatEndDay: (date: string | undefined) => string | undefined
} => {
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
  
  const toFormatStartDay = (date: string | undefined): string | undefined => {
    if (!date) return undefined
    if (date.includes('T')) return date
    return `${date}T00:00:00Z`
  }

  const toFormatEndDay = (date: string | undefined): string | undefined => {
    if (!date) return undefined
    if (date.includes('T')) return date
    return `${date}T23:59:59Z`
  }

  return { toFormatDate, toFormatStartDay, toFormatEndDay }
}
