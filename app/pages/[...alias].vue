<template>
  <main
    class="cus-main cus-internal-page d-flex flex-column"
    role="main"
  >
    <div class="main-wrapper">
      <div class="d-flex flex-column gap-2">
        <navigation-submenu-horizontal
          v-if="horizontalMenu1"
          :items="horizontalMenu1"
          :url="page.alias"
        />
        <navigation-submenu-horizontal
          v-if="horizontalMenu2"
          :items="horizontalMenu2"
          :url="page.alias"
        />
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

const page = await getPage(route.path)
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
    ...buildPath(item.children?.find((i: Menu) => url.startsWith(i.url)), url)
  ]
}

console.log('app.pages', { menu: menu.at(0), page })

// note: just return single node with its children (not array)
const menuTree = computed(() => menu.at(0));

const breadcrumbMenu = computed(() => {
  // @ts-ignore
  if (page.value.alias && menuTree.value) {
    // @ts-ignore
    return buildPath(menuTree.value, page.value.alias)
  }
});

const horizontalMenu1 = computed(() => {
  if (menuTree.value) {
    return [menuTree.value]
  }
});

const horizontalMenu2 = computed(() => {
  return menuTree.value?.children?.sort((a: any, b: any) => a.position - b.position);
});

const verticalMenu = computed(() => menuTree.value);

definePageMeta({
  layout: 'home'
})
</script>
