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
            <status v-if="menuPending" />
            <status v-else-if="menuError" :error="menuError" />
            <template v-else>
              <navigation-top-menu
                v-if="megaMenu"
                :menus="megaMenu"
                class="level-2-items"
                id="collapseSubnav"
              />
              <div class="subnav-level-3-items nav">
                <navigation-top-menu-item
                  v-if="megaSubMenu"
                  :menu="megaSubMenu"
                />
              </div>
            </template>
          </ul>
        </nav>
      </div>

      <div class="container-xxl d-flex">
        <navigation-submenu-vertical
          v-if="verticalMenu?.children?.length"
          :menu="verticalMenu"
        />
        <article class="cus-article container-fluid d-flex flex-column">
          <navigation-breadcrumbs
            v-if="breadcrumbMenu"
            :items="breadcrumbMenu"
          />
          <status v-if="pending" />
          <status v-else-if="error" :error="error" />

          <template v-else>
            <section
              v-dompurify-html="page!.body"
              class="rendered-content"
              ></section>
          </template>
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

const route = useRoute()

const { content: page, pending, error } = await useContentApi(route.path)

// Show error page if path doesn't exist in Drupal backend.
watch(error, () => {
  if (error.value && (error.value as Error & { statusCode?: number })?.statusCode === 404) {
    showError(error.value)
  }
})

const { data: menu, pending: menuPending, error: menuError } = useLazyAsyncData<Menu[]>(
  `menu-${route.path}`,
  async () => {
    if (!page.value?.menu) return []

    return $fetch<Menu[]>(`/api/menus/${page.value.menu}`, {
      params: { url: page.value.alias, depth: 1 }
    })
  },
  {
    watch: [() => page.value?.menu],
    default: () => []
  }
)

const buildPath = (item: any): any => {
  if (!item) return []

  return [
    { title: item.title, url: item.url, activeBranch: item.activeBranch },
    ...buildPath(item.children?.find((i: Menu) => i.activeBranch))
  ]
}

const menuRoot = computed(() => menu.value?.find((i) => i.activeBranch))

const megaMenu = computed(() => menuRoot.value?.children)

const megaSubMenu = computed(() => menuRoot.value?.children?.find((i) => i.activeBranch))

const verticalMenu = computed(() => menuRoot.value?.children?.find((i) => i.activeBranch)?.children?.find((i) => i.activeBranch))

const breadcrumbMenu = computed(() => {
  if (page.value?.alias && menuRoot.value) {
    return buildPath(menuRoot.value)
  }
});

definePageMeta({
  layout: 'home'
})
</script>
