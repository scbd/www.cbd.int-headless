import type { GbfTarget } from '~~/types/gbf-target'
import type { Nbsap } from '~~/types/nbsap'
import type { RecentUpdate } from '~~/types/recent-updates'
import { IMAGE_FALLBACK } from '~~/constants/image-paths'

// Data the generated fixtures don't cover.

// From /api/nbsaps?limit=100 (2026-11-13): the longest title in the first 100 rows.
export const nbsapLongTitle: Nbsap = {
  id: '52000000cbd0800000049925',
  code: 'ort-nbsap-ua-301349-1',
  title: {
    en: 'Resolution of the Cabinet of Ministers of Ukraine No. 708-r of 10 June 2026 “On the Approval of the Strategy for the Conservation of Biological Diversity of Ukraine for 2035 and Approval of the Operational Action Plan for Its Implementation in 2026–2028.”',
    fr: 'Resolution of the Cabinet of Ministers of Ukraine No. 708-r of 10 June 2026 “On the Approval of the Strategy for the Conservation of Biological Diversity of Ukraine for 2035 and Approval of the Operational Action Plan for Its Implementation in 2026–2028.”',
    es: 'Resolution of the Cabinet of Ministers of Ukraine No. 708-r of 10 June 2026 “On the Approval of the Strategy for the Conservation of Biological Diversity of Ukraine for 2035 and Approval of the Operational Action Plan for Its Implementation in 2026–2028.”',
    ru: 'Resolution of the Cabinet of Ministers of Ukraine No. 708-r of 10 June 2026 “On the Approval of the Strategy for the Conservation of Biological Diversity of Ukraine for 2035 and Approval of the Operational Action Plan for Its Implementation in 2026–2028.”',
    zh: 'Resolution of the Cabinet of Ministers of Ukraine No. 708-r of 10 June 2026 “On the Approval of the Strategy for the Conservation of Biological Diversity of Ukraine for 2035 and Approval of the Operational Action Plan for Its Implementation in 2026–2028.”',
    ar: 'Resolution of the Cabinet of Ministers of Ukraine No. 708-r of 10 June 2026 “On the Approval of the Strategy for the Conservation of Biological Diversity of Ukraine for 2035 and Approval of the Operational Action Plan for Its Implementation in 2026–2028.”'
  },
  urls: [
    'https://ort.cbd.int/database/record?documentID=301349'
  ],
  country: {
    en: 'Ukraine',
    fr: 'Ukraine',
    es: 'Ucrania',
    ru: 'Украина',
    zh: '乌克兰',
    ar: 'أوكرانيا'
  },
  createdOn: new Date('2026-10-05T15:14:28.020Z'),
  updatedOn: new Date('2026-10-05T15:14:28.020Z')
}

// From /api/recent-updates?limit=10 (2026-11-13): recent-updates.ts (limit=4) has no notification row.
export const recentUpdateNotification: RecentUpdate = {
  id: '52000000cbd0120000000e70',
  code: '2026-079',
  category: 'notification',
  title: {
    en: 'GEF-9 support to biodiversity monitoring systems and the eighth national reports to the Convention on Biological Diversity',
    fr: 'GEF-9 support to biodiversity monitoring systems and the eighth national reports to the Convention on Biological Diversity',
    es: 'GEF-9 support to biodiversity monitoring systems and the eighth national reports to the Convention on Biological Diversity',
    ru: 'GEF-9 support to biodiversity monitoring systems and the eighth national reports to the Convention on Biological Diversity',
    zh: 'GEF-9 support to biodiversity monitoring systems and the eighth national reports to the Convention on Biological Diversity',
    ar: 'GEF-9 support to biodiversity monitoring systems and the eighth national reports to the Convention on Biological Diversity'
  },
  urls: [
    '/notifications/2026-079'
  ],
  themes: [
    {
      en: 'Reporting',
      fr: 'Rapports nationaux',
      es: 'Informes nacionales',
      ru: 'Национальные доклады',
      zh: 'Reporting',
      ar: 'التقارير الوطنية'
    },
    {
      en: 'Memorandum of Cooperation',
      fr: 'Coopération et partenariats',
      es: 'Memorando de cooperación',
      ru: 'Меморандум о сотрудничестве',
      zh: 'Memorandum of Cooperation',
      ar: 'مذكرة التعاون'
    }
  ],
  createdOn: new Date('2026-10-15T00:00:00.000Z'),
  updatedOn: new Date('2026-10-15T10:24:28.000Z'),
  image: {
    category: 'image',
    path: IMAGE_FALLBACK,
    alt: 'Image not available',
    width: 290,
    height: 160
  }
}

// GBF targets with titles, mapped from the upstream thesaurus
// (api.cbd.int/api/v2013/thesaurus/domains/GBF-TARGETS/terms, 2026-11-13) the way services/gbf-targets.ts
// intends to. /api/gbf-targets currently returns empty title/shortTitle (see gbf-targets.ts): the service reads
// Solr-style `shortTitle_EN_t` keys, but the thesaurus already returns LStrings. Upstream es/fr titles are truncated.
export const gbfTarget1: GbfTarget = {
  identifier: 'GBF-TARGET-01',
  title: {
    en: 'GBF-T01. All areas are planned or managed to bring loss of areas of high biodiversity importance close to zero',
    es: 'GBF-T01. ',
    fr: 'GBF-T01. '
  },
  shortTitle: {
    en: 'GBF-T01. Plan and Manage all Areas To Reduce Biodiversity Loss',
    es: 'GBF-T01. Someter todas las zonas a planificación y gestión para reducir la pérdida de biodiversidad',
    fr: 'GBF-T01. Planifier et gérer toutes les zones afin de réduire la perte de biodiversité'
  }
}

export const gbfTarget2: GbfTarget = {
  identifier: 'GBF-TARGET-02',
  title: {
    en: 'GBF-T02. 30% of degraded areas are under effective restoration',
    es: 'GBF-T02. ',
    fr: 'GBF-T02. '
  },
  shortTitle: {
    en: 'GBF-T02. Restore 30% of all Degraded Ecosystems',
    es: 'GBF-T02. Restaurar el 30 % de todos los ecosistemas degradados',
    fr: 'GBF-T02. Restaurer 30 % des écosystèmes dégradés'
  }
}

export const gbfTarget3: GbfTarget = {
  identifier: 'GBF-TARGET-03',
  title: {
    en: 'GBF-T03. 30% of areas are effectively conserved',
    es: 'GBF-T03. ',
    fr: 'GBF-T03. '
  },
  shortTitle: {
    en: 'GBF-T03. Conserve 30% of Land, Waters and Seas',
    es: 'GBF-T03. Conservar el 30 % de las zonas terrestres, de aguas continentales y marinas',
    fr: 'GBF-T03. Conserver 30 % des terres, des eaux et des mers'
  }
}

export const gbfTarget4: GbfTarget = {
  identifier: 'GBF-TARGET-04',
  title: {
    en: 'GBF-T04. Threatened species are recovering, genetic diversity is being maintained and human-wildlife conflict is being managed',
    es: 'GBF-T04. ',
    fr: 'GBF-T04. '
  },
  shortTitle: {
    en: 'GBF-T04. Halt Species Extinction, Protect Genetic Diversity, and Manage Human-Wildlife Conflicts',
    es: 'GBF-T04. Detener la extinción de especies, proteger la diversidad genética y gestionar los conflictos entre los seres humanos y las especies silvestres',
    fr: 'GBF-T04. Endiguer l\'extinction des espèces, protéger la diversité génétique et gérer les conflits entre l\'homme et la faune sauvage'
  }
}

export const gbfTarget5: GbfTarget = {
  identifier: 'GBF-TARGET-05',
  title: {
    en: 'GBF-T05. Use, harvesting and trade of wild species is sustainable, safe and legal',
    es: 'GBF-T05. ',
    fr: 'GBF-T05. '
  },
  shortTitle: {
    en: 'GBF-T05. Ensure Sustainable, Safe and Legal Harvesting and Trade of Wild Species',
    es: 'GBF-T05. Garantizar que la recolección y el comercio de especies silvestres sean sostenibles, seguros y lícitos',
    fr: 'GBF-T05. Assurer un prélèvement et un commerce durables, sûrs et légaux des espèces sauvages'
  }
}

export const gbfTarget6: GbfTarget = {
  identifier: 'GBF-TARGET-06',
  title: {
    en: 'GBF-T06. Reduce rates of introduction and establishment of invasive alien species by 50%',
    es: 'GBF-T06. ',
    fr: 'GBF-T06. '
  },
  shortTitle: {
    en: 'GBF-T06. Reduce the Introduction of Invasive Alien Species by 50% and Minimize Their Impact',
    es: 'GBF-T06. Reducir en un 50 % la introducción de especies exóticas invasoras y minimizar sus impactos',
    fr: 'GBF-T06. Réduire de moitié l\'introduction d\'espèces exotiques envahissantes et limiter leurs incidences'
  }
}

export const gbfTarget7: GbfTarget = {
  identifier: 'GBF-TARGET-07',
  title: {
    en: 'GBF-T07. Pollution reduced, halving nutrient loss and pesticide risk',
    es: 'GBF-T07. ',
    fr: 'GBF-T07. '
  },
  shortTitle: {
    en: 'GBF-T07. Reduce Pollution to Levels That Are Not Harmful to Biodiversity',
    es: 'GBF-T07. Reducir la contaminación a niveles que no sean perjudiciales para la biodiversidad',
    fr: 'GBF-T07. Réduire la pollution à des niveaux sans danger pour la biodiversité'
  }
}

export const gbfTarget8: GbfTarget = {
  identifier: 'GBF-TARGET-08',
  title: {
    en: 'GBF-T08. Minimize impacts of climate change and ocean acidification including through nature-based solutions and/or ecosystem-based approaches',
    es: 'GBF-T08. ',
    fr: 'GBF-T08. '
  },
  shortTitle: {
    en: 'GBF-T08. Minimize the Impacts of Climate Change on Biodiversity and Build Resilience',
    es: 'GBF-T08. Minimizar el impacto del cambio climático en la biodiversidad y aumentar su resiliencia',
    fr: 'GBF-T08. Atténuer les effets des changements climatiques sur la biodiversité et renforcer la résilience'
  }
}

export const gbfTarget9: GbfTarget = {
  identifier: 'GBF-TARGET-09',
  title: {
    en: 'GBF-T09. Management of wild species is sustainable and benefits people',
    es: 'GBF-T09. ',
    fr: 'GBF-T09. '
  },
  shortTitle: {
    en: 'GBF-T09. Manage Wild Species Sustainably To Benefit People',
    es: 'GBF-T09. Garantizar la gestión sostenible de las especies silvestres para beneficio de las personas',
    fr: 'GBF-T09. Gérer les espèces sauvages de manière durable au bénéfice des populations'
  }
}

export const gbfTarget10: GbfTarget = {
  identifier: 'GBF-TARGET-10',
  title: {
    en: 'GBF-T10. Areas under agriculture, aquaculture, fisheries and forestry are managed sustainably',
    es: 'GBF-T10. ',
    fr: 'GBF-T10. '
  },
  shortTitle: {
    en: 'GBF-T10. Enhance Biodiversity and Sustainability in Agriculture, Aquaculture, Fisheries, and Forestry',
    es: 'GBF-T10. Mejorar la biodiversidad y la sostenibilidad en la agricultura, la acuicultura, la pesca y la silvicultura',
    fr: 'GBF-T10. Améliorer la biodiversité et la durabilité dans les secteurs agricole, aquacole, halieutique et forestier'
  }
}

export const gbfTarget11: GbfTarget = {
  identifier: 'GBF-TARGET-11',
  title: {
    en: 'GBF-T11. Nature’s contributions to people are restored, maintained and enhanced',
    es: 'GBF-T11. ',
    fr: 'GBF-T11. '
  },
  shortTitle: {
    en: 'GBF-T11. Restore, Maintain and Enhance Nature’s Contributions to People',
    es: 'GBF-T11. Restaurar, mantener y mejorar las contribuciones de la naturaleza a las personas',
    fr: 'GBF-T11. Restaurer, préserver et renforcer les contributions de la nature aux populations'
  }
}

export const gbfTarget12: GbfTarget = {
  identifier: 'GBF-TARGET-12',
  title: {
    en: 'GBF-T12. Urban green and blue spaces enhanced for human well-being',
    es: 'GBF-T12. ',
    fr: 'GBF-T12. '
  },
  shortTitle: {
    en: 'GBF-T12. Enhance Green Spaces and Urban Planning for Human Well-Being and Biodiversity',
    es: 'GBF-T12. Aumentar los espacios verdes y mejorar la planificación urbana para el bienestar humano y la biodiversidad',
    fr: 'GBF-T12. Améliorer les espaces verts et la planification urbaine en faveur du bien-être humain et de la biodiversité'
  }
}

export const gbfTarget13: GbfTarget = {
  identifier: 'GBF-TARGET-13',
  title: {
    en: 'GBF-T13. Fair and equitable sharing of benefits from genetic resources, digital sequence information and associated traditional knowledge',
    es: 'GBF-T13. ',
    fr: 'GBF-T13. '
  },
  shortTitle: {
    en: 'GBF-T13. Increase the Sharing of Benefits From Genetic Resources, Digital Sequence Information and Traditional Knowledge',
    es: 'GBF-T13. Aumentar la participación en los beneficios que se deriven de la utilización de los recursos genéticos, la información digital sobre secuencias y los conocimientos tradicionales',
    fr: 'GBF-T13. Renforcer le partage des avantages découlant des ressources génétiques, de l\'information de séquençage numérique et des connaissances traditionnelles'
  }
}

export const gbfTarget14: GbfTarget = {
  identifier: 'GBF-TARGET-14',
  title: {
    en: 'GBF-T14. The multiple values of biodiversity are integrated into decision-making at all levels',
    es: 'GBF-T14. ',
    fr: 'GBF-T14. '
  },
  shortTitle: {
    en: 'GBF-T14. Integrate Biodiversity in Decision-Making at Every Level',
    es: 'GBF-T14. Integrar la biodiversidad en la toma de decisiones en todos los niveles',
    fr: 'GBF-T14. Prendre en compte la biodiversité dans le processus décisionnel à tous les niveaux'
  }
}

export const gbfTarget15: GbfTarget = {
  identifier: 'GBF-TARGET-15',
  title: {
    en: 'GBF-T15. Businesses assess and disclose biodiversity dependencies, impacts and risks, and reduce negative impacts',
    es: 'GBF-T15. ',
    fr: 'GBF-T15. '
  },
  shortTitle: {
    en: 'GBF-T15. Businesses Assess, Disclose and Reduce Biodiversity-Related Risks and Negative Impacts',
    es: 'GBF-T15. Garantizar que las empresas evalúen, den a conocer y reduzcan sus riesgos e impactos negativos relacionados con la biodiversidad',
    fr: 'GBF-T15. Les entreprises évaluent, communiquent et réduisent les risques et les incidences négatives sur la biodiversité'
  }
}

export const gbfTarget16: GbfTarget = {
  identifier: 'GBF-TARGET-16',
  title: {
    en: 'GBF-T16. Sustainable consumption choices are enabled, and food waste reduced by half',
    es: 'GBF-T16. ',
    fr: 'GBF-T16. '
  },
  shortTitle: {
    en: 'GBF-T16. Enable Sustainable Consumption Choices To Reduce Waste and Overconsumption',
    es: 'GBF-T16. Promover la elección de opciones de consumo sostenible para reducir el desperdicio y el consumo excesivo',
    fr: 'GBF-T16. Donner les moyens de faire des choix de consommation durables pour réduire les déchets et la surconsommation'
  }
}

export const gbfTarget17: GbfTarget = {
  identifier: 'GBF-TARGET-17',
  title: {
    en: 'GBF-T17. Strengthen biosafety and distribute benefits of biotechnology',
    es: 'GBF-T17. ',
    fr: 'GBF-T17. Renforcer la prévention des risques biotechnologiques et partager les avantages liés aux biotechnologies'
  },
  shortTitle: {
    en: 'GBF-T17. Strengthen Biosafety and Distribute the Benefits of Biotechnology',
    es: 'GBF-T17. Reforzar la seguridad de la biotecnología y distribuir los beneficios de la biotecnología',
    fr: 'GBF-T17. Renforcer la prévention des risques biotechnologiques et partager les avantages liés aux biotechnologies'
  }
}

export const gbfTarget18: GbfTarget = {
  identifier: 'GBF-TARGET-18',
  title: {
    en: 'GBF-T18. Reduce harmful incentives by at least $500 billion per year',
    es: 'GBF-T18. ',
    fr: 'GBF-T18. '
  },
  shortTitle: {
    en: 'GBF-T18. Reduce Harmful Incentives by at Least $500 Billion per Year, and Scale Up Positive Incentives for Biodiversity',
    es: 'GBF-T18. Reducir los incentivos perjudiciales en al menos 500.000 millones de dólares de los Estados Unidos al año y aumentar los incentivos positivos para la biodiversidad',
    fr: 'GBF-T18. Réduire les incitations préjudiciables d\'au moins 500 milliards de dollars par an et renforcer les incitations positives en faveur de la biodiversité'
  }
}

export const gbfTarget19: GbfTarget = {
  identifier: 'GBF-TARGET-19',
  title: {
    en: 'GBF-T19. Financial resources increased to $200 billion per year, including $ 30 billion through international finance',
    es: 'GBF-T19. ',
    fr: 'GBF-T19. '
  },
  shortTitle: {
    en: 'GBF-T19. Mobilize $200 Billion per Year for Biodiversity From all Sources, Including $30 Billion Through International Finance',
    es: 'GBF-T19. Movilizar 200.000 millones de dólares de los Estados Unidos al año para la biodiversidad, provenientes de todas las fuentes, incluidos 30.000 millones de dólares mediante financiación internacional',
    fr: 'GBF-T19. Mobiliser 200 milliards de dollars par an en faveur de la biodiversité, provenant de toutes les sources, dont 30 milliards de dollars grâce à la finance internationale'
  }
}

export const gbfTarget20: GbfTarget = {
  identifier: 'GBF-TARGET-20',
  title: {
    en: 'GBF-T20. Capacity-building and development, technology transfer, and technical and scientific cooperation for implementation is strengthened',
    es: 'GBF-T20. ',
    fr: 'GBF-T20. '
  },
  shortTitle: {
    en: 'GBF-T20. Strengthen Capacity-Building, Technology Transfer, and Scientific and Technical Cooperation for Biodiversity',
    es: 'GBF-T20. Fortalecer la creación de capacidad, la transferencia de tecnología y la cooperación científica y técnica para la biodiversidad',
    fr: 'GBF-T20. Renforcer le développement des capacités, le transfert de technologies et la coopération scientifique et technique en matière de biodiversité'
  }
}

export const gbfTarget21: GbfTarget = {
  identifier: 'GBF-TARGET-21',
  title: {
    en: 'GBF-T21. Data, information and knowledge for decision-making is available',
    es: 'GBF-T21. ',
    fr: 'GBF-T21. '
  },
  shortTitle: {
    en: 'GBF-T21. Ensure That Knowledge Is Available and Accessible To Guide Biodiversity Action',
    es: 'GBF-T21. Garantizar la disponibilidad y accesibilidad de conocimientos para orientar las acciones en materia de biodiversidad',
    fr: 'GBF-T21. Faire en sorte que les connaissances soient disponibles et accessibles pour orienter l\'action en faveur de la biodiversité'
  }
}

export const gbfTarget22: GbfTarget = {
  identifier: 'GBF-TARGET-22',
  title: {
    en: 'GBF-T22. Ensure participation, justice, and rights for indigenous peoples and local communities, women, youth persons with disabilities and environmental defenders',
    es: 'GBF-T22. ',
    fr: 'GBF-T22. '
  },
  shortTitle: {
    en: 'GBF-T22. Ensure Participation in Decision-Making and Access to Justice and Information Related to Biodiversity for all',
    es: 'GBF-T22. Garantizar la participación de todos en la toma de decisiones y su acceso a la justicia y a información relacionada con la biodiversidad',
    fr: 'GBF-T22. Assurer à tous une participation aux processus décisionnels et un accès à la justice et aux informations relatives à la biodiversité'
  }
}

export const gbfTarget23: GbfTarget = {
  identifier: 'GBF-TARGET-23',
  title: {
    en: 'GBF-T23. Implementation follows a gender-responsive approach',
    es: 'GBF-T23. ',
    fr: 'GBF-T23. '
  },
  shortTitle: {
    en: 'GBF-T23. Ensure Gender Equality and a Gender-Responsive Approach for Biodiversity Action',
    es: 'GBF-T23. Garantizar la igualdad de género y un enfoque con perspectiva de género en las acciones en materia de biodiversidad',
    fr: 'GBF-T23. Assurer l\'égalité des genres et une approche tenant compte du genre dans l\'action en faveur de la biodiversité'
  }
}

export const gbfTargetsWithTitles: GbfTarget[] = [
  gbfTarget1,
  gbfTarget2,
  gbfTarget3,
  gbfTarget4,
  gbfTarget5,
  gbfTarget6,
  gbfTarget7,
  gbfTarget8,
  gbfTarget9,
  gbfTarget10,
  gbfTarget11,
  gbfTarget12,
  gbfTarget13,
  gbfTarget14,
  gbfTarget15,
  gbfTarget16,
  gbfTarget17,
  gbfTarget18,
  gbfTarget19,
  gbfTarget20,
  gbfTarget21,
  gbfTarget22,
  gbfTarget23
]
