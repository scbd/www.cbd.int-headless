<template>
  <div :style="level2MenuColumnCount.styles">
    <status v-if="error" :error="error" />
    <template v-else>
      <li
        v-for="(menuItem, index) in menu"
        class="level-2-item nav-item"
        :class="level3MenuColumns?.[index]?.classes"
        :style="level3MenuColumns?.[index]?.styles"
      >
        <NuxtLink class="nav-link" :to="menuItem.url">
          {{ menuItem.title }}
        </NuxtLink>

      <ul v-if="menuItem.component" class="level-3-items nav">
        <navigation-mega-menu-dynamic-content :component="menuItem.component" />
      </ul>

      <ul v-if="menuItem.children" class="level-3-items nav">
        <navigation-mega-menu-list-item :menu="menuItem" />
      </ul>
    </li>
    </template>
  </div>
</template>
<i18n src="~~/i18n/dist/app/components/navigation/mega-menu/navigation-mega-menu-list.json"></i18n>

<script setup lang="ts">
import useMenuApi from '~/composables/api/use-menu-api';

const props = defineProps<{
  submenu: string;
}>();

const { menu, error } = await useMenuApi(props.submenu);

const level2MenuColumnCount = computed(() => {
  const classes: string[] = [];
  const styles: { [key: string]: string | number } = {};

  if (menu.value.length < 5) {
    styles['--level2-column-count'] = menu.value.length;
  }

  return { classes, styles };
});

const level3MenuColumns = computed(() =>
  menu.value.map((menuItem) => {
    const classes: string[] = [];
    const styles: { [key: string]: string | number } = {};

    if (menuItem.children) {
      if (menuItem.children.length > 8) classes.push('level-3-items-multi-col');

      styles['--level3-column-count'] = Math.ceil(menuItem.children.length / 8);
    }

    return { classes, styles };
  })
);
</script>
