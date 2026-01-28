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
                </button>
              </li>
            </div>
            <navigation-top-menu
              v-if="megaMenu"
              :menu="megaMenu"
              class="level-2-items"
              id="collapseSubnav"
            />
            <div class="subnav-level-3-items nav">
              <navigation-top-menu-item
                v-if="megaSubMenu"
                :menu="megaSubMenu"
              />
            </div>
          </ul>
        </nav>
      </div>

      <div class="container-xxl d-flex">
        <navigation-submenu-vertical
          v-if="verticalMenu"
          :menu="verticalMenu"
        />
        <article class="cus-article container-fluid d-flex flex-column">
          <navigation-breadcrumbs
            v-if="breadcrumbMenu"
            :items="breadcrumbMenu"
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
const { getContent } = useContentApi()
const { getMenu } = useMenuApi()

const page = await getContent(route.path)

// The logic below should be probably be moved to a utility and middleware
const menu = page.menu
  ? await getMenu(page.menu, {
    url: page.alias,
    depth: 1
  })
  : undefined

const buildPath = (item: any): any => {
  if (!item) return []

  return [
    { title: item.title, url: item.url, activeBranch: item.activeBranch },
    ...buildPath(item.children?.find((i: Menu) => i.activeBranch))
  ]
}

const menuRoot = computed(() => menu?.find((i) => i.activeBranch))

const megaMenu = computed(() => menuRoot.value?.children)

const megaSubMenu = computed(() => menuRoot.value?.children?.find((i) => i.activeBranch))

const verticalMenu = computed(() => menuRoot.value?.children?.find((i) => i.activeBranch))

const breadcrumbMenu = computed(() => {
  if (page.alias && menuRoot.value) {
    return buildPath(menuRoot.value)
  }
});

definePageMeta({
  layout: 'home'
})
</script>
