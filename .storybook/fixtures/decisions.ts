import type { Decision } from '~~/types/decision'

// Generated from /api/decisions?limit=4 (2026-11-13).

export const decision1: Decision = {
  id: '52000000cbd007000000357d',
  code: 'NP-3/1 A AND B',
  title: {
    en: 'Assessment and review of the effectiveness of the Protocol (Article 31)',
    fr: 'Évaluation et examen de l’efficacité du Protocole (article 31)',
    es: 'Evaluación y revisión de la eficacia del Protocolo (artículo 31)',
    ru: 'ценка и обзор эффективности Протокола (статья 31)',
    zh: '评估和审查《议定书》的成效（第31条）',
    ar: 'تقييم واستعراض فعالية البروتوكول (المادة 31)'
  },
  urls: [
    'https://www.cbd.int/decisions/?id=13693'
  ],
  eventTitle: 'Third meeting of the Conference of the Parties serving as the meeting of the Parties to the Nagoya Protocol on Access and Benefit-sharing',
  session: 3,
  decision: 1,
  createdOn: new Date('2019-01-18T11:49:15.000Z'),
  updatedOn: new Date('2026-04-17T13:51:51.000Z')
}

export const decision2: Decision = {
  id: '52000000cbd0070000003459',
  code: 'NP-1/1',
  title: {
    en: 'Rules of procedure for meetings of the Conference of the Parties serving as the meeting of the Parties to the Nagoya Protocol',
    fr: 'Règlement intérieur des réunions de la Conférence des Parties siégeant en tant que Réunion des Parties au Protocole de Nagoya',
    es: 'Reglamento para las reuniones de la Conferencia de las Partes que actúa como reunión de las Partes en el Protocolo de Nagoya',
    ru: 'Правила процедуры совещаний Конференции Сторон, выступающей в качестве Совещания Сторон Нагойского протокола',
    zh: '作为名古屋议定书缔约方会议的缔约方大会会议的议事规则',
    ar: 'النظام الداخلي لاجتماعات مؤتمر الأطراف العامل كاجتماع للأطراف في بروتوكول ناغويا'
  },
  urls: [
    'https://www.cbd.int/decisions/?id=13401'
  ],
  eventTitle: 'First meeting of the Conference of the Parties serving as the meeting of the Parties to the Nagoya Protocol on Access and Benefit-sharing',
  session: 1,
  decision: 1,
  createdOn: new Date('2015-02-10T15:33:41.000Z'),
  updatedOn: new Date('2026-04-17T13:51:36.000Z')
}

export const decision3: Decision = {
  id: '52000000cbd007000000367b',
  code: '16/10',
  title: {
    en: 'Communication, education and public awareness',
    fr: 'Communication, éducation et sensibilisation du public',
    es: 'Comunicación, educación y conciencia pública',
    ru: 'Коммуникация, просвещение и информирование общественности',
    zh: '传播、教育和公众意识',
    ar: 'الاتصالات والتثقيف والتوعية العامة'
  },
  urls: [
    'https://www.cbd.int/decisions/cop/?m=cop-16'
  ],
  eventTitle: 'Sixteenth meeting of the Conference of the Parties to the Convention on Biological Diversity',
  session: 16,
  decision: 10,
  createdOn: new Date('2024-12-03T10:45:34.000Z'),
  updatedOn: new Date('2025-04-21T13:42:39.000Z')
}

export const decision4: Decision = {
  id: '52000000cbd0070000003677',
  code: '16/19',
  title: {
    en: 'Biodiversity and health',
    fr: 'Biodiversité et santé',
    es: 'Diversidad biológica y salud',
    ru: 'Биоразнообразие и здоровье',
    zh: '生物多样性与健康',
    ar: 'التنوع البيولوجي والصحة'
  },
  urls: [
    'https://www.cbd.int/decisions/cop/?m=cop-16'
  ],
  eventTitle: 'Sixteenth meeting of the Conference of the Parties to the Convention on Biological Diversity',
  session: 16,
  decision: 19,
  createdOn: new Date('2024-11-28T16:53:41.000Z'),
  updatedOn: new Date('2025-04-17T13:07:02.000Z')
}

export const decisions: Decision[] = [decision1, decision2, decision3, decision4]
