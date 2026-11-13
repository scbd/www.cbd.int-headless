import type { Menu } from '~~/types/menu'

// Generated from /api/menus/cbd-header, /api/menus/cbd-footer and each header submenu (2026-11-13).

export const headerMenu: Menu[] = [
  {
    branchId: 'menu_link_content:53f7a648-52b7-4495-b512-ae25920482d0',
    title: 'Processes and Meetings',
    url: '',
    position: -50,
    submenu: 'cbd-header-processes-and-meeting',
    childrenCount: 0
  },
  {
    branchId: 'menu_link_content:e94a2497-a6e8-464c-b243-7bef13d01f43',
    title: 'News and Media',
    url: '',
    position: -49,
    submenu: 'cbd-header-updates',
    childrenCount: 0
  },
  {
    branchId: 'menu_link_content:c1bfaef9-d42d-4d49-aa0a-2736c74da7ec',
    title: 'KMGBF',
    url: '/gbf',
    position: -48,
    submenu: 'cbd-header-gbf',
    childrenCount: 0
  },
  {
    branchId: 'menu_link_content:50dfd85c-1e44-487b-b32d-2aafab2c5f8e',
    title: 'Biodiversity Convention',
    url: '/convention',
    position: -47,
    submenu: 'cbd-header-biodiversity-conventi',
    childrenCount: 0
  },
  {
    branchId: 'menu_link_content:f931f1ab-a5f1-4c00-8752-dfc8a13fe0a2',
    title: 'Cartagena Protocol',
    url: '/cartagena',
    position: -46,
    submenu: 'cbd-header-cartagena-protocol',
    childrenCount: 0
  },
  {
    branchId: 'menu_link_content:aa82fe63-666f-4384-9a87-45d6ecfe09b0',
    title: 'Nagoya Protocol',
    url: '/nagoya',
    position: -45,
    submenu: 'cbd-header-nagoya-protocol',
    childrenCount: 0
  },
  {
    branchId: 'menu_link_content:1c0e032a-59a1-454c-a52a-c67733295715',
    title: 'Countries',
    url: '',
    position: -44,
    submenu: 'cbd-header-countries',
    childrenCount: 0
  }
]

export const footerMenu: Menu[] = [
  {
    branchId: 'menu_link_content:a556ddaf-37aa-48e8-bfca-5adee1708769',
    title: 'News and Media',
    url: '',
    position: 10,
    childrenCount: 2,
    children: [
      {
        branchId: 'menu_link_content:1e69e1fd-1ff3-4ad1-b246-5971ac366abb',
        parentId: 'menu_link_content:a556ddaf-37aa-48e8-bfca-5adee1708769',
        title: 'Statements by the Executive Secretary',
        url: '/statements',
        position: 10,
        childrenCount: 0
      },
      {
        branchId: 'menu_link_content:d42c36d4-ce21-42ea-a776-87a2be84b440',
        parentId: 'menu_link_content:a556ddaf-37aa-48e8-bfca-5adee1708769',
        title: 'News Articles',
        url: '/news/Articles',
        position: 20,
        childrenCount: 0
      }
    ]
  },
  {
    branchId: 'menu_link_content:eba8d446-714b-41de-a365-f6d034fe6981',
    title: 'Tools and Resources ',
    url: '',
    position: 20,
    childrenCount: 2,
    children: [
      {
        branchId: 'menu_link_content:f4291d11-fa28-4381-853b-e3a7b66ca01d',
        parentId: 'menu_link_content:eba8d446-714b-41de-a365-f6d034fe6981',
        title: 'Online Reporting Tool',
        url: 'https://ort.cbd.int',
        position: 10,
        childrenCount: 0
      },
      {
        branchId: 'menu_link_content:6dd7b317-20b7-4716-8cb1-973686bd252f',
        parentId: 'menu_link_content:eba8d446-714b-41de-a365-f6d034fe6981',
        title: 'Decision Tracking Tool  ',
        url: 'https://www.cbd.int/decisions/search',
        position: 20,
        childrenCount: 0
      }
    ]
  },
  {
    branchId: 'menu_link_content:324a95f9-3dd7-4e7b-be12-22363cb797c8',
    title: 'Clearing-Houses',
    url: '',
    position: 30,
    childrenCount: 4,
    children: [
      {
        branchId: 'menu_link_content:a8c08170-2f71-495b-b206-fdb18de2c984',
        parentId: 'menu_link_content:324a95f9-3dd7-4e7b-be12-22363cb797c8',
        title: 'Access and Benefit-sharing Clearing-House',
        url: 'https://absch.cbd.int/en/',
        position: 10,
        childrenCount: 0
      },
      {
        branchId: 'menu_link_content:cf54f3f2-6cad-4763-81da-460b90a7ff23',
        parentId: 'menu_link_content:324a95f9-3dd7-4e7b-be12-22363cb797c8',
        title: 'Biosafety Clearing-House',
        url: 'https://bch.cbd.int/en/',
        position: 10,
        childrenCount: 0
      },
      {
        branchId: 'menu_link_content:48d91051-923d-4792-bd26-4376f7fd0ad8',
        parentId: 'menu_link_content:324a95f9-3dd7-4e7b-be12-22363cb797c8',
        title: 'Clearing-House Mechanism Portal',
        url: 'https://chm.cbd.int/en/',
        position: 30,
        childrenCount: 0
      },
      {
        branchId: 'menu_link_content:caccfc00-b00c-49c8-ae2f-19e881f46304',
        parentId: 'menu_link_content:324a95f9-3dd7-4e7b-be12-22363cb797c8',
        title: 'National Clearing House',
        url: 'https://chm.cbd.int/en/kb/tags/chm-announcement/National-Clearing-House-Mechanisms/67e2160d570c952f2fe08064',
        position: 40,
        childrenCount: 0
      }
    ]
  },
  {
    branchId: 'menu_link_content:32a9b811-46e6-4ab7-9745-ed24a8ee6e5d',
    title: 'Cooperation',
    url: '',
    position: 40,
    childrenCount: 3,
    children: [
      {
        branchId: 'menu_link_content:d44de2bb-6e62-4f63-b27a-ea822c16bd65',
        parentId: 'menu_link_content:32a9b811-46e6-4ab7-9745-ed24a8ee6e5d',
        title: 'Rio Conventions',
        url: '/convention/areas-of-work/implementation/cooperation-and-partnerships/mea/joint-%20liaison%20group-%20rio',
        position: 10,
        childrenCount: 0
      },
      {
        branchId: 'menu_link_content:5936e36a-38ed-4c96-b19e-f3b21c737b26',
        parentId: 'menu_link_content:32a9b811-46e6-4ab7-9745-ed24a8ee6e5d',
        title: 'Biodiversity Liaison Group',
        url: '/convention/areas-of-work/implementation/cooperation-and-partnerships/mea/joint-%20liaison%20group-%20biodiversity',
        position: 20,
        childrenCount: 1,
        children: [
          {
            branchId: 'menu_link_content:4d4e8b6a-6747-4ddd-9317-cf411b326f35',
            parentId: 'menu_link_content:5936e36a-38ed-4c96-b19e-f3b21c737b26',
            title: 'Japan Biodiversity Fund',
            url: '/convention/areas-of-work/implementation/jbf',
            position: 70,
            childrenCount: 0
          }
        ]
      },
      {
        branchId: 'menu_link_content:3a4b1cbe-521f-4bf8-9c54-c710e4717e60',
        parentId: 'menu_link_content:32a9b811-46e6-4ab7-9745-ed24a8ee6e5d',
        title: 'Partnerships',
        url: '/convention/information/partnership',
        position: 50,
        childrenCount: 0
      }
    ]
  },
  {
    branchId: 'menu_link_content:5730b189-86a3-4382-83b7-63ce6412264d',
    title: 'Secretariat ',
    url: '/convention/about/secretariat',
    position: 60,
    childrenCount: 5,
    children: [
      {
        branchId: 'menu_link_content:551c79bc-19fd-4c0d-9923-a2049ce7bff4',
        parentId: 'menu_link_content:5730b189-86a3-4382-83b7-63ce6412264d',
        title: 'Executive Secretary ',
        url: '/convention/about/secretariat/staff/executive-secretary',
        position: 10,
        childrenCount: 0
      },
      {
        branchId: 'menu_link_content:a08a60b7-73dd-40a8-be79-92c31bad821b',
        parentId: 'menu_link_content:5730b189-86a3-4382-83b7-63ce6412264d',
        title: 'Secretariat Structure  ',
        url: '/convention/about/secretariat/staff',
        position: 20,
        childrenCount: 0
      },
      {
        branchId: 'menu_link_content:b1547c4f-609a-43ab-b17c-c0c55f9137a3',
        parentId: 'menu_link_content:5730b189-86a3-4382-83b7-63ce6412264d',
        title: 'Work with us',
        url: '/convention/about/secretariat/opportunities',
        position: 30,
        childrenCount: 0
      },
      {
        branchId: 'menu_link_content:7d9a16a8-cd41-4a87-9637-3796ee0404ff',
        parentId: 'menu_link_content:5730b189-86a3-4382-83b7-63ce6412264d',
        title: 'Contact Us ',
        url: '/convention/about/secretariat/contact',
        position: 60,
        childrenCount: 0
      },
      {
        branchId: 'menu_link_content:7f42e0b4-4d4e-46fb-8576-70b1bb5bf6c7',
        parentId: 'menu_link_content:5730b189-86a3-4382-83b7-63ce6412264d',
        title: 'Japan Biodiversity Fund',
        url: '/convention/areas-of-work/implementation/jbf',
        position: 70,
        childrenCount: 0
      }
    ]
  },
  {
    branchId: 'menu_link_content:68736728-f016-4f57-b45f-fa03e7afc4c9',
    title: 'Information',
    url: '',
    position: 130,
    childrenCount: 4,
    children: [
      {
        branchId: 'menu_link_content:9f004461-9390-415a-a57a-7055213c7b13',
        parentId: 'menu_link_content:68736728-f016-4f57-b45f-fa03e7afc4c9',
        title: 'Terms of Use',
        url: '/convention/information/terms',
        position: -49,
        childrenCount: 0
      },
      {
        branchId: 'menu_link_content:cbde2a00-5884-41f5-b861-4e824983047d',
        parentId: 'menu_link_content:68736728-f016-4f57-b45f-fa03e7afc4c9',
        title: 'Privacy Policy',
        url: '/convention/information/privacy',
        position: -48,
        childrenCount: 0
      },
      {
        branchId: 'menu_link_content:b8b2288b-1540-4a13-b7ea-6630d8bcf998',
        parentId: 'menu_link_content:68736728-f016-4f57-b45f-fa03e7afc4c9',
        title: 'Credits',
        url: '/convention/information/credits',
        position: -47,
        childrenCount: 0
      },
      {
        branchId: 'menu_link_content:58f7c882-a2e2-496a-9110-f7ec8e87993e',
        parentId: 'menu_link_content:68736728-f016-4f57-b45f-fa03e7afc4c9',
        title: 'Copyright',
        url: 'https://www.cbd.int/copyright',
        position: -46,
        childrenCount: 0
      }
    ]
  }
]

export const headerSubmenus: Record<string, Menu[]> = {
  'cbd-header-processes-and-meeting': [
    {
      branchId: 'menu_link_content:14a09681-c3ae-4e74-9a8f-d19829b23559',
      title: 'Meetings',
      url: '/meetings',
      position: -50,
      component: 'meetings',
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:8167b745-e72f-4a3a-aa63-7ee1d4e4a401',
      title: 'Notifications',
      url: '/notifications',
      position: -49,
      component: 'notifications',
      childrenCount: 0
    }
  ],
  'cbd-header-updates': [
    {
      branchId: 'menu_link_content:5b57ab6d-eb58-43bf-a698-e5352d79360e',
      title: 'News Articles',
      url: '/news/articles',
      position: -48,
      component: 'articles',
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:77da2929-d953-47c4-98a9-e0a5338c95a7',
      title: 'Statements',
      url: '/statements',
      position: -46,
      component: 'statements',
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:fcd515c6-c430-4c20-9817-d835a3cf06a3',
      title: 'Press Releases',
      url: '/news/press-release',
      position: 30,
      component: 'press-releases',
      childrenCount: 0
    }
  ],
  'cbd-header-gbf': [
    {
      branchId: 'menu_link_content:8e9113c2-8f46-44a3-b7ac-dd7e47e26fb5',
      title: 'Introductory sections of the GBF',
      url: '/gbf/introduction',
      position: 20,
      childrenCount: 5,
      children: [
        {
          branchId: 'menu_link_content:78c3f4bc-9119-4639-ab76-d7c81ad28eb8',
          parentId: 'menu_link_content:8e9113c2-8f46-44a3-b7ac-dd7e47e26fb5',
          title: 'Background',
          url: '/gbf/introduction/background',
          position: -49,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:0e5757c7-b0c8-4a12-a981-dd6c47df4a66',
          parentId: 'menu_link_content:8e9113c2-8f46-44a3-b7ac-dd7e47e26fb5',
          title: 'Purpose',
          url: '/gbf/introduction/purpose',
          position: -48,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:e5bbd8fc-f642-4b94-a234-5263afb541ad',
          parentId: 'menu_link_content:8e9113c2-8f46-44a3-b7ac-dd7e47e26fb5',
          title: 'Considerations for the implementation',
          url: '/gbf/introduction/considerations-for-the-implementation',
          position: -47,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:caf5d925-672e-44db-a44f-b60f96d9820e',
          parentId: 'menu_link_content:8e9113c2-8f46-44a3-b7ac-dd7e47e26fb5',
          title: 'Relationship with the 2030 Agenda for Sustainable Development',
          url: '/gbf/introduction/gbf-and-sdgs',
          position: -46,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:037733ce-c16d-4a5e-a2aa-2d81038db152',
          parentId: 'menu_link_content:8e9113c2-8f46-44a3-b7ac-dd7e47e26fb5',
          title: 'Theory of change',
          url: '/gbf/introduction/theory-of-change',
          position: -45,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:3e86cccc-1504-4749-9d65-a10b965c1998',
      title: '2050 Vision and 2030 Mission',
      url: '/gbf/vision-mission',
      position: 30,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:ad0925a8-fcef-4cb3-af1a-4abb4b318401',
      title: '2050 Goals',
      url: '/gbf/goals',
      position: 40,
      childrenCount: 4,
      children: [
        {
          branchId: 'menu_link_content:9a01e494-900e-420f-8525-e33d9272ce3d',
          parentId: 'menu_link_content:ad0925a8-fcef-4cb3-af1a-4abb4b318401',
          title: 'Goal A',
          url: '/gbf/goals/goal-a',
          position: 10,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:f9dfdec0-e482-4a93-b444-282162bf2e74',
          parentId: 'menu_link_content:ad0925a8-fcef-4cb3-af1a-4abb4b318401',
          title: 'Goal B',
          url: '/gbf/goals/goal-b',
          position: 20,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:8377d881-28c4-4817-bc06-20eff9f23189',
          parentId: 'menu_link_content:ad0925a8-fcef-4cb3-af1a-4abb4b318401',
          title: 'Goal C',
          url: '/kmgbf/goals/goal-c',
          position: 40,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:7b0f7712-8620-45e4-922f-c04afe6e5474',
          parentId: 'menu_link_content:ad0925a8-fcef-4cb3-af1a-4abb4b318401',
          title: 'Goal D',
          url: '/gbf/goals/goal-d',
          position: 50,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
      title: '2030 Targets with Guidance Notes',
      url: '/gbf/targets',
      position: 45,
      childrenCount: 23,
      children: [
        {
          branchId: 'menu_link_content:99a20307-d086-4162-9ec9-4902f25baf4a',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 1',
          url: '/gbf/targets/1',
          position: -50,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:8058cbc0-dae2-41a5-a392-54987727fa16',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 2',
          url: '/gbf/targets/2',
          position: -49,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:868f9e71-6078-474d-8371-d0be7c873d0a',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 3',
          url: '/gbf/targets/3',
          position: -48,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:b959555e-ea04-4741-bd17-997be5b06817',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 4',
          url: '/gbf/targets/4',
          position: -47,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:444bc1f8-ea16-45a4-b12a-9d9e6ee3cc23',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 5',
          url: '/gbf/targets/5',
          position: -46,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:1f298f93-5bbd-4a67-9ae7-a191e7490713',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 6',
          url: '/gbf/targets/6',
          position: -45,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:365f1c81-8d80-4e01-b99a-d7ff3bb7d13d',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 7',
          url: '/gbf/targets/7',
          position: -44,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:99cac477-0c1b-4b53-b453-f991592fefb6',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 8',
          url: '/gbf/targets/8',
          position: -43,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:d36abce7-5dd9-4960-aef3-07f2162778c8',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 9',
          url: '/gbf/targets/9',
          position: -42,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:fc665d69-319b-4a32-b3d0-7278f702301b',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 10',
          url: '/gbf/targets/10',
          position: -41,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:eab60a44-af69-493b-9ac1-93184fffbd04',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 11',
          url: '/gbf/targets/11',
          position: -40,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:3e9b36bf-d7e0-4643-a840-def708fb4440',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 12',
          url: '/gbf/targets/12',
          position: -39,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:6e0f147f-8623-4e2d-acc3-9cf6a0a1ac84',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 13',
          url: '/gbf/targets/13',
          position: -38,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:b2a6663f-4856-4ea0-bbb3-91241f6deac6',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 14',
          url: '/gbf/targets/14',
          position: -37,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:9fa302f2-ebc4-477a-b6e0-3350a3238b13',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 15',
          url: '/gbf/targets/15',
          position: -36,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:be26c72e-bf2a-4228-bdc3-fefd71cd5fa7',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 16',
          url: '/gbf/targets/16',
          position: -35,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:5ae30d54-cb33-4d7f-863d-0d398edb4783',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 17',
          url: '/gbf/targets/17',
          position: -34,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:8dca42a9-1c68-4509-a87c-d031b0f4b8f5',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 18',
          url: '/gbf/targets/18',
          position: -33,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:909d5a10-a9b8-4c9b-8153-6b489d8f894c',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 19',
          url: '/gbf/targets/19',
          position: -32,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:37740220-3b63-4143-ab4f-452ed2e78236',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 20',
          url: '/gbf/targets/20',
          position: -31,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:e9861efe-4463-4660-918f-0e0749105e48',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 21',
          url: '/gbf/targets/21',
          position: -30,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:6904c2f5-4c68-48be-b880-5f36b51b778f',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 22',
          url: '/gbf/targets/22',
          position: -28,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:8486602e-0432-4e0d-bac0-d647742ced7f',
          parentId: 'menu_link_content:6dba1250-f76e-43a2-98e2-7b70c12a11d5',
          title: 'Target 23',
          url: '/gbf/targets/23',
          position: -27,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:ca658a37-0fad-434b-b2a3-5f7c7eebe8dc',
      title: 'Implementation and support mechanisms',
      url: '/gbf/implementation-and-support',
      position: 50,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:feb4c023-3f20-4577-af6f-8986f6d49f02',
      title: 'Responsibility and Transparency',
      url: '/gbf/responsibility-and-transparency',
      position: 50,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:8e15d393-28cf-44df-8e69-97436ea620d3',
      title: 'Communication, Education, Awareness and Uptake',
      url: '/gbf/communication',
      position: 55,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:4387c0da-a1a2-4281-8864-45aa353a9ef5',
      title: 'Related Decisions',
      url: '/gbf/decisions',
      position: 60,
      childrenCount: 6,
      children: [
        {
          branchId: 'menu_link_content:292777e3-e17e-4258-92ec-c89189611e5f',
          parentId: 'menu_link_content:4387c0da-a1a2-4281-8864-45aa353a9ef5',
          title: 'Monitoring Framework',
          url: '/gbf/decisions/monitoring',
          position: -50,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:92d18441-2cc5-4245-a0c4-9206e0ff38fe',
          parentId: 'menu_link_content:4387c0da-a1a2-4281-8864-45aa353a9ef5',
          title: 'Mechanisms for PMRR',
          url: '/gbf/decisions/mechanisms',
          position: -49,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:d68ec90e-cf0c-481d-8230-81a7ebdc804e',
          parentId: 'menu_link_content:4387c0da-a1a2-4281-8864-45aa353a9ef5',
          title: 'Resource Mobilization',
          url: '/gbf/decisions/resource-mobilization',
          position: -48,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:37e42a87-07a6-4593-b5fa-69a1e8225e53',
          parentId: 'menu_link_content:4387c0da-a1a2-4281-8864-45aa353a9ef5',
          title: 'Capacity Building & TSC',
          url: '/gbf/decisions/capacity-building',
          position: 0,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:52a2cc8a-557c-401b-882d-26fac73ccf61',
          parentId: 'menu_link_content:4387c0da-a1a2-4281-8864-45aa353a9ef5',
          title: 'Digital Sequence Information',
          url: '/gbf/decisions/digital-sequence-information',
          position: 0,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:708e61c6-9cb8-4a3b-b9d6-92e92a1f5390',
          parentId: 'menu_link_content:4387c0da-a1a2-4281-8864-45aa353a9ef5',
          title: 'Gender Plan of Action',
          url: '/kmgbf/decisions/gender-plan-of-action',
          position: 0,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:71f67eef-e284-4291-9d19-5cb883222786',
      title: 'Branding and Logo',
      url: '/gbf/branding',
      position: 100,
      childrenCount: 0
    }
  ],
  'cbd-header-biodiversity-conventi': [
    {
      branchId: 'menu_link_content:ced03c90-1e9c-4710-91e6-c24615c0d4d9',
      title: 'About',
      url: '/convention/about',
      position: 10,
      childrenCount: 6,
      children: [
        {
          branchId: 'menu_link_content:7d53f067-11a2-42e3-b8f4-fca7cd897897',
          parentId: 'menu_link_content:ced03c90-1e9c-4710-91e6-c24615c0d4d9',
          title: 'Introduction',
          url: '/convention/about/introduction',
          position: 10,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:a76df978-aea3-43ea-a702-e4d23fab9d4b',
          parentId: 'menu_link_content:ced03c90-1e9c-4710-91e6-c24615c0d4d9',
          title: 'Text of the Convention',
          url: '/convention/about/text',
          position: 20,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:8fa3a9e2-6c60-4e7b-aa05-9f9fe593654b',
          parentId: 'menu_link_content:ced03c90-1e9c-4710-91e6-c24615c0d4d9',
          title: 'History of the Convention',
          url: '/convention/about/history-of-the-convention',
          position: 30,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:639371fb-f1d8-4ecf-b1bb-98c809977f03',
          parentId: 'menu_link_content:ced03c90-1e9c-4710-91e6-c24615c0d4d9',
          title: 'Convention Protocols',
          url: '/convention/about/protocols',
          position: 40,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:78d56c26-ce21-4c17-9441-5a57377c4780',
          parentId: 'menu_link_content:ced03c90-1e9c-4710-91e6-c24615c0d4d9',
          title: 'International Day of Biodiversity (IDB)',
          url: '/convention/about/idb',
          position: 50,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:c34e4665-29e6-48bd-8e73-526f69ffdf2b',
          parentId: 'menu_link_content:ced03c90-1e9c-4710-91e6-c24615c0d4d9',
          title: 'Secretariat ',
          url: '/convention/about/secretariat',
          position: 60,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:f8fb6ce0-d26e-4e8d-9dcf-398f2e8338dd',
      title: 'Convention Bodies',
      url: '/convention/bodies',
      position: 20,
      childrenCount: 4,
      children: [
        {
          branchId: 'menu_link_content:30575385-8c8e-4e41-b64d-526814a8d931',
          parentId: 'menu_link_content:f8fb6ce0-d26e-4e8d-9dcf-398f2e8338dd',
          title: 'Conference of the Parties (COP)',
          url: '/convention/bodies/cop',
          position: 10,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:d9ee6c93-a417-469a-b07c-6851d18ce9ce',
          parentId: 'menu_link_content:f8fb6ce0-d26e-4e8d-9dcf-398f2e8338dd',
          title: 'SBI ',
          url: '/convention/bodies/sbi',
          position: 20,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:9cd9a377-4dab-459a-a3e7-aa35055ee472',
          parentId: 'menu_link_content:f8fb6ce0-d26e-4e8d-9dcf-398f2e8338dd',
          title: 'SBSTTA ',
          url: '/convention/bodies/sbstta',
          position: 30,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:3d768e6b-8e65-46fa-9c7f-3145cd4bdd24',
          parentId: 'menu_link_content:f8fb6ce0-d26e-4e8d-9dcf-398f2e8338dd',
          title: 'SB8J',
          url: '/convention/bodies/sb8j',
          position: 40,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:a3b59545-e5d8-447a-bcb0-671d8070b819',
      title: 'Areas of Work',
      url: '/convention/areas-of-work',
      position: 30,
      childrenCount: 4,
      children: [
        {
          branchId: 'menu_link_content:93811092-46c5-40ba-92c4-69b518769fed',
          parentId: 'menu_link_content:a3b59545-e5d8-447a-bcb0-671d8070b819',
          title: 'Programmes of Work ',
          url: '/convention/areas-of-work/programme',
          position: 10,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:fd2030da-2994-4598-b17f-4862011e7812',
          parentId: 'menu_link_content:a3b59545-e5d8-447a-bcb0-671d8070b819',
          title: 'Cross-Cutting Issues ',
          url: '/convention/areas-of-work/issues',
          position: 20,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:3e3ef5c6-fa41-4c51-9b2a-777b93b021e2',
          parentId: 'menu_link_content:a3b59545-e5d8-447a-bcb0-671d8070b819',
          title: 'Mechanisms for  Implementation  ',
          url: '/convention/areas-of-work/implementation',
          position: 40,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:338c49b4-6e44-409c-82aa-6710dc129af1',
          parentId: 'menu_link_content:a3b59545-e5d8-447a-bcb0-671d8070b819',
          title: 'Major Stakeholder Groups ',
          url: '/convention/areas-of-work/major-groups',
          position: 60,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:e3f0d67e-5285-4fcc-87f5-c13cb286b47f',
      title: 'Calendar and Notifications',
      url: '/convention/calendar-notifications-updates',
      position: 40,
      childrenCount: 2,
      children: [
        {
          branchId: 'menu_link_content:1fab4fd8-1c24-463a-92cf-1037a84da749',
          parentId: 'menu_link_content:e3f0d67e-5285-4fcc-87f5-c13cb286b47f',
          title: 'Notifications',
          url: '/notifications',
          position: 0,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:786e33ca-50c6-43dc-bbdd-73a19fcc64e9',
          parentId: 'menu_link_content:e3f0d67e-5285-4fcc-87f5-c13cb286b47f',
          title: 'Meetings',
          url: '/meetings',
          position: 30,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:8a6bfef9-4d6f-4329-b56c-b3f2a01ddf4e',
      title: 'Parties',
      url: '/convention/parties',
      position: 60,
      childrenCount: 4,
      children: [
        {
          branchId: 'menu_link_content:c28f5305-6e12-4ad8-8a5b-988df92ac383',
          parentId: 'menu_link_content:8a6bfef9-4d6f-4329-b56c-b3f2a01ddf4e',
          title: 'List of Parties',
          url: '/convention/parties',
          position: 10,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:bc009cf6-c212-4b4a-a477-4f5082c1aadd',
          parentId: 'menu_link_content:8a6bfef9-4d6f-4329-b56c-b3f2a01ddf4e',
          title: 'National Submissions',
          url: '/convention/parties/national-submissions',
          position: 15,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:5ca76b65-361e-4b41-8d5d-335bf91003db',
          parentId: 'menu_link_content:8a6bfef9-4d6f-4329-b56c-b3f2a01ddf4e',
          title: 'Status of Contribution',
          url: '/convention/parties/status-of-contribution',
          position: 20,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:0475bb5c-2ee5-4250-aafe-471d9233ac32',
          parentId: 'menu_link_content:8a6bfef9-4d6f-4329-b56c-b3f2a01ddf4e',
          title: 'National Focal Points ',
          url: '/convention/parties/focal-points',
          position: 80,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:b17782f0-42d4-45a0-8fa8-06805bab1ed2',
      title: 'Decisions',
      url: '/convention/decisions',
      position: 70,
      childrenCount: 4,
      children: [
        {
          branchId: 'menu_link_content:18e9f5fd-e3df-41e8-b7ca-80d3242f402b',
          parentId: 'menu_link_content:b17782f0-42d4-45a0-8fa8-06805bab1ed2',
          title: 'COP 16 Decisions',
          url: '/convention/decisions/cop/16-decisions',
          position: -68,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:f5bdc5b5-7e13-4dcb-bf27-60037a1da8ab',
          parentId: 'menu_link_content:b17782f0-42d4-45a0-8fa8-06805bab1ed2',
          title: 'COP 15 Decisions',
          url: '/convention/decisions/cop/15-decisions',
          position: -67,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:0165535d-e0ad-4090-80fa-b7436ca671ee',
          parentId: 'menu_link_content:b17782f0-42d4-45a0-8fa8-06805bab1ed2',
          title: 'COP 14 Decisions',
          url: '/convention/decisions/cop/14-decisions',
          position: -66,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:886e8c40-8250-4d7b-b267-523e1a515fc0',
          parentId: 'menu_link_content:b17782f0-42d4-45a0-8fa8-06805bab1ed2',
          title: 'COP 13 Decisions',
          url: '/convention/decisions/cop/13-decisions',
          position: 0,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:e73b1818-dc8a-423f-ba67-16b0147c5433',
      title: 'Resources',
      url: '/convention/resources',
      position: 80,
      childrenCount: 4,
      children: [
        {
          branchId: 'menu_link_content:985b4a21-e662-41a4-978a-ebc513adae13',
          parentId: 'menu_link_content:e73b1818-dc8a-423f-ba67-16b0147c5433',
          title: 'Global Biodiversity Reports',
          url: '/convention/resources/global-biodiversity-outlook',
          position: -75,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:d589b809-6bcd-4c6a-838c-9e1b68ccd8bf',
          parentId: 'menu_link_content:e73b1818-dc8a-423f-ba67-16b0147c5433',
          title: 'CBD Technical Series',
          url: '/convention/resources/cbd-technical-series',
          position: -73,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:1fef34bf-f907-47f4-b73d-bcf89e3b76c5',
          parentId: 'menu_link_content:e73b1818-dc8a-423f-ba67-16b0147c5433',
          title: 'CBD Handbook',
          url: '/convention/resources/CBD-handbook',
          position: -72,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:06b52fba-4ce4-463e-95f5-6809e6c0eabf',
          parentId: 'menu_link_content:e73b1818-dc8a-423f-ba67-16b0147c5433',
          title: 'Clearing-House Mechanism Portal',
          url: 'https://chm.cbd.int/en/',
          position: 50,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:9f6b57d7-2ea6-4baa-9756-3f56c5327f41',
      title: 'Information',
      url: '/convention/information',
      position: 100,
      childrenCount: 4,
      children: [
        {
          branchId: 'menu_link_content:544363e0-4b8a-441f-aedb-7f864e06a37d',
          parentId: 'menu_link_content:9f6b57d7-2ea6-4baa-9756-3f56c5327f41',
          title: 'Terms of Use',
          url: '/convention/information/terms',
          position: 10,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:a6c99c1c-3885-4088-b762-f615b0f4e238',
          parentId: 'menu_link_content:9f6b57d7-2ea6-4baa-9756-3f56c5327f41',
          title: 'Privacy Policy',
          url: '/convention/information/privacy',
          position: 20,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:c7741ae2-e222-4316-9464-4dc1adcd2345',
          parentId: 'menu_link_content:9f6b57d7-2ea6-4baa-9756-3f56c5327f41',
          title: 'Credits',
          url: '/convention/information/credits',
          position: 30,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:8b303edc-293b-4931-8ce9-fa0537afdf42',
          parentId: 'menu_link_content:9f6b57d7-2ea6-4baa-9756-3f56c5327f41',
          title: 'Copyright',
          url: '/convention/information/copyright',
          position: 40,
          childrenCount: 0
        }
      ]
    }
  ],
  'cbd-header-cartagena-protocol': [
    {
      branchId: 'menu_link_content:0de22bb0-857c-4609-b2c5-55f07e049081',
      title: 'About',
      url: '/cartagena/about',
      position: 10,
      childrenCount: 4,
      children: [
        {
          branchId: 'menu_link_content:e151a0c5-0980-4f6d-bba5-a50b3ddef902',
          parentId: 'menu_link_content:0de22bb0-857c-4609-b2c5-55f07e049081',
          title: 'Text of the Cartagena Protocol',
          url: '/cartagena/about/text',
          position: 10,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:a7471dda-6ead-4db2-aacc-0cd67287f84a',
          parentId: 'menu_link_content:0de22bb0-857c-4609-b2c5-55f07e049081',
          title: 'Implementation Plan',
          url: '/cartagena/about/implementation',
          position: 40,
          childrenCount: 6,
          children: [
            {
              branchId: 'menu_link_content:ad594959-5cbc-41f0-99ae-37de3b5868dd',
              parentId: 'menu_link_content:a7471dda-6ead-4db2-aacc-0cd67287f84a',
              title: 'Background',
              url: '/cartagena/about/implementation/background',
              position: 10,
              childrenCount: 2,
              children: [
                {
                  branchId: 'menu_link_content:d0ad4bf9-a6c5-4718-9246-b23b44d04cc1',
                  parentId: 'menu_link_content:ad594959-5cbc-41f0-99ae-37de3b5868dd',
                  title: 'Peer Review',
                  url: '/cartagena/about/implementation/background/peer-review',
                  position: 10,
                  childrenCount: 0
                },
                {
                  branchId: 'menu_link_content:4fa8d1d1-c866-4ed6-924a-4ad207486764',
                  parentId: 'menu_link_content:ad594959-5cbc-41f0-99ae-37de3b5868dd',
                  title: 'Submissions',
                  url: '/cartagena/about/implementation/background/submissions',
                  position: 20,
                  childrenCount: 0
                }
              ]
            },
            {
              branchId: 'menu_link_content:3d746abe-d85d-475c-bada-d1df9e6f68a2',
              parentId: 'menu_link_content:a7471dda-6ead-4db2-aacc-0cd67287f84a',
              title: 'Adopted text',
              url: '/cartagena/about/implementation/adopted-text',
              position: 20,
              childrenCount: 0
            },
            {
              branchId: 'menu_link_content:926d8948-dabf-499f-9b25-1929b65c1466',
              parentId: 'menu_link_content:a7471dda-6ead-4db2-aacc-0cd67287f84a',
              title: 'Strategic Plan 2011-2020',
              url: '/cartagena/about/implementation/plan',
              position: 30,
              childrenCount: 0
            },
            {
              branchId: 'menu_link_content:9631370b-ad1b-4270-97d1-54bc6ad163a2',
              parentId: 'menu_link_content:a7471dda-6ead-4db2-aacc-0cd67287f84a',
              title: 'Strategic Plan- Adopted Text',
              url: '/cartagena/about/implementation/plan-adopted-text',
              position: 50,
              childrenCount: 0
            },
            {
              branchId: 'menu_link_content:d5990616-cc51-4604-8ad7-72ff55487b7d',
              parentId: 'menu_link_content:a7471dda-6ead-4db2-aacc-0cd67287f84a',
              title: 'Relevant Documents',
              url: '/cartagena/about/implementation/relevant-documents',
              position: 60,
              childrenCount: 0
            },
            {
              branchId: 'menu_link_content:97dcc97a-7f74-4f91-90ae-0f2ad377dbc5',
              parentId: 'menu_link_content:a7471dda-6ead-4db2-aacc-0cd67287f84a',
              title: 'Discussion Forum',
              url: '/cartagena/about/implementation/discussion-forum',
              position: 70,
              childrenCount: 0
            }
          ]
        },
        {
          branchId: 'menu_link_content:91fcb216-3304-4269-bad9-a25ebc932d5c',
          parentId: 'menu_link_content:0de22bb0-857c-4609-b2c5-55f07e049081',
          title: 'Linkage with the GBF',
          url: '/cartagena/about/linkage-with-the-gbf',
          position: 60,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:9eb8218f-e3a3-47e7-83c0-92de57188e75',
          parentId: 'menu_link_content:0de22bb0-857c-4609-b2c5-55f07e049081',
          title: 'Liaison Group on the Cartagena Protocol',
          url: '/cartagena/about/liaison-group',
          position: 70,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:9bd04148-0175-4222-8790-526756a065da',
      title: 'Governance',
      url: '/cartagena/governance',
      position: 20,
      childrenCount: 6,
      children: [
        {
          branchId: 'menu_link_content:9195ae2b-ba98-4029-80c0-38be63a20a63',
          parentId: 'menu_link_content:9bd04148-0175-4222-8790-526756a065da',
          title: 'COP-MOP Meetings',
          url: '/cartagena/governance/cop-mop-meetings',
          position: 10,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:cade80de-0809-4ceb-88e3-3e944b634c86',
          parentId: 'menu_link_content:9bd04148-0175-4222-8790-526756a065da',
          title: 'COP-MOP Decisions',
          url: '/cartagena/governance/decisions',
          position: 20,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:7be92128-2c6e-4fb1-aafc-2a045ebb779b',
          parentId: 'menu_link_content:9bd04148-0175-4222-8790-526756a065da',
          title: 'COP-MOP Bureau',
          url: '/cartagena/governance/cop-mop-bureau',
          position: 30,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:e19882c3-6048-48c1-88db-90382cce01d4',
          parentId: 'menu_link_content:9bd04148-0175-4222-8790-526756a065da',
          title: 'Compliance Committee ',
          url: '/cartagena/governance/compliance-committee',
          position: 40,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:01478453-4511-4e54-aae5-9f74aa16062c',
          parentId: 'menu_link_content:9bd04148-0175-4222-8790-526756a065da',
          title: 'SBI',
          url: '/cartagena/governance/sbi',
          position: 60,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:60dfdfec-542d-449e-bda0-5480022ace77',
          parentId: 'menu_link_content:9bd04148-0175-4222-8790-526756a065da',
          title: 'SBSTTA ',
          url: '/cartagena/governance/sbstta',
          position: 70,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:a6ccf8f6-f091-42e2-b0a9-e0dac1929dec',
      title: 'Calendar and Notifications',
      url: '/cartagena/updates/calendar-of-meetings',
      position: 40,
      childrenCount: 2,
      children: [
        {
          branchId: 'menu_link_content:04693120-5101-47bc-9c45-f2eb78ca1eb7',
          parentId: 'menu_link_content:a6ccf8f6-f091-42e2-b0a9-e0dac1929dec',
          title: 'Meetings',
          url: '/meetings',
          position: 20,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:73e20e91-fdb9-49a7-b4d5-d0b92bdb357c',
          parentId: 'menu_link_content:a6ccf8f6-f091-42e2-b0a9-e0dac1929dec',
          title: 'Notifications',
          url: '/notifications',
          position: 20,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:cc944e4f-1cf6-4ffe-89e6-c4181149cdec',
      title: 'Parties',
      url: '/cartagena/parties',
      position: 50,
      childrenCount: 4,
      children: [
        {
          branchId: 'menu_link_content:18ce5883-1b2c-4178-8317-3da836c395b7',
          parentId: 'menu_link_content:cc944e4f-1cf6-4ffe-89e6-c4181149cdec',
          title: 'List of Parties',
          url: '/cartagena/parties/list-of-parties',
          position: -50,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:2c1ad89d-4818-4bf9-b7c2-e6fdf50de864',
          parentId: 'menu_link_content:cc944e4f-1cf6-4ffe-89e6-c4181149cdec',
          title: 'Becoming a Party',
          url: '/cartagena/parties/becoming-a-party',
          position: -49,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:284dc408-43c9-4b90-a680-6451911c89bb',
          parentId: 'menu_link_content:cc944e4f-1cf6-4ffe-89e6-c4181149cdec',
          title: 'National Contacts',
          url: '/cartagena/parties/national-contacts',
          position: 0,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:707be7c9-1279-4a49-9982-231a8491292b',
          parentId: 'menu_link_content:cc944e4f-1cf6-4ffe-89e6-c4181149cdec',
          title: 'Status of Contributions',
          url: '/cartagena/parties/status-of-contributions',
          position: 0,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:6cd4d935-8b7c-47b3-8d45-022ca96ba517',
      title: 'Key Protocol Issues',
      url: '/cartagena/key-issues',
      position: 60,
      childrenCount: 14,
      children: [
        {
          branchId: 'menu_link_content:872cf7ab-999b-4cf3-b6f3-d7e90e3d75f6',
          parentId: 'menu_link_content:6cd4d935-8b7c-47b3-8d45-022ca96ba517',
          title: 'Assessment and Review',
          url: '/cartagena/key-issues/assessment-and-review',
          position: -57,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:82da97c9-e4f4-4830-bb2b-d98a24bd233e',
          parentId: 'menu_link_content:6cd4d935-8b7c-47b3-8d45-022ca96ba517',
          title: 'Capacity Building',
          url: '/cartagena/key-issues/capacity-building',
          position: -56,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:a9e2cf0b-1518-4f05-bcda-7be2a1789c9d',
          parentId: 'menu_link_content:6cd4d935-8b7c-47b3-8d45-022ca96ba517',
          title: 'Compliance',
          url: '/cartagena/key-issues/compliance',
          position: -55,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:3c34b89c-b83f-4e62-b078-663c1620fbcc',
          parentId: 'menu_link_content:6cd4d935-8b7c-47b3-8d45-022ca96ba517',
          title: 'Financial Mechanism',
          url: '/cartagena/key-issues/financial-mechanism',
          position: -54,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:1a87b660-ac58-4572-ba83-871cd7b23f9c',
          parentId: 'menu_link_content:6cd4d935-8b7c-47b3-8d45-022ca96ba517',
          title: 'Mainstreaming ',
          url: '/cartagena/key-issues/mainstreaming-',
          position: -53,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:b828d6ad-a8fe-4461-b794-7079e8519cca',
          parentId: 'menu_link_content:6cd4d935-8b7c-47b3-8d45-022ca96ba517',
          title: 'Handling, Transport, Packaging and Identification',
          url: '/cartagena/key-issues/handling-transport-packaging-and-identification',
          position: -52,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:37310882-1a8c-4178-b2fa-ec6d2392347e',
          parentId: 'menu_link_content:6cd4d935-8b7c-47b3-8d45-022ca96ba517',
          title: 'Information sharing',
          url: '/cartagena/key-issues/information-sharing',
          position: -51,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:c7e87d63-f556-4d1d-915d-ac76c20c3e8e',
          parentId: 'menu_link_content:6cd4d935-8b7c-47b3-8d45-022ca96ba517',
          title: 'Monitoring and Reporting',
          url: '/cartagena/key-issues/monitoring-and-reporting',
          position: -50,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:74a3d59e-e92a-44ca-990b-270e34ae964b',
          parentId: 'menu_link_content:6cd4d935-8b7c-47b3-8d45-022ca96ba517',
          title: 'Public Awareness and Participation',
          url: '/cartagena/key-issues/awareness-and-participation',
          position: -49,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:fa3f456a-7ef9-49a4-9ae1-563b1c6950b3',
          parentId: 'menu_link_content:6cd4d935-8b7c-47b3-8d45-022ca96ba517',
          title: 'Risk Assessment',
          url: '/cartagena/key-issues/risk-assessment',
          position: -48,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:3d92a267-5cfa-41d2-8ddc-20fb67ddcb97',
          parentId: 'menu_link_content:6cd4d935-8b7c-47b3-8d45-022ca96ba517',
          title: 'Risk Management',
          url: '/cartagena/key-issues/risk-management',
          position: -47,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:9850637e-1c0b-4cf9-9b3a-417071837a87',
          parentId: 'menu_link_content:6cd4d935-8b7c-47b3-8d45-022ca96ba517',
          title: 'Socio-economic Considerations',
          url: '/cartagena/key-issues/socio-economic-considerations',
          position: -45,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:e4422754-2809-4100-bb8d-81b3fb8e22af',
          parentId: 'menu_link_content:6cd4d935-8b7c-47b3-8d45-022ca96ba517',
          title: 'Transit and Contained Use',
          url: '/cartagena/key-issues/transit-and-contained-use',
          position: -44,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:43c9a2a0-a7a3-44b5-bb27-1bf404583ba6',
          parentId: 'menu_link_content:6cd4d935-8b7c-47b3-8d45-022ca96ba517',
          title: 'Unintentional Transboundary Movements',
          url: '/cartagena/key-issues/unintentional-transboundary-movements',
          position: -43,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:998b6910-bba7-4d88-a95e-0dda76b69c79',
      title: 'The Nagoya-Kuala Lumpur Supplementary Protocol',
      url: '/cartagena/supplementary-protocol',
      position: 130,
      childrenCount: 8,
      children: [
        {
          branchId: 'menu_link_content:dc762c6f-068a-4261-b297-e6d8d5296fb8',
          parentId: 'menu_link_content:998b6910-bba7-4d88-a95e-0dda76b69c79',
          title: 'About the Supplementary Protocol',
          url: '/cartagena/supplementary-protocol/about',
          position: -50,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:21009b6b-0188-49f9-8a53-18b7d64d5020',
          parentId: 'menu_link_content:998b6910-bba7-4d88-a95e-0dda76b69c79',
          title: 'What has been done',
          url: '/cartagena/supplementary-protocol/what-has-been-done',
          position: -49,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:fcc3e4b8-0a80-4102-aa0a-b341b7f86a2f',
          parentId: 'menu_link_content:998b6910-bba7-4d88-a95e-0dda76b69c79',
          title: 'Text of the Nagoya–Kuala Lumpur Supplementary Protocol',
          url: '/cartagena/supplementary-protocol/text',
          position: -48,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:5abc8449-9477-46aa-916c-a253024a91a7',
          parentId: 'menu_link_content:998b6910-bba7-4d88-a95e-0dda76b69c79',
          title: 'Status of the Supplementary Protocol',
          url: '/cartagena/supplementary-protocol/status-of-the-supplementary-protocol',
          position: -47,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:44e2031d-053e-40ce-870d-b3d9edde84c9',
          parentId: 'menu_link_content:998b6910-bba7-4d88-a95e-0dda76b69c79',
          title: 'Becoming a Party',
          url: '/cartagena/supplementary-protocol/becoming-a-party',
          position: -46,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:bf620118-459b-4773-986f-064e627132a0',
          parentId: 'menu_link_content:998b6910-bba7-4d88-a95e-0dda76b69c79',
          title: 'Decisions',
          url: '/cartagena/supplementary-protocol/decisions',
          position: 0,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:7456696b-247b-489a-af8b-23008b048816',
          parentId: 'menu_link_content:998b6910-bba7-4d88-a95e-0dda76b69c79',
          title: 'Relevant documents',
          url: '/cartagena/supplementary-protocol/meetings-and-documents',
          position: 0,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:b20cc1c0-7cf4-4aec-bb6a-3be14d002c4c',
          parentId: 'menu_link_content:998b6910-bba7-4d88-a95e-0dda76b69c79',
          title: 'Resources',
          url: '/cartagena/supplementary-protocol/resources',
          position: 0,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:8a0e277e-84ff-465f-a27f-ab47b21db2d8',
      title: 'Resources',
      url: '/cartagena/resources',
      position: 140,
      childrenCount: 7,
      children: [
        {
          branchId: 'menu_link_content:d58fb41b-2bdb-46c9-a895-27e447510032',
          parentId: 'menu_link_content:8a0e277e-84ff-465f-a27f-ab47b21db2d8',
          title: 'Biosafety Clearing-House',
          url: 'https://bch.cbd.int/en/',
          position: -80,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:ac98b981-8ef5-410a-951b-6dd99e54e971',
          parentId: 'menu_link_content:8a0e277e-84ff-465f-a27f-ab47b21db2d8',
          title: 'Booklets : Protocols and Decisions ',
          url: '/cartagena/resources/bookets-protocols-decisions',
          position: -70,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:20a834e2-6cbb-4c4b-a983-c5c06b8ee2f0',
          parentId: 'menu_link_content:8a0e277e-84ff-465f-a27f-ab47b21db2d8',
          title: 'Biosafety Technical Series',
          url: '/cartagena/resources/technical-series',
          position: -69,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:b68053c6-8e02-4680-85f3-28956db6eec9',
          parentId: 'menu_link_content:8a0e277e-84ff-465f-a27f-ab47b21db2d8',
          title: 'E-Learning Courses',
          url: '/cartagena/resources/e-learning',
          position: -68,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:cdb0dab6-f6f7-4d59-ba30-fc4c3ebf028a',
          parentId: 'menu_link_content:8a0e277e-84ff-465f-a27f-ab47b21db2d8',
          title: 'Frequently Asked Questions (FAQs) ',
          url: '/cartagena/resources/faq',
          position: -67,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:5eab8345-e141-40c2-8095-ad98cdcdc8d5',
          parentId: 'menu_link_content:8a0e277e-84ff-465f-a27f-ab47b21db2d8',
          title: 'Roster of Experts',
          url: '/cartagena/resources/roster-of-experts',
          position: -66,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:adf235a2-d9ad-4e7a-af88-591ac09fcfce',
          parentId: 'menu_link_content:8a0e277e-84ff-465f-a27f-ab47b21db2d8',
          title: 'Other Resources ',
          url: '/cartagena/resources/other-resources',
          position: -62,
          childrenCount: 0
        }
      ]
    }
  ],
  'cbd-header-nagoya-protocol': [
    {
      branchId: 'menu_link_content:09e38c62-de3b-4241-8b02-91f45a754b13',
      title: 'About',
      url: '/nagoya/about',
      position: 10,
      childrenCount: 4,
      children: [
        {
          branchId: 'menu_link_content:8a140a2b-1ac3-4902-9087-7840ad5d4c81',
          parentId: 'menu_link_content:09e38c62-de3b-4241-8b02-91f45a754b13',
          title: 'ABS under the GBF',
          url: '/nagoya/about/abs-under-the-gbf',
          position: -50,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:abb313e7-8d8f-4cec-9557-d98d85adbeba',
          parentId: 'menu_link_content:09e38c62-de3b-4241-8b02-91f45a754b13',
          title: 'Nagoya Protocol Text',
          url: '/nagoya/about/text',
          position: -49,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:741f7846-a507-4408-8da9-022f7e27266b',
          parentId: 'menu_link_content:09e38c62-de3b-4241-8b02-91f45a754b13',
          title: 'History',
          url: '/nagoya/about/history',
          position: -48,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:dd2f2c88-31cd-482a-b6a2-dca7abe1c029',
          parentId: 'menu_link_content:09e38c62-de3b-4241-8b02-91f45a754b13',
          title: '10th-anniversary of the Protocol',
          url: '/nagoya/about/Tenth-anniversary',
          position: 40,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:d043f685-0940-4776-992c-dfd4b489c941',
      title: 'Governance',
      url: '/nagoya/governance',
      position: 20,
      childrenCount: 5,
      children: [
        {
          branchId: 'menu_link_content:29fd1e9e-7de5-4ddb-ab53-44fb1cac4ddc',
          parentId: 'menu_link_content:d043f685-0940-4776-992c-dfd4b489c941',
          title: 'COP-MOP Meetings ',
          url: '/nagoya/governance/cop-mop-decisions',
          position: 10,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:4a74775e-cb9a-442f-8259-d98a18317a1b',
          parentId: 'menu_link_content:d043f685-0940-4776-992c-dfd4b489c941',
          title: 'COP-MOP Decisions ',
          url: '/nagoya/governance/decisions',
          position: 20,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:1128fb35-7b03-471f-b384-339432d15e49',
          parentId: 'menu_link_content:d043f685-0940-4776-992c-dfd4b489c941',
          title: 'COP-MOP Bureau',
          url: '/nagoya/governance/cop-mop-bureau',
          position: 30,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:f502d540-69ec-45dd-9eff-40b2219fa7de',
          parentId: 'menu_link_content:d043f685-0940-4776-992c-dfd4b489c941',
          title: 'SBI',
          url: '/nagoya/governance/sbi',
          position: 50,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:b24a6d6c-972f-41dc-9114-5aae2967bf2a',
          parentId: 'menu_link_content:d043f685-0940-4776-992c-dfd4b489c941',
          title: 'SBSTTA  ',
          url: '/nagoya/governance/sbstta',
          position: 60,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:aca0474d-5d87-42af-a15f-d17a9fdf9d22',
      title: 'Calendar and Notifications',
      url: '/nagoya/calendar-notifications',
      position: 25,
      childrenCount: 2,
      children: [
        {
          branchId: 'menu_link_content:416d2619-77d3-41ed-b8ce-4418ddf0e187',
          parentId: 'menu_link_content:aca0474d-5d87-42af-a15f-d17a9fdf9d22',
          title: 'Notifications',
          url: '/nagoya/calendar-notifications/notifications',
          position: 20,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:10314195-011c-4b96-9dd5-f9bf03589adb',
          parentId: 'menu_link_content:aca0474d-5d87-42af-a15f-d17a9fdf9d22',
          title: 'Meetings',
          url: '/nagoya/calendar-notifications/meetings',
          position: 30,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:155e85cc-1a0a-422f-aaa3-d416f0492cf2',
      title: 'Parties',
      url: '/nagoya/parties',
      position: 30,
      childrenCount: 6,
      children: [
        {
          branchId: 'menu_link_content:b7ae0a9d-1953-4a04-88f5-b93c2ff25c49',
          parentId: 'menu_link_content:155e85cc-1a0a-422f-aaa3-d416f0492cf2',
          title: 'Becoming a Party',
          url: '/nagoya/parties/becoming-a-party',
          position: -50,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:287f345a-9702-41b9-8e1f-73a8e3f2fa37',
          parentId: 'menu_link_content:155e85cc-1a0a-422f-aaa3-d416f0492cf2',
          title: 'List of Parties',
          url: '/nagoya/parties/list-of-parties',
          position: -49,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:41897cf3-c0b6-41b1-907a-2de343cf1c0e',
          parentId: 'menu_link_content:155e85cc-1a0a-422f-aaa3-d416f0492cf2',
          title: 'Country Profiles',
          url: '/nagoya/parties/country-profiles',
          position: -48,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:716bbf49-49dd-4ea4-b0fa-9c7eafabbc32',
          parentId: 'menu_link_content:155e85cc-1a0a-422f-aaa3-d416f0492cf2',
          title: 'Key Steps towards implementation',
          url: '/nagoya/parties/key-steps-towards-implementation',
          position: 0,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:03fd4142-20fa-4ae5-b6f9-4b6b99efff04',
          parentId: 'menu_link_content:155e85cc-1a0a-422f-aaa3-d416f0492cf2',
          title: 'National Contacts',
          url: '/nagoya/parties/contacts',
          position: 0,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:419628a0-3079-4b1d-a2c1-41b60600734a',
          parentId: 'menu_link_content:155e85cc-1a0a-422f-aaa3-d416f0492cf2',
          title: 'Report Analyzer ',
          url: '/nagoya/parties/reports-analyzer',
          position: 0,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:86858e7a-8990-4df2-bd4b-b294f40990fb',
      title: 'Key Protocol Issues',
      url: '/nagoya/key-protocol-issues',
      position: 50,
      childrenCount: 14,
      children: [
        {
          branchId: 'menu_link_content:36a840dd-76f7-4028-805e-c0dc691316a9',
          parentId: 'menu_link_content:86858e7a-8990-4df2-bd4b-b294f40990fb',
          title: 'ABS Clearing-House and information-sharing',
          url: '/nagoya/key-protocol-issues/absch',
          position: -70,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:a9d0d7b1-cf69-4d15-98ac-a1572540ffdc',
          parentId: 'menu_link_content:86858e7a-8990-4df2-bd4b-b294f40990fb',
          title: 'Assessment and Review',
          url: '/nagoya/key-protocol-issues/assessment-and-review',
          position: -50,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:09fbe79c-f1a1-4491-99a9-c1365ac6e9ea',
          parentId: 'menu_link_content:86858e7a-8990-4df2-bd4b-b294f40990fb',
          title: 'Awareness Raising',
          url: '/nagoya/key-protocol-issues/awareness-raising',
          position: -49,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:519cee63-91ab-4d5c-9fc2-c8d8aa7cddee',
          parentId: 'menu_link_content:86858e7a-8990-4df2-bd4b-b294f40990fb',
          title: 'Capacity Building and Development',
          url: '/nagoya/key-protocol-issues/capacity-building-and-development',
          position: -48,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:d4a7b741-fad4-4d04-b315-a732bc59ea2a',
          parentId: 'menu_link_content:86858e7a-8990-4df2-bd4b-b294f40990fb',
          title: 'Compliance with the Protocol',
          url: '/nagoya/key-protocol-issues/compliance',
          position: -47,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:7518933b-c244-4a73-ba6e-46a49ca9c8a6',
          parentId: 'menu_link_content:86858e7a-8990-4df2-bd4b-b294f40990fb',
          title: 'Cooperation and Partnerships',
          url: '/nagoya/key-protocol-issues/cooperation',
          position: -46,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:78c68823-c4f2-4f00-a6f4-a7c0e42d236e',
          parentId: 'menu_link_content:86858e7a-8990-4df2-bd4b-b294f40990fb',
          title: 'Digital Sequence Information on Genetic Resources',
          url: '/nagoya/key-protocol-issues/digital-sequence-information-on-genetic-resources',
          position: -45,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:34fb5519-76cf-4998-a227-1de4b0001f81',
          parentId: 'menu_link_content:86858e7a-8990-4df2-bd4b-b294f40990fb',
          title: 'Financial Mechanism',
          url: '/nagoya/key-protocol-issues/financial-mechanism',
          position: -42,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:61701cb7-fd9c-4e69-ab9c-07ff7221866c',
          parentId: 'menu_link_content:86858e7a-8990-4df2-bd4b-b294f40990fb',
          title: 'Global Multilateral Benefit-Sharing Mechanism',
          url: '/nagoya/key-protocol-issues/multilateral-mechanism',
          position: -41,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:f1bb9f3e-ac75-4d75-a1af-c0c36b3363a1',
          parentId: 'menu_link_content:86858e7a-8990-4df2-bd4b-b294f40990fb',
          title: 'Model Contractual Clauses',
          url: '/nagoya/key-protocol-issues/model-contractual-clauses',
          position: -40,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:5d9b7684-3762-43f4-a31d-39d13e547e8c',
          parentId: 'menu_link_content:86858e7a-8990-4df2-bd4b-b294f40990fb',
          title: 'Monitoring and Reporting',
          url: '/nagoya/key-protocol-issues/monitoring-and-reporting',
          position: -39,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:4da47e99-683c-40f0-b30b-00d42334c3e0',
          parentId: 'menu_link_content:86858e7a-8990-4df2-bd4b-b294f40990fb',
          title: 'Resource Mobilization',
          url: '/nagoya/key-protocol-issues/resource-mobilization',
          position: -38,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:8b65084f-0b32-424e-954d-fd0f78a86926',
          parentId: 'menu_link_content:86858e7a-8990-4df2-bd4b-b294f40990fb',
          title: 'Specialized International ABS Instruments',
          url: '/nagoya/key-protocol-issues/specialized-instruments',
          position: -37,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:cfb9baed-745a-4378-8f20-e3c93f56e0c3',
          parentId: 'menu_link_content:86858e7a-8990-4df2-bd4b-b294f40990fb',
          title: 'Specialized International ABS instruments - Relevant Documents',
          url: '/nagoya/key-protocol-issues/specialized-international-abs-instruments-relevant-documents',
          position: -36,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:629335b9-df25-4a80-acea-fee4d154f595',
      title: 'Resources',
      url: '/nagoya/resources',
      position: 70,
      childrenCount: 7,
      children: [
        {
          branchId: 'menu_link_content:261615ac-9611-4348-a957-5408e0fb0b36',
          parentId: 'menu_link_content:629335b9-df25-4a80-acea-fee4d154f595',
          title: 'ABS Clearing-House',
          url: '/nagoya/resources/abs-clearing-house',
          position: -49,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:ecee3c61-97ce-426d-822e-2ab576ecff16',
          parentId: 'menu_link_content:629335b9-df25-4a80-acea-fee4d154f595',
          title: 'Awareness Raising Material',
          url: '/nagoya/resources/awareness-raising-material',
          position: -48,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:8ac4ac29-5980-460c-b773-a85ff06501ec',
          parentId: 'menu_link_content:629335b9-df25-4a80-acea-fee4d154f595',
          title: 'Bonn Guidelines',
          url: '/nagoya/resources/bonn-guidelines',
          position: -47,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:e9f83c66-5ae9-43e9-a84b-3e29de543f96',
          parentId: 'menu_link_content:629335b9-df25-4a80-acea-fee4d154f595',
          title: 'E-Learning Courses',
          url: '/nagoya/resources/e-learning-courses',
          position: -46,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:b31e15a6-c19b-45cd-af0d-5405eff308bc',
          parentId: 'menu_link_content:629335b9-df25-4a80-acea-fee4d154f595',
          title: 'Factsheets and Briefs',
          url: '/nagoya/resources/factsheets-and-briefs',
          position: -45,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:8481f625-6874-45f9-bb13-e5a76258e1d6',
          parentId: 'menu_link_content:629335b9-df25-4a80-acea-fee4d154f595',
          title: 'Protocol and Decision Booklets',
          url: '/nagoya/resources/protocol-and-decision-booklets',
          position: -44,
          childrenCount: 0
        },
        {
          branchId: 'menu_link_content:623ed208-a380-4197-8a14-516864537a44',
          parentId: 'menu_link_content:629335b9-df25-4a80-acea-fee4d154f595',
          title: 'Videos',
          url: '/nagoya/resources/videos',
          position: 0,
          childrenCount: 0
        }
      ]
    }
  ],
  'cbd-header-countries': [
    {
      branchId: 'menu_link_content:fc1cfafc-a516-401a-b54d-68737cf18b18',
      title: 'Country Profiles',
      url: '/country/profiles',
      position: 10,
      childrenCount: 1,
      children: [
        {
          branchId: 'menu_link_content:fe27d4e4-194d-4039-85b1-ca10e75fd17b',
          parentId: 'menu_link_content:fc1cfafc-a516-401a-b54d-68737cf18b18',
          title: 'Country List',
          url: '/country/profiles/list',
          position: 10,
          childrenCount: 0
        }
      ]
    },
    {
      branchId: 'menu_link_content:5c9924c4-09e2-45f2-84ad-ca4de3185319',
      title: 'National Focal Points ',
      url: '/convention/parties/focal-points',
      position: 30,
      childrenCount: 0
    },
    {
      branchId: 'menu_link_content:7bf93940-d5f6-4dea-bcf6-581ca0b1e36c',
      title: 'National Submissions',
      url: '/convention/parties/national-submissions',
      position: 30,
      childrenCount: 0
    }
  ]
}
