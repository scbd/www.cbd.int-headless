export const useFormatDate = (): {
  toFormatDate: (date: Date | string, localeOverride?: string) => string
  toFormatStartDay: (date: string | undefined) => string | undefined
  toFormatEndDay: (date: string | undefined) => string | undefined
} => {
  const { locale } = useI18n()

  const toFormatDate = (date: Date | string, localeOverride?: string): string => {
    if (date === undefined || date === null || date === '') return ''

    const useLocale =
      (localeOverride !== undefined && localeOverride !== null && localeOverride !== '')
        ? localeOverride
        : locale.value

    let convertedDate: Date

    if (typeof date === 'string') {
      // Treat YYYY-MM-DD as a local calendar date, not UTC.
      const dateOnlyMatch = date.match(/^(\d{4})-(\d{2})-(\d{2})$/)

      if (dateOnlyMatch) {
        const [, year, month, day] = dateOnlyMatch
        convertedDate = new Date(Number(year), Number(month) - 1, Number(day))
      } else {
        convertedDate = new Date(date)
      }
    } else {
      convertedDate = date
    }

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