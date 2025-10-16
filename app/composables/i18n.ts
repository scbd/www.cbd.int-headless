export async function loadTranslations(path: string) {
    const translations = import.meta.glob('../../i18n/**/*.json', { eager: false });
    const { locale, mergeLocaleMessage } = useI18n();

    const currentLocale = locale.value || 'en';

    const translationPath = `../../i18n/${currentLocale}/${path}.json`;

    try {
        const loader = translations[translationPath];

        if (!loader) {
            console.warn(`No translation loader found for ${translationPath}`);
            return false;
        };

        const module = await loader() as any
        const messages = module.default || module;

        mergeLocaleMessage(currentLocale, messages);
    } catch (error) {
        console.warn(`No translations found for ${path} in ${currentLocale}`, error);
    }
};
