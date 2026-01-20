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

const buildTree = (item: any) => {
  // const depth = item.url?.split('/')?.length;
  // console.log('buildTree', { item, depth })

  if (item.parent) {
    return buildTree({
      ...item.parent,
      children: [...item.siblings, item]
    })
  }

  return item
}

const buildPath = (item: any): any => {
  if (item.parent) {
    return [
      ...buildPath(item.parent),
      { title: item.title, url: item.url }
    ]
  }

  return [{ title: item.title, url: item.url }]
}

const menuTree = computed(() => buildTree(menu.at(0)));

const breadcrumbMenu = computed(() => buildPath(menu.at(0)));

const horizontalMenu1 = computed(() => {
  if (menuTree.value) {
    return [menuTree.value, ...(menuTree.value?.siblings || [])].sort((a, b) => a.position - b.position);
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
