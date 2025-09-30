<template>
  <nav class="mega-menu-drawer dropdown-menu container-fluid">
    <ul class="mega-menu-drawer-internal nav">
      <li class="sections-header">Sections</li>
      <li class="level-1-item nav-item">
        <NuxtLink
          class="nav-link"
          :to="menu.url !== '<nolink>' ? menu.url : ''"
        >
          {{ menu.title }}
        </NuxtLink>
      </li>

      <template v-if="menu.submenu">
        <NavigationMegaMenuList :submenu="menu.submenu" class="level-2-items" />
      </template>
    </ul>
    <NavigationMegaMenuSocialMedia />
  </nav>
</template>

<script setup lang="ts">
import type { Menu } from "~~/types/menu";

const { t } = useI18n();

const props = defineProps<{
  menu: Menu;
}>();
</script>