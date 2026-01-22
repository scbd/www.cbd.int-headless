<template>
  <main
    class="cus-main cus-internal-page d-flex flex-column"
    role="main"
  >
    <div class="main-wrapper">
      <div class="protocol-subnavigation accent-cbd">
        <nav class="navbar container-xxl">
          <ul class="nav">
            <div class="subnav-header">
              <li class="nav-item">
                <button
                  class="btn cbd-btn-subnavigation"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSubnav"
                  aria-expanded="true"
                  aria-controls="collapseSubnav"
                >
                  <!-- TODO this was copied directly from www-nuxt.cbddev.xyz's dom: there must be a component to refer to instead -->
                  <svg
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.92 0.180054H6.68999H1.07999C0.119992 0.180054 -0.360007 1.34005 0.319993 2.02005L5.49999 7.20005C6.32999 8.03005 7.67999 8.03005 8.50999 7.20005L10.48 5.23005L13.69 2.02005C14.36 1.34005 13.88 0.180054 12.92 0.180054Z"
                    >
                    </path>
                  </svg>
                </button>
              </li>
            </div>
            <navigation-mega-menu-list
              :menu="menuTree"
              :url="page.alias"
              class="level-2-items"
              id="collapseSubnav"
            />
            <div class="subnav-level-3-items nav">
              <navigation-mega-menu-list-item
                :menu="rootMenu"
                :url="page.alias"
              />
            </div>
          </ul>
        </nav>
      </div>

      <div class="container-xxl d-flex">
        <navigation-submenu-vertical
          v-if="verticalMenu"
          :menu="verticalMenu"
          :url="page.alias"
        />
        <article class="cus-article container-fluid d-flex flex-column">
          <navigation-breadcrumbs
            v-if="breadcrumbMenu"
            :items="breadcrumbMenu"
            :url="page.alias"
          />
          <section
            v-dompurify-html="page.body"
            class="rendered-content"
          ></section>
        </article>
      </div>
    </div>
  </main>
</template>

<script
  setup
  lang="ts"
>
import type { Menu } from '~~/types/menu'
import useContentApi from '~~/app/composables/api/use-content-api'
import useMenuApi from '~/composables/api/use-menu-api'

const route = useRoute()
const { getPage } = useContentApi()
const { getMenu } = useMenuApi()

const page = await getPage(route.path) as any // TODO why is .value required here?
// TODO for testing
// const page = computed(() => ({
//   alias: '/convention/areas-of-work/programme/forest/programme',
//   body: "ASDF"
// }))
// console.log('pages [...alias].vue', { page })

// The logic below should be probably be moved to a utility and middleware
// @ts-ignore
const menu = await getMenu(page.value.menu, {
  // @ts-ignore
  url: page.value.alias,
  depth: 1
})

const buildPath = (item: any, url: string): any => {
  // console.log('buildPath', { item, src: url })
  if (!item) return []

  return [
    { title: item.title, url: item.url },
    ...buildPath(item.children?.find((i: Menu) => i.url && url.startsWith(i.url)), url)
  ]
}

console.log('app.pages', { menu, page })

// since we're pulling at a specific branch there's only one root menu item
const menuTree = computed(() => menu);

// TODO for testing with all top-level children
// const menuTree = computed(() => [
//   {
//     "branchId": "menu_link_content:c02c814d-2e5c-43c8-ab5e-78acc8f5be40",
//     "title": "About",
//     "url": "/convention/about",
//     "position": -50,
//     "childrenCount": 7
//   },
//   {
//     "branchId": "menu_link_content:3ee6668c-3c1b-4882-8d32-df432b60f707",
//     "title": "Convention Bodies",
//     "url": "/convention/bodies",
//     "position": -49,
//     "childrenCount": 4
//   },
//   {
//     "branchId": "menu_link_content:0937ae15-e663-4afc-8853-e7b93f821fd6",
//     "parentId": null,
//     "title": "Areas of Work",
//     "url": "/convention/areas-of-work",
//     "position": -48,
//     "childrenCount": 4,
//     "children": [
//       {
//         "branchId": "menu_link_content:5691c79e-d33e-4535-9331-2c92db678883",
//         "parentId": "menu_link_content:0937ae15-e663-4afc-8853-e7b93f821fd6",
//         "title": "Programme of  Work",
//         "url": "/convention/areas-of-work/programme",
//         "position": 10,
//         "childrenCount": 6,
//         "children": [
//           {
//             "branchId": "menu_link_content:cdeac9b6-a8e3-4e4f-a0ee-1beb32e5cb34",
//             "parentId": "menu_link_content:5691c79e-d33e-4535-9331-2c92db678883",
//             "title": "Agriculture Biodiversity",
//             "url": "/convention/areas-of-work/programme/agriculture",
//             "position": 10,
//             "childrenCount": 2
//           },
//           {
//             "branchId": "menu_link_content:db79aa56-53ad-4836-afd4-f197bdd75b1c",
//             "parentId": "menu_link_content:5691c79e-d33e-4535-9331-2c92db678883",
//             "title": "Dry and Sub-humid Lands Biodiversity",
//             "url": "/convention/areas-of-work/programme/dry-and-sub-humid-lands",
//             "position": 15,
//             "childrenCount": 4
//           },
//           {
//             "branchId": "menu_link_content:25a7be8d-fcac-434e-99ed-6a227a99b3e2",
//             "parentId": "menu_link_content:5691c79e-d33e-4535-9331-2c92db678883",
//             "title": "Forest Biodiversity",
//             "url": "/convention/areas-of-work/programme/forest",
//             "position": 20,
//             "childrenCount": 3,
//             "children": [
//               {
//                 "branchId": "menu_link_content:98099e63-de6f-442b-90da-32e5a6fb0027",
//                 "parentId": "menu_link_content:25a7be8d-fcac-434e-99ed-6a227a99b3e2",
//                 "title": "About",
//                 "url": "/convention/areas-of-work/programme/forest/about",
//                 "position": 10,
//                 "childrenCount": 4
//               },
//               {
//                 "branchId": "menu_link_content:d3ab291a-a3a0-431e-a715-f37b43e05496",
//                 "parentId": "menu_link_content:25a7be8d-fcac-434e-99ed-6a227a99b3e2",
//                 "title": "Programme",
//                 "url": "/convention/areas-of-work/programme/forest/programme",
//                 "position": 20,
//                 "childrenCount": 5,
//                 "children": [
//                   {
//                     "branchId": "menu_link_content:be153157-febc-4af6-a762-bd2ac16be452",
//                     "parentId": "menu_link_content:d3ab291a-a3a0-431e-a715-f37b43e05496",
//                     "title": "Background",
//                     "url": "/convention/areas-of-work/programme/forest/programme/background",
//                     "position": 10,
//                     "childrenCount": 0
//                   },
//                   {
//                     "branchId": "menu_link_content:7596ba46-a623-43aa-9958-37a697499ee1",
//                     "parentId": "menu_link_content:d3ab291a-a3a0-431e-a715-f37b43e05496",
//                     "title": "Decisions",
//                     "url": "/convention/areas-of-work/programme/forest/programme/decisions",
//                     "position": 20,
//                     "childrenCount": 0
//                   },
//                   {
//                     "branchId": "menu_link_content:39e69d2f-1b8f-4e90-ae3d-c69dc360d3b3",
//                     "parentId": "menu_link_content:d3ab291a-a3a0-431e-a715-f37b43e05496",
//                     "title": "Programme of Work",
//                     "url": "/convention/areas-of-work/programme/forest/programme/programme-of-work",
//                     "position": 30,
//                     "childrenCount": 0
//                   },
//                   {
//                     "branchId": "menu_link_content:8cc41add-39f2-4cc3-bcb5-8aec695a00dc",
//                     "parentId": "menu_link_content:d3ab291a-a3a0-431e-a715-f37b43e05496",
//                     "title": "Strategic review",
//                     "url": "/convention/areas-of-work/programme/forest/programme/strategic-review",
//                     "position": 50,
//                     "childrenCount": 0
//                   },
//                   {
//                     "branchId": "menu_link_content:cb602e6d-fc9b-4744-bbe2-58d1a15d6567",
//                     "parentId": "menu_link_content:d3ab291a-a3a0-431e-a715-f37b43e05496",
//                     "title": "Implementation",
//                     "url": "/convention/areas-of-work/programme/forest/implementation",
//                     "position": 70,
//                     "childrenCount": 2
//                   }
//                 ]
//               },
//               {
//                 "branchId": "menu_link_content:a90b9110-69bb-4992-bb66-088cafc24d58",
//                 "parentId": "menu_link_content:25a7be8d-fcac-434e-99ed-6a227a99b3e2",
//                 "title": "Related Information",
//                 "url": "/convention/areas-of-work/programme/forest/information",
//                 "position": 80,
//                 "childrenCount": 5
//               }
//             ]
//           },
//           {
//             "branchId": "menu_link_content:884716bf-e1c5-4212-9b14-08f6a1460463",
//             "parentId": "menu_link_content:5691c79e-d33e-4535-9331-2c92db678883",
//             "title": "Inland Waters Biodiversity",
//             "url": "/convention/areas-of-work/programme/inland-waters",
//             "position": 30,
//             "childrenCount": 4
//           },
//           {
//             "branchId": "menu_link_content:b15eda02-ad36-4299-a3ea-9648ba76e4f4",
//             "parentId": "menu_link_content:5691c79e-d33e-4535-9331-2c92db678883",
//             "title": "Marine and Coastal Biodiversity",
//             "url": "/convention/areas-of-work/programme/marine-and-coastal",
//             "position": 50,
//             "childrenCount": 5
//           },
//           {
//             "branchId": "menu_link_content:50fe9f05-def9-4698-9ff1-a98f89358171",
//             "parentId": "menu_link_content:5691c79e-d33e-4535-9331-2c92db678883",
//             "title": "Mountain Biodiversity",
//             "url": "/convention/areas-of-work/programme/mountain",
//             "position": 60,
//             "childrenCount": 4
//           }
//         ]
//       },
//       {
//         "branchId": "menu_link_content:1eff1875-5f05-42fd-880f-b4a7341b6185",
//         "parentId": "menu_link_content:0937ae15-e663-4afc-8853-e7b93f821fd6",
//         "title": "Cross-Cutting Issues",
//         "url": "/convention/areas-of-work/issues",
//         "position": 30,
//         "childrenCount": 17
//       },
//       {
//         "branchId": "menu_link_content:d14b5909-403a-476f-926d-8f3a4ea58cb9",
//         "parentId": "menu_link_content:0937ae15-e663-4afc-8853-e7b93f821fd6",
//         "title": "Mechanisms for  Implementation  ",
//         "url": "/convention/areas-of-work/implementation",
//         "position": 30,
//         "childrenCount": 10
//       },
//       {
//         "branchId": "menu_link_content:33a5b0dd-42e0-4c96-add9-b642326fa444",
//         "parentId": "menu_link_content:0937ae15-e663-4afc-8853-e7b93f821fd6",
//         "title": "Major Groups",
//         "url": "/convention/areas-of-work/major-groups",
//         "position": 40,
//         "childrenCount": 6
//       }
//     ]
//   },

//   {
//     "branchId": "menu_link_content:bb8c7f9a-888e-4d9f-9168-1392f0a71d9b",
//     "title": "Calendar, Notifications and Updates",
//     "url": "/convention/calendar-notifications-updates",
//     "position": 40,
//     "childrenCount": 0
//   },
//   {
//     "branchId": "menu_link_content:4ee79a04-e8d6-4898-ae7c-38f201743971",
//     "title": "Meeting Documents",
//     "url": "",
//     "position": 50,
//     "childrenCount": 0
//   },
//   {
//     "branchId": "menu_link_content:6d603e44-65a0-4d27-ab79-b90d036e152a",
//     "title": "Parties",
//     "url": "/convention/parties",
//     "position": 60,
//     "childrenCount": 0
//   },
//   {
//     "branchId": "menu_link_content:27e8f653-7a81-45e8-8c36-9b8c3a35a60d",
//     "title": "Decisions",
//     "url": "/convention/decisions",
//     "position": 70,
//     "childrenCount": 0
//   },
//   {
//     "branchId": "menu_link_content:5a7202c9-ca7d-497c-891f-298a206d64c1",
//     "title": "Resources",
//     "url": "/convention/resources",
//     "position": 80,
//     "childrenCount": 0
//   },
//   {
//     "branchId": "menu_link_content:6a9bd279-e1d2-4666-bdb0-9f5ca62b6f4b",
//     "title": "Information",
//     "url": "",
//     "position": 90,
//     "childrenCount": 0
//   }
// ])

const rootMenu = computed(() => menuTree.value.find((i) => page.value.alias.startsWith(i.url)))

const breadcrumbMenu = computed(() => {
  // @ts-ignore
  if (page.value.alias && menuTree.value) {
    // @ts-ignore
    return buildPath(rootMenu.value, page.value.alias)
  }
});

const verticalMenu = computed(() => rootMenu.value);

definePageMeta({
  layout: 'home'
})
</script>
