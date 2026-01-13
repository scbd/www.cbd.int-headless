import type { LString } from 'api-client'

export const formatLocation = (
  city?: LString,
  country?: LString
): string => {
  const { locale } = useI18n()
  const seperator = locale.value === 'zh' ? '' : locale.value === 'ar' ? ' ،' : ', '
  if (typeof city?.[locale.value] === 'string' && typeof country?.[locale.value] === 'string') return `${city[locale.value] as string}${seperator}${country[locale.value] as string}`
  if (typeof city?.[locale.value] === 'string') return city[locale.value] as string
  if (typeof country?.[locale.value] === 'string') return country[locale.value] as string
  return ''
}
