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
            <status v-if="menuError" :error="menuError" />
            <template v-else>
              <async-block>
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
              </async-block>
            </template>
          </ul>
        </nav>
      </div>

      <div class="container-xxl d-flex">
        <async-block>
          <navigation-submenu-vertical
            v-if="verticalMenu?.children?.length"
            :menu="verticalMenu"
          />
        </async-block>
        <article class="cus-article container-fluid d-flex flex-column">
          <navigation-breadcrumbs
            v-if="breadcrumbMenu"
            :items="breadcrumbMenu"
          />
          <status v-if="error" :error="error" />

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
import type { Breadcrumb, Menu } from '~~/types/menu'
import useContentApi from '~~/app/composables/api/use-content-api'
import useMenuApi from '~~/app/composables/api/use-menu-api'

const route = useRoute()

const { content: page, error } = await useContentApi(route.path)

if (error.value !== undefined && error.value !== null && 'statusCode' in error.value && error.value.statusCode === 404) {
  throw createError({ ...error.value, fatal: true })
}

const { menu, error: menuError } =
  await useMenuApi(page.value?.menu ?? '',
  {
    url: route.path,
    depth: 1
  }
)

const buildPath = (item: Menu | undefined): Breadcrumb[] => {
  if (!item) return []

  return [
    { title: item.title, url: item.url ?? '', activeBranch: item.activeBranch ?? false },
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

  return undefined
});

definePageMeta({
  layout: 'home'
})
</script>
