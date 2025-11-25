export function formatDate (date?: Date | string, locale?: string): string {
  if (date === null || date === '') return ''
  if (locale === null || locale === '') locale = 'en'

  const convertedDate = typeof date === 'string' ? new Date(date) : date
  return Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(convertedDate)
};
