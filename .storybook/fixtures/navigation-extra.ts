import type { Breadcrumb, Menu } from '~~/types/menu'
import { headerMenu, headerSubmenus } from './menus'
import { articles } from './articles'
import { decisions } from './decisions'
import { meetings } from './meetings'
import { notifications } from './notifications'
import { pressReleases } from './press-releases'
import { statements } from './statements'
import { ARTICLES, DECISIONS, MEETINGS, MENUS, NOTIFICATIONS, PRESS_RELEASES, STATEMENTS } from '~~/constants/api-paths'

// Page menus (with activeBranch) as [...alias].vue loads them, generated from
// /api/menus/cbd-convention?url=/convention/about/secretariat/staff/executive-secretary&depth=1 and
// /api/menus/cbd-gbf?url=/gbf/targets/3&depth=1 (2026-11-13).

// Active level-3 branch: what the vertical submenu receives on that page
export const secretariatMenu: Menu = {
  branchId: 'menu_link_content:63a896f3-dfab-4c48-a592-03e804f625f2',
  parentId: 'menu_link_content:c02c814d-2e5c-43c8-ab5e-78acc8f5be40',
  title: 'Secretariat',
  url: '/convention/about/secretariat',
  position: 100,
  childrenCount: 5,
  activeBranch: true,
  children: [
    {
      branchId: 'menu_link_content:8eff732c-fc5e-4d89-b9a0-372dcad2fda2',
      parentId: 'menu_link_content:63a896f3-dfab-4c48-a592-03e804f625f2',
      title: 'About',
      url: '/convention/about/secretariat/about',
      position: 10,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:f877e706-f363-4f3c-8f18-968952d7911f',
      parentId: 'menu_link_content:63a896f3-dfab-4c48-a592-03e804f625f2',
      title: 'Staff',
      url: '/convention/about/secretariat/staff',
      position: 30,
      childrenCount: 2,
      activeBranch: true,
      children: [
        {
          branchId: 'menu_link_content:786cb901-1128-4ff1-bee9-e93ba13ac9b0',
          parentId: 'menu_link_content:f877e706-f363-4f3c-8f18-968952d7911f',
          title: 'Executive Secretary',
          url: '/convention/about/secretariat/staff/executive-secretary',
          position: 10,
          childrenCount: 0,
          activeBranch: true
        },
        {
          branchId: 'menu_link_content:16fd31c4-d3e2-40a6-b1c6-feeadf4e0d9e',
          parentId: 'menu_link_content:f877e706-f363-4f3c-8f18-968952d7911f',
          title: 'Former Executive Secretaries',
          url: '/convention/about/secretariat/staff/former-executive-secretaries',
          position: 60,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:a81a6e2f-8052-4bd9-bb28-8b4130d17e5b',
      parentId: 'menu_link_content:63a896f3-dfab-4c48-a592-03e804f625f2',
      title: 'Work with Us',
      url: '/convention/about/secretariat/opportunities',
      position: 110,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:894b3758-f54a-467a-b618-e9508e288687',
      parentId: 'menu_link_content:63a896f3-dfab-4c48-a592-03e804f625f2',
      title: 'Doing Business with CBD',
      url: '/convention/about/secretariat/doing-business',
      position: 140,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:f87adbe3-26ad-4911-9144-0ca7ddeb84f2',
      parentId: 'menu_link_content:63a896f3-dfab-4c48-a592-03e804f625f2',
      title: 'Contact',
      url: '/convention/about/secretariat/contact',
      position: 150,
      childrenCount: 0
    }
  ]
}

export const conventionAboutMenu: Menu = {
  branchId: 'menu_link_content:c02c814d-2e5c-43c8-ab5e-78acc8f5be40',
  parentId: 'menu_link_content:32724643-acd9-4245-8b9d-a9b2dc171e98',
  title: 'About',
  url: '/convention/about',
  position: 1,
  childrenCount: 6,
  activeBranch: true,
  children: [
    {
      branchId: 'menu_link_content:111a0871-fcce-4413-af7f-a32fe0e018a8',
      parentId: 'menu_link_content:c02c814d-2e5c-43c8-ab5e-78acc8f5be40',
      title: 'Introduction',
      url: '/convention/about/introduction',
      position: -50,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:57d1f004-2e79-485c-8cdf-e066fc60aae7',
      parentId: 'menu_link_content:c02c814d-2e5c-43c8-ab5e-78acc8f5be40',
      title: 'Text of the Convention',
      url: '/convention/about/text-of-the-convention',
      position: -49,
      childrenCount: 46
    },
    {
      branchId: 'menu_link_content:058512f0-8060-4337-bbcb-322c61690fb3',
      parentId: 'menu_link_content:c02c814d-2e5c-43c8-ab5e-78acc8f5be40',
      title: 'History of the Convention',
      url: '/convention/about/history-of-the-convention',
      position: -48,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:5471cbdc-b600-4f19-939c-aa50777c73c1',
      parentId: 'menu_link_content:c02c814d-2e5c-43c8-ab5e-78acc8f5be40',
      title: 'Convention Protocols',
      url: '/convention/about/protocols',
      position: -47,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:150966b8-c255-4a34-aa52-158e5a81257f',
      parentId: 'menu_link_content:c02c814d-2e5c-43c8-ab5e-78acc8f5be40',
      title: 'International Day for Biological Diversity',
      url: '/convention/about/idb',
      position: -40,
      childrenCount: 25
    },
    secretariatMenu
  ]
}

export const conventionMenu: Menu = {
  branchId: 'menu_link_content:32724643-acd9-4245-8b9d-a9b2dc171e98',
  parentId: null,
  title: 'Biodiversity Convention',
  url: '/convention',
  position: 0,
  childrenCount: 9,
  activeBranch: true,
  children: [
    conventionAboutMenu,
    {
      branchId: 'menu_link_content:3ee6668c-3c1b-4882-8d32-df432b60f707',
      parentId: 'menu_link_content:32724643-acd9-4245-8b9d-a9b2dc171e98',
      title: 'Convention Bodies',
      url: '/convention/bodies',
      position: 2,
      childrenCount: 4
    },
    {
      branchId: 'menu_link_content:0937ae15-e663-4afc-8853-e7b93f821fd6',
      parentId: 'menu_link_content:32724643-acd9-4245-8b9d-a9b2dc171e98',
      title: 'Areas of Work',
      url: '/convention/areas-of-work',
      position: 3,
      childrenCount: 4
    },
    {
      branchId: 'menu_link_content:bb8c7f9a-888e-4d9f-9168-1392f0a71d9b',
      parentId: 'menu_link_content:32724643-acd9-4245-8b9d-a9b2dc171e98',
      title: 'Calendar and Notifications',
      url: '/convention/calendar-notifications-updates',
      position: 4,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:6d603e44-65a0-4d27-ab79-b90d036e152a',
      parentId: 'menu_link_content:32724643-acd9-4245-8b9d-a9b2dc171e98',
      title: 'Parties',
      url: '/convention/parties',
      position: 6,
      childrenCount: 4
    },
    {
      branchId: 'menu_link_content:27e8f653-7a81-45e8-8c36-9b8c3a35a60d',
      parentId: 'menu_link_content:32724643-acd9-4245-8b9d-a9b2dc171e98',
      title: 'Decisions',
      url: '/convention/decisions',
      position: 7,
      childrenCount: 3
    },
    {
      branchId: 'menu_link_content:1b0feba3-5def-44d6-bf4f-a1d825f803b3',
      parentId: 'menu_link_content:32724643-acd9-4245-8b9d-a9b2dc171e98',
      title: 'Recommendations ',
      url: '/convention/recommendations',
      position: 8,
      childrenCount: 8
    },
    {
      branchId: 'menu_link_content:5a7202c9-ca7d-497c-891f-298a206d64c1',
      parentId: 'menu_link_content:32724643-acd9-4245-8b9d-a9b2dc171e98',
      title: 'Resources',
      url: '/convention/resources',
      position: 10,
      childrenCount: 4
    },
    {
      branchId: 'menu_link_content:6a9bd279-e1d2-4666-bdb0-9f5ca62b6f4b',
      parentId: 'menu_link_content:32724643-acd9-4245-8b9d-a9b2dc171e98',
      title: 'Information',
      url: '/convention/information',
      position: 110,
      childrenCount: 5
    }
  ]
}

// Active level-2 branch with 23 children (more than 8: multi-column)
export const gbfTargetsMenu: Menu = {
  branchId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
  parentId: 'menu_link_content:7bb0747f-2004-46e1-8253-c0a4d48b022c',
  title: '2030 Targets with Guidance Notes ',
  url: '/gbf/targets',
  position: -52,
  childrenCount: 23,
  activeBranch: true,
  children: [
    {
      branchId: 'menu_link_content:d7c2f207-1c44-4b13-aba8-81e50fe75b51',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 1',
      url: '/gbf/targets/1',
      position: -50,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:6dc0dad8-5987-4ff7-811b-034995835b93',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 2',
      url: '/gbf/targets/2',
      position: -49,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:4021687b-b143-41d1-9281-58a2907b45f7',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 3',
      url: '/gbf/targets/3',
      position: -48,
      childrenCount: 0,
      activeBranch: true
    },
    {
      branchId: 'menu_link_content:04a1aa11-da72-4408-a7aa-5ce66486688f',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 4',
      url: '/gbf/targets/4',
      position: -47,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:7b27a174-0105-4fdd-a8fe-e9a5fec184e9',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 5',
      url: '/gbf/targets/5',
      position: -46,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:fffdf5aa-d486-42f5-ba97-48b25652674e',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 6',
      url: '/gbf/targets/6',
      position: -45,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:a2ada52e-e62c-410d-876d-db835e762535',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 7',
      url: '/gbf/targets/7',
      position: -44,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:f8459a50-0e38-4345-aa62-770111b7f886',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 8',
      url: '/gbf/targets/8',
      position: -43,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:dce7f9fc-c7df-4ac5-af1c-12d5e66fa370',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 9',
      url: '/gbf/targets/9',
      position: -42,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:8cd12091-a9a6-4547-88a9-7d5df961e178',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 10',
      url: '/gbf/targets/10',
      position: -41,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:b646f3f4-ffa7-4956-969d-8685b8401662',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 11',
      url: '/gbf/targets/11',
      position: -40,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:341570e8-c657-4c03-9db9-c3c30003b56f',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 12',
      url: '/gbf/targets/12',
      position: -39,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:18750b27-2523-42bb-b297-eb34bb50609e',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 13',
      url: '/gbf/targets/13',
      position: -38,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:d4dd6f03-dd54-4cad-9941-21e3bf3882d0',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 14',
      url: '/gbf/targets/14',
      position: -37,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:6ecbe927-c595-49ab-a242-ecd3630ffb07',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 15',
      url: '/gbf/targets/15',
      position: -36,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:cdd0b94a-10b3-4c66-9b95-1246171bad04',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 16',
      url: '/gbf/targets/16',
      position: -35,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:7b85ad46-1d0e-4613-abbc-77b6d775b91b',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 17',
      url: '/gbf/targets/17',
      position: -34,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:d469d9b4-fd01-472d-ba11-2e1b931bddf7',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 18',
      url: '/gbf/targets/18',
      position: -33,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:f2291447-b0b6-49c8-b761-a6122847e281',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 19',
      url: '/gbf/targets/19',
      position: -32,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:690f2664-7fdb-492c-a59a-bb9336b52948',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 20',
      url: '/gbf/targets/20',
      position: -31,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:5661fe09-fada-4f25-98f8-6c36f45d80e0',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 21',
      url: '/gbf/targets/21',
      position: -30,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:7aa1fc4d-758b-4b33-bb51-a62d5f130956',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 22',
      url: '/gbf/targets/22',
      position: -29,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:3e25c113-3154-47f6-8cf7-e90219174547',
      parentId: 'menu_link_content:bdcb1f26-4f31-4f61-acb6-46ce7b558e9a',
      title: 'Target 23',
      url: '/gbf/targets/23',
      position: -28,
      childrenCount: 0
    }
  ]
}

export const gbfMenu: Menu = {
  branchId: 'menu_link_content:7bb0747f-2004-46e1-8253-c0a4d48b022c',
  parentId: null,
  title: 'KMGBF',
  url: '/gbf',
  position: -56,
  childrenCount: 9,
  activeBranch: true,
  children: [
    {
      branchId: 'menu_link_content:cf393181-6128-4bce-8817-6c2b3b4a8e86',
      parentId: 'menu_link_content:7bb0747f-2004-46e1-8253-c0a4d48b022c',
      title: 'Introductory sections of the GBF',
      url: '/gbf/introduction',
      position: -55,
      childrenCount: 5
    },
    {
      branchId: 'menu_link_content:f81a9853-c23f-408c-b0cd-a8ab73b99146',
      parentId: 'menu_link_content:7bb0747f-2004-46e1-8253-c0a4d48b022c',
      title: '2050 Vision and 2030 Mission',
      url: '/gbf/vision-mission',
      position: -54,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:5106d71e-e375-4dfa-9aff-0860703346a5',
      parentId: 'menu_link_content:7bb0747f-2004-46e1-8253-c0a4d48b022c',
      title: '2050 Goals',
      url: '/gbf/goals',
      position: -53,
      childrenCount: 4
    },
    gbfTargetsMenu,
    {
      branchId: 'menu_link_content:2011a472-7ff8-4c71-9133-3fadfeaa6ad7',
      parentId: 'menu_link_content:7bb0747f-2004-46e1-8253-c0a4d48b022c',
      title: 'Implementation and support mechanisms',
      url: '/gbf/implementation-and-support',
      position: -51,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:d4791a68-7bd6-4d80-955f-a788231d5634',
      parentId: 'menu_link_content:7bb0747f-2004-46e1-8253-c0a4d48b022c',
      title: 'Responsibility and Transparency',
      url: '/gbf/responsibility-and-transparency',
      position: -50,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:d2350b1d-d88e-4763-97a7-53dbaf5d9907',
      parentId: 'menu_link_content:7bb0747f-2004-46e1-8253-c0a4d48b022c',
      title: 'Communication, Education, Awareness and Uptake',
      url: '/gbf/communication',
      position: -49,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:128559ab-c215-45f7-9879-32537218b231',
      parentId: 'menu_link_content:7bb0747f-2004-46e1-8253-c0a4d48b022c',
      title: 'Related Decisions ',
      url: '/gbf/decisions',
      position: -48,
      childrenCount: 6
    },
    {
      branchId: 'menu_link_content:30e9e5a1-c27f-444a-a284-548bca82e5c7',
      parentId: 'menu_link_content:7bb0747f-2004-46e1-8253-c0a4d48b022c',
      title: 'Branding Toolkit',
      url: '/gbf/branding',
      position: -47,
      childrenCount: 0
    }
  ]
}

// What [...alias].vue builds from conventionMenu for /convention/about/secretariat/staff/executive-secretary
export const conventionBreadcrumbs: Breadcrumb[] = [
  { title: 'Biodiversity Convention', url: '/convention', activeBranch: true },
  { title: 'About', url: '/convention/about', activeBranch: true },
  { title: 'Secretariat', url: '/convention/about/secretariat', activeBranch: true },
  { title: 'Staff', url: '/convention/about/secretariat/staff', activeBranch: true },
  { title: 'Executive Secretary', url: '/convention/about/secretariat/staff/executive-secretary', activeBranch: true }
]

function pick (menus: Menu[] | undefined, predicate: (menu: Menu) => boolean): Menu {
  const menu = menus?.find(predicate)
  if (menu === undefined) throw new Error('Menu fixture not found')
  return menu
}

// Header (mega menu) items from menus.ts: one with static children, one with dynamic-content lists
export const gbfHeaderItem = pick(headerMenu, m => m.submenu === 'cbd-header-gbf')
export const updatesHeaderItem = pick(headerMenu, m => m.submenu === 'cbd-header-updates')
export const gbfGoalsSubmenuItem = pick(headerSubmenus['cbd-header-gbf'], m => m.title === '2050 Goals')

// API mocks (parameters.api) for the lists navigation-mega-menu-dynamic-content requests (limit 4)
const firstFour = <T>(rows: T[]): { total: number, rows: T[] } => ({ total: rows.length, rows: rows.slice(0, 4) })
export const dynamicContentApi: Record<string, unknown> = {
  [ARTICLES]: firstFour(articles),
  [DECISIONS]: firstFour(decisions),
  [MEETINGS]: firstFour(meetings),
  [NOTIFICATIONS]: firstFour(notifications),
  [PRESS_RELEASES]: firstFour(pressReleases),
  [STATEMENTS]: firstFour(statements)
}

// API mocks for the whole mega menu: cbd-header, every submenu, and the dynamic-content lists
export const megaMenuApi: Record<string, unknown> = {
  [`${MENUS}/cbd-header`]: headerMenu,
  ...Object.fromEntries(Object.entries(headerSubmenus).map(([code, menu]) => [`${MENUS}/${code}`, menu])),
  ...dynamicContentApi
}
