import { Locales as Locale } from './api/locales';

export interface Language {
  locale: Locale;
  name: {
    [lang: string]: string;
  };
}

export const English: Language = {
  locale: Locale.en,
  name: {
    [Locale.en]: 'English',
    [Locale.es]: 'Inglés',
    [Locale.fr]: 'Anglais',
    [Locale.ar]: 'إنجليزي',
    [Locale.ru]: 'Английский',
    [Locale.zh]: '英语',
  },
};
export const Spanish: Language = {
  locale: Locale.es,
  name: {
    [Locale.en]: 'Spanish',
    [Locale.es]: 'Español',
    [Locale.fr]: 'Espagnol',
    [Locale.ar]: 'الأسبانية',
    [Locale.ru]: 'испанский',
    [Locale.zh]: '西班牙语',
  },
};
export const French: Language = {
  locale: Locale.fr,
  name: {
    [Locale.en]: 'French',
    [Locale.es]: 'Francés',
    [Locale.fr]: 'Français',
    [Locale.ar]: 'فرنسي',
    [Locale.ru]: 'Французский',
    [Locale.zh]: '法语',
  },
};
export const Arabic: Language = {
  locale: Locale.ar,
  name: {
    [Locale.en]: 'Arabic',
    [Locale.es]: 'Árabe',
    [Locale.fr]: 'Arabe',
    [Locale.ar]: 'العربية',
    [Locale.ru]: 'арабский',
    [Locale.zh]: '阿拉伯',
  },
};
export const Russian: Language = {
  locale: Locale.ru,
  name: {
    [Locale.en]: 'Russian',
    [Locale.es]: 'Rusa',
    [Locale.fr]: 'Russe',
    [Locale.ar]: 'الروسية',
    [Locale.ru]: 'Русский',
    [Locale.zh]: '俄语',
  },
};
export const Chinese: Language = {
  locale: Locale.zh,
  name: {
    [Locale.en]: 'Chinese',
    [Locale.es]: 'Chino',
    [Locale.fr]: 'Chinois',
    [Locale.ar]: 'الصينية',
    [Locale.ru]: 'китайский',
    [Locale.zh]: '中文',
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
