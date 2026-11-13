import type { LString } from '@scbd/vue-components'
import type { Meeting } from '~~/types/meeting'
import { DEFAULT_IMAGE } from '~~/constants/image-paths'
import { cop17, invasiveSpeciesOnline, kathmanduWorkshop } from './meetings'

// /api/meetings rows (2026-11-13) with their real `themes`, which meetings.ts leaves empty,
// so the meeting search list renders its "Subjects:" line and its exact-"Online" location branch.

const traditionalKnowledge: LString = {
  en: 'Traditional Knowledge, Innovations and Practices',
  fr: 'Article 8(j): Connaissances, innovations et pratiques traditionnelles',
  es: 'Conocimientos, innovaciones y prácticas tradicionales',
  ru: 'Традиционные знания, нововведения и практика',
  zh: '传统知识、创新和实践',
  ar: 'المعارف والابتكارات والممارسات التقليدية'
}

export const kathmanduWorkshopWithThemes: Meeting = {
  ...kathmanduWorkshop,
  themes: [
    {
      en: 'Subsidiary Body on Article 8j (SB8j)',
      fr: 'Subsidiary Body on Article 8j (SB8j)',
      es: 'Subsidiary Body on Article 8j (SB8j)',
      ru: 'Subsidiary Body on Article 8j (SB8j)',
      zh: 'Subsidiary Body on Article 8j (SB8j)',
      ar: 'Subsidiary Body on Article 8j (SB8j)'
    },
    traditionalKnowledge
  ]
}

export const invasiveSpeciesOnlineWithThemes: Meeting = {
  ...invasiveSpeciesOnline,
  themes: [
    {
      en: 'Invasive Alien Species',
      fr: 'Espèces exotiques envahissantes',
      es: 'Especies exóticas invasoras',
      ru: 'Инвазивные чужеродные виды',
      zh: '入侵性外来物种',
      ar: 'الأنواع الغريبة الغازية'
    }
  ]
}

// City is exactly "Online", the only value meeting/search-list.vue treats as online
export const ecosystemApproachConsultation: Meeting = {
  id: '52000000cbd00500000019ee',
  code: 'CC-OM-2025-02',
  title: { en: 'Online consultations on the development of a supplement to the Voluntary Guidelines for Design and Effective Implementation of Ecosystem-based Approaches to Climate Change Adaptation and Disaster Risk Reduction' },
  urls: ['https://www.cbd.int/meetings/CC-OM-2025-02'],
  themes: [
    {
      en: 'Climate Change and Biodiversity',
      fr: 'Changements climatiques et biodiversité',
      es: 'El cambio climático y la diversidad biológica',
      ru: 'Изменение климата и биоразнообразие',
      zh: '气候变化和生物多样性',
      ar: 'تغير المناخ والتنوع البيولوجي'
    },
    {
      en: 'Ecosystem Approach',
      fr: 'Approche écosystémique',
      es: 'Enfoque por ecosistemas',
      ru: 'Экосистемный подход',
      zh: 'Ecosystem Approach',
      ar: 'نهج التعامل مع النظام الإيكولوجي'
    }
  ],
  startOn: new Date('2025-03-19T00:00:00.000Z'),
  endOn: new Date('2025-03-19T00:00:00.000Z'),
  createdOn: new Date('2025-08-28T10:13:21.387Z'),
  updatedOn: new Date('2025-08-28T10:23:58.000Z'),
  city: { en: 'Online', fr: 'Online', es: 'Online', ru: 'Online', zh: 'Online', ar: 'Online' },
  country: {},
  image: DEFAULT_IMAGE
}

export const nairobiWorkshop: Meeting = {
  id: '52000000cbd0050000001979',
  code: 'A8J-WS-2025-01',
  title: { en: 'Subregional capacity-building workshop to support the implementation of aspects of the programme of work on Article 8(j) and other provisions of the Convention on Biological Diversity related to indigenous peoples and local communities to 2030 in relation to Target 3 of the Kunming-Montreal Global Biodiversity Framework' },
  urls: ['https://www.cbd.int/meetings/A8J-WS-2025-01'],
  themes: [
    {
      en: 'Kunming-Montreal Global Biodiversity Framework',
      fr: 'Cadre mondial de la biodiversité de Kunming-Montréal',
      es: 'Kunming-Montreal Global Biodiversity Framework',
      ru: 'Kunming-Montreal Global Biodiversity Framework',
      zh: '《昆明-蒙特利尔全球生物多样性框架》',
      ar: 'Kunming-Montreal Global Biodiversity Framework'
    },
    traditionalKnowledge
  ],
  startOn: new Date('2025-02-16T00:00:00.000Z'),
  endOn: new Date('2025-02-16T00:00:00.000Z'),
  createdOn: new Date('2025-01-07T12:14:35.003Z'),
  updatedOn: new Date('2025-01-24T12:23:50.000Z'),
  city: { en: 'Nairobi', fr: 'Nairobi', es: 'Nairobi', ru: 'Nairobi', zh: 'Nairobi', ar: 'Nairobi' },
  country: { en: 'Kenya', fr: 'Kenya', es: 'Kenya', ru: 'Кения', zh: '肯尼亚', ar: 'كينيا' },
  image: DEFAULT_IMAGE
}

// Two upcoming (relative to 2026-11-13) and three previous meetings, spanning several months
export const meetingSearchResults: Meeting[] = [
  kathmanduWorkshopWithThemes,
  invasiveSpeciesOnlineWithThemes,
  cop17,
  ecosystemApproachConsultation,
  nairobiWorkshop
]
