export function useTranslations (path: string): { t: (key: string) => string } {
  const translations = import.meta.glob('../../i18n/**/*.json', { eager: false })
  const { locale } = useI18n()
  const localMessages = ref<Record<string, string>>({})

  async function loadMessages (): Promise<void> {
    const currentLocale: string = locale.value ?? 'en'
    const componentPath = `../../i18n/${currentLocale}/${path}.json`
    const fallbackPath = `../../i18n/en/${path}.json`
    const translationPath = componentPath in translations ? componentPath : fallbackPath

    try {
      const loader = translations[translationPath]
      if (loader === null || loader === undefined) {
        console.warn(`No translation loader found for ${translationPath}`)
        return
      }
      const module = await loader() as any
      localMessages.value = module.default !== undefined ? module.default : module
    } catch (error) {
      console.warn(`No translations found for ${translationPath}`, error)
    }
  }

  watch(locale, loadMessages)
  void loadMessages()

  const t = (key: string): string => {
    return localMessages.value[key] ?? key
  }

  return { t }
}
