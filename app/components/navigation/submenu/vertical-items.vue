<template>
  <li
    class="nav-item"
    :class="{
      [`level-${level}-item`]: true,
      'current-page': menu.activeBranch,
      'aside-nav-header': level === 3
    }"
  >
    <NuxtLink
      :to="menu.url"
      class="nav-link"
      :class="{ '_bg-warning selected current-page': menu.activeBranch }"
    >
      {{ menu.title }}
    </NuxtLink>

    <ul
      v-if="menu.children && menu.children?.length > 0"
      class="nav"
      :class="{
        [`level-${level + 1}-items`]: true,
        'current-page': menu.activeBranch
      }"
    >
      <template
        v-for="child of menu.children"
        :key="child.branchId"
      >
        <NavigationSubmenuVerticalItems
          :menu="child"
          :level="level + 1"
        />
      </template>
    </ul>
  </li>
</template>

<script
  setup
  lang="ts"
>
import type { Menu } from '~~/types/menu'

const props = defineProps<{
  menu: Menu,
  level: number,
}>()
</script>
