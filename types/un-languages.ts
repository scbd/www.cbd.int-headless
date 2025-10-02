import { Locales as Locale } from './api/locales';

export interface Language {
  locale: Locale;
  name: string;
  direction: 'ltr' | 'rtl';
  translations?: {
    [lang: string]: string;
  };
}

export const English: Language = {
  locale: Locale.en,
  name: 'English',
  direction: 'ltr',
  translations: {
    [Locale.es]: 'Inglés',
    [Locale.fr]: 'Anglais',
    [Locale.ar]: 'إنجليزي',
    [Locale.ru]: 'Английский',
    [Locale.zh]: '英语',
  },
};
export const Spanish: Language = {
  locale: Locale.es,
  name: 'Español',
  direction: 'ltr',
  translations: {
    [Locale.en]: 'Spanish',
    [Locale.fr]: 'Espagnol',
    [Locale.ar]: 'الأسبانية',
    [Locale.ru]: 'испанский',
    [Locale.zh]: '西班牙语',
  },
};
export const French: Language = {
  locale: Locale.fr,
  name: 'Français',
  direction: 'ltr',
  translations: {
    [Locale.en]: 'French',
    [Locale.es]: 'Francés',
    [Locale.ar]: 'فرنسي',
    [Locale.ru]: 'Французский',
    [Locale.zh]: '法语',
  },
};
export const Arabic: Language = {
  locale: Locale.ar,
  name: 'العربية',
  direction: 'rtl',
  translations: {
    [Locale.en]: 'Arabic',
    [Locale.es]: 'Árabe',
    [Locale.fr]: 'Arabe',
    [Locale.ru]: 'арабский',
    [Locale.zh]: '阿拉伯',
  },
};
export const Russian: Language = {
  locale: Locale.ru,
  name: 'Русский',
  direction: 'ltr',
  translations: {
    [Locale.en]: 'Russian',
    [Locale.es]: 'Rusa',
    [Locale.fr]: 'Russe',
    [Locale.ar]: 'الروسية',
    [Locale.zh]: '俄语',
  },
};
export const Chinese: Language = {
  locale: Locale.zh,
  name: '中文',
  direction: 'ltr',
  translations: {
    [Locale.en]: 'Chinese',
    [Locale.es]: 'Chino',
    [Locale.fr]: 'Chinois',
    [Locale.ar]: 'الصينية',
    [Locale.ru]: 'китайский',
  },
};

export const Languages: Language[] = [
  English,
  Spanish,
  French,
  Arabic,
  Russian,
  Chinese,
];

export const Locales: Array<string> = Languages.map(({ locale }) => locale);
