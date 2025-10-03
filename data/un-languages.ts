import { Locales as Locale } from '../types/api/locales';

export interface language {
  locale: Locale;
  name: {
    [lang: string]: string;
  };
}

export const english: language = {
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
export const spanish: language = {
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
export const french: language = {
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
export const arabic: language = {
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
export const russian: language = {
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
export const chinese: language = {
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

export const languages: language[] = [
  english,
  spanish,
  french,
  arabic,
  russian,
  chinese,
];

export const Locales: Array<string> = languages.map(({ locale }) => locale);
