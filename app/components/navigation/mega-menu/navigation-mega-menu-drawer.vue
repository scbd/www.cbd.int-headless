<template>
  <nav class="mega-menu-drawer dropdown-menu container-fluid">
    <ul class="mega-menu-drawer-internal nav">
      <li class="sections-header">{{ t('sections') }}</li>
      <li class="level-1-item nav-item">
        <NuxtLink
          class="nav-link"
          :to="menu.url !== '<nolink>' ? menu.url : ''"
        >
          {{ menu.title }}
        </NuxtLink>
      </li>

      <template v-if="menu.submenu">
        <navigation-mega-menu-list
          :submenu="menu.submenu"
          class="level-2-items"
        />
      </template>
    </ul>
    <navigation-mega-menu-social-media />
  </nav>
</template>
<i18n src="~~/i18n/dist/app/components/navigation/mega-menu/navigation-mega-menu-drawer.json"></i18n>

<script setup lang="ts">
import type { Menu } from '~~/types/menu';

const { t } = useI18n();

const props = defineProps<{
  menu: Menu;
}>();
</script>
