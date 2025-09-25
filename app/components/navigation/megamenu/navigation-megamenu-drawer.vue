<template>
  <nav class="mega-menu-drawer dropdown-menu container-fluid">
    <ul class="mega-menu-drawer-internal nav">
      <li class="sections-header">Sections</li>
      <li class="level-1-item nav-item">
        <NuxtLink
          class="nav-link"
          :to="menuItem.url !== '<nolink>' ? menuItem.url : ''"
        >
          {{ menuItem.title }}
        </NuxtLink>
      </li>

      <template v-if="menuItem.submenu">
        <navigation-megamenu-list
          :submenu="menuItem.submenu"
          class="level-2-items"
        />
      </template>
    </ul>
    <navigation-megamenu-socialmedia />
  </nav>
</template>

<script setup lang="ts">
import type { Menu } from "~~/types/menu";

const { t } = useI18n();

const props = defineProps<{
  menuItem: Menu;
}>();
</script>
