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
            <navigation-top-menu
              v-if="megaMenu"
              :menu="megaMenu"
              :url="page.alias"
              class="level-2-items"
              id="collapseSubnav"
            />
            <div class="subnav-level-3-items nav">
              <navigation-top-menu-item
                v-if="megaSubMenu"
                :menu="megaSubMenu"
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

const menuRoot = computed(() => menu?.find((i) => page.value.alias.startsWith(i.url)));

const megaMenu = computed(() => menuRoot.value?.children)

const megaSubMenu = computed(() => menuRoot.value?.children?.find((i) => page.value.alias.startsWith(i.url)))

const verticalMenu = computed(() => menuRoot.value?.children?.find((i) => page.value.alias.startsWith(i.url)))

const breadcrumbMenu = computed(() => {
  if (page.value.alias && menuRoot.value) {
    return buildPath(menuRoot.value, page.value.alias)
  }
});

definePageMeta({
  layout: 'home'
})
</script>
