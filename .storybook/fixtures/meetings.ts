import type { Meeting } from '~~/types/meeting'
import { DEFAULT_IMAGE } from '~~/constants/image-paths'

// Real /api/meetings rows (2026-11-13), trimmed to what the components read.
// Images use the fallback: /content/images/** is proxied to Drupal by the Nuxt server, which Storybook doesn't run.

export const kathmanduWorkshop: Meeting = {
  id: '52000000cbd0050000001a56',
  code: 'A8J-WS-2026-02',
  title: { en: 'Regional capacity-building workshop on the programme of work on Article 8(j) and other provisions of the Convention on Biological Diversity related to indigenous peoples and local communities to 2030' },
  urls: ['https://www.cbd.int/meetings/A8J-WS-2026-02'],
  themes: [],
  startOn: new Date('2026-11-18T00:00:00.000Z'),
  endOn: new Date('2026-11-20T00:00:00.000Z'),
  createdOn: new Date('2026-04-13T15:35:23.863Z'),
  updatedOn: new Date('2026-11-12T08:47:08.000Z'),
  city: { en: 'Kathmandu' },
  country: { en: 'Nepal', fr: 'Népal', es: 'Nepal', ru: 'Непал', zh: '尼泊尔', ar: 'نيبال' },
  image: DEFAULT_IMAGE
}

export const invasiveSpeciesOnline: Meeting = {
  id: '52000000cbd0050000001a6c',
  code: '006764',
  title: { en: 'Fifteenth meeting of the Inter-Agency Liaison Group on Invasive Alien Species' },
  urls: ['https://www.cbd.int/meetings/006764'],
  themes: [],
  startOn: new Date('2026-11-25T00:00:00.000Z'),
  endOn: new Date('2026-11-25T00:00:00.000Z'),
  createdOn: new Date('2026-09-22T15:10:37.410Z'),
  updatedOn: new Date('2026-09-22T15:15:07.000Z'),
  city: { en: 'Online 8:30-11 a.m. EST' },
  country: {},
  image: DEFAULT_IMAGE
}

// The API sends an empty country and puts it in the city instead
export const absWorkshop: Meeting = {
  id: '52000000cbd0050000001a69',
  code: '006761',
  title: { en: 'Workshop on the Access and Benefit-Sharing Clearing-House' },
  urls: ['https://www.cbd.int/meetings/006761'],
  themes: [],
  startOn: new Date('2026-10-25T00:00:00.000Z'),
  endOn: new Date('2026-10-25T00:00:00.000Z'),
  createdOn: new Date('2026-09-03T13:37:40.170Z'),
  updatedOn: new Date('2026-10-21T04:00:47.000Z'),
  city: { en: 'Yerevan, Armenia' },
  country: {},
  image: DEFAULT_IMAGE
}

export const cop17: Meeting = {
  id: '52000000cbd00500000019e2',
  code: 'COP-17',
  title: { en: 'Seventeenth meeting of the Conference of the Parties to the Convention on Biological Diversity' },
  urls: ['https://www.cbd.int/meetings/COP-17'],
  themes: [],
  startOn: new Date('2026-10-19T04:00:00.000Z'),
  endOn: new Date('2026-10-30T19:59:00.000Z'),
  createdOn: new Date('2025-07-21T15:29:40.757Z'),
  updatedOn: new Date('2026-08-24T08:57:50.000Z'),
  city: { en: 'Yerevan' },
  country: { en: 'Armenia', fr: 'Arménie', es: 'Armenia', ru: 'Армения', zh: '亚美尼亚', ar: 'أرمينيا' },
  image: DEFAULT_IMAGE
}

export const meetings: Meeting[] = [kathmanduWorkshop, invasiveSpeciesOnline, absWorkshop, cop17]
