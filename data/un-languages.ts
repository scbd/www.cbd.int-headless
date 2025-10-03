import { Locales as localeCodes } from '../types/api/locales';
import type lstring from 'api-client/types/lstring';

export interface language {
  locale: localeCodes;
  name: lstring;
}

export const english: language = {
  locale: localeCodes.en,
  name: {
    en: 'English',
    es: 'Inglés',
    fr: 'Anglais',
    ar: 'إنجليزي',
    ru: 'Английский',
    zh: '英语',
  },
};
export const spanish: language = {
  locale: localeCodes.es,
  name: {
    en: 'Spanish',
    es: 'Español',
    fr: 'Espagnol',
    ar: 'الأسبانية',
    ru: 'испанский',
    zh: '西班牙语',
  },
};
export const french: language = {
  locale: localeCodes.fr,
  name: {
    en: 'French',
    es: 'Francés',
    fr: 'Français',
    ar: 'فرنسي',
    ru: 'Французский',
    zh: '法语',
  },
};
export const arabic: language = {
  locale: localeCodes.ar,
  name: {
    en: 'Arabic',
    es: 'Árabe',
    fr: 'Arabe',
    ar: 'العربية',
    ru: 'арабский',
    zh: '阿拉伯',
  },
};
export const russian: language = {
  locale: localeCodes.ru,
  name: {
    en: 'Russian',
    es: 'Rusa',
    fr: 'Russe',
    ar: 'الروسية',
    ru: 'Русский',
    zh: '俄语',
  },
};
export const chinese: language = {
  locale: localeCodes.zh,
  name: {
    en: 'Chinese',
    es: 'Chino',
    fr: 'Chinois',
    ar: 'الصينية',
    ru: 'китайский',
    zh: '中文',
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
