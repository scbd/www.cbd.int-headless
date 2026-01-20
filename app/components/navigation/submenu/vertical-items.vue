<template>
  <NuxtLink
    :to="menu.url"
    class="_nav-link"
    :class="{ 'fw-bold': url.startsWith(menu.url) }"
  >
    {{ menu.title }}
  </NuxtLink>

  <ul
    v-if="menu.children && menu.children?.length > 0"
    :class="`_nav _level-${level}-items`"
    style="margin-left: 0.5rem;"
  >
    <li
      v-for="child of menu.children?.sort((a, b) => a.position - b.position)"
      :key="child.position"
      class="_nav-item"
    >
      <NavigationSubmenuVerticalItems
        :menu="child"
        :url="url"
        :level="level + 1"
      />
    </li>
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
