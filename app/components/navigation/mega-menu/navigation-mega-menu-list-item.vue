<template>
  <li 
  v-for="childMenuItem in menu?.children" 
  class="nav-item" 
   :class="{ 'current-page': childMenuItem.url && url?.startsWith(childMenuItem.url) }"
  >
    <NuxtLink class="nav-link" :to="childMenuItem.url">
      {{ childMenuItem.title }}
    </NuxtLink>
  </li>
</template>
<i18n src="~~/i18n/dist/app/components/navigation/mega-menu/navigation-mega-menu-list-item.json"></i18n>

<script setup lang="ts">
import type { Menu } from "~~/types/menu";

const props = defineProps<{
  menu?: Menu,
  url?: string
}>();
</script>
