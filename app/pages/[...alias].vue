<template>
  <main class="cus-main cus-internal-page d-flex flex-column" role="main">
    <div class="main-wrapper">
      <!-- Horizontal Submenu -->
      <div class="container-xxl d-flex">
        <!-- Vertical Submenu -->
        <navigation-submenu-vertical
          v-if="vertical.path && vertical.menu && vertical.menu[0]"
          :path="vertical.path"
          :menu="vertical.menu[0]"
        />
        <article class="cus-article container-fluid d-flex flex-column">
          <!-- Breadcrumbs -->
          <navigation-breadcrumbs
            v-if="menus?.breadcrumbs"
            :path="menus.breadcrumbs"
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

<script setup lang="ts">
import type { Menu } from '~~/types/menu'
import type { NuxtError } from '#app'
import useContentApi from '~~/app/composables/api/use-content-api'
import useMenuApi from '~/composables/api/use-menu-api'

const config = useRuntimeConfig()
const route = useRoute()
const { getPage } = useContentApi()

const { getMenu } = useMenuApi()

const page = await getPage(route.path).catch((error: NuxtError) => {
  throw error
})

const submenus = await getMenu('cbd-header').then((menus) => {
  const array: { title: string; url: string; submenu?: string }[] = []
  const m = menus.map((menu) => {
    return { title: menu.title, url: menu.url, submenu: menu.submenu }
  })
  const submenuParents = m.filter(
    (parent) => typeof parent.submenu === 'string'
  )
  array.push(...submenuParents)

  return array
})

const getSubmenus = async (submenuName: string) => {
  return $fetch('/api/menus', { query: { menu: submenuName } })
}

const { data: menus } = await useAsyncData('menus', async (_nuxtApp) => {
  const breadcrumbs: { title: string; url: string }[] = []

  const fetchedSubmenus = await Promise.all(
    submenus.map((submenu) => getSubmenus(submenu.submenu!))
  )

  const menus = fetchedSubmenus.map((menu, menuIndex) => {
    return menu.map((item) => ({
      ...item,
      parents: submenus[menuIndex] ? [submenus[menuIndex]] : []
    }))
  })

  const checkItem = async (item: Menu) => {
    if (item.url == route.fullPath && item.parents !== undefined) {
      breadcrumbs.push(...item.parents)
      breadcrumbs.push({ title: item.title, url: item.url })
    }
    if (item.children?.length) {
      const newChildren = item.children.map((child) => {
        const parents = new Set<{ title: string; url: string }>()
        if (item.parents !== undefined)
          item.parents.map((parent) => {
            parents.add(parent)
          })
        parents.add({ title: item.title, url: item.url })
        return {
          ...child,
          parents: [...parents]
        }
      })
      item.children.length = 0
      item.children.push(...newChildren)
      item.children.map((child) => {
        checkItem(child)
      })
    }
  }

  menus.map((menu) => {
    menu.map(checkItem)
  })

  return {
    breadcrumbs,
    menus
  }
})

const vertical = computed(() => {
  return {
    menu: menus.value?.menus
      .flat()
      .filter((menu) => menu.title === menus.value?.breadcrumbs[1]?.title),
    path: menus.value?.breadcrumbs.slice(1)
  }
})

definePageMeta({
  layout: 'home'
})
</script>
