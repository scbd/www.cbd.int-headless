<template>
  <li
    class="nav-item"
    :class="{
      [`level-${level}-item`]: true,
      'current-page': menu.url && url.startsWith(menu.url)
    }"
  >
    <NuxtLink
      :to="menu.url"
      class="nav-link"
      :class="{ '_bg-warning selected current-page': menu.url && url.startsWith(menu.url) }"
    >
      {{ menu.title }}
    </NuxtLink>
  </li>

  <ul
    v-if="menu.children && menu.children?.length > 0"
    class="nav"
    :class="{
      [`level-${level}-items`]: true,
      'current-page': menu.url && url.startsWith(menu.url)
    }"
  >
    <template
      v-for="child of menu.children?.sort((a, b) => a.position - b.position)"
      :key="child.position"
    >
      <NavigationSubmenuVerticalItems
        :menu="child"
        :url="url"
        :level="level + 1"
      />
    </template>
  </ul>
</template>

<script
  setup
  lang="ts"
>
import type { Menu } from '~~/types/menu'

const props = defineProps<{
  menu: Menu,
  url: string,
  level: number,
}>()
</script>
