<template>
  <div
    :style="level2MenuColumnCount.styles"
    class="subnav-level-2-items collapse show"
  >
    <li
      v-for="(menuItem, index) in menus"
      :key="menuItem.branchId"
      class="subnav-level-2-item nav-item"
      :class="level3MenuColumns?.[index]?.classes"
      :style="level3MenuColumns?.[index]?.styles"
    >
      <NuxtLink
        class="nav-link"
        :to="menuItem.url"
      >
        {{ menuItem.title }}
      </NuxtLink>

      <ul
        v-if="menuItem.children"
        class="subnav-level-3-items nav"
      >
        <navigation-top-menu-item
          :menu="menuItem"
        />
      </ul>
    </li>
  </div>
</template>
<i18n src="~~/i18n/dist/app/components/navigation/mega-menu/navigation-mega-menu-list.json"></i18n>

<script
  setup
  lang="ts"
>
import type { Menu } from '~~/types/menu';

const props = defineProps<{
  menus?: Menu[]
}>();

const level2MenuColumnCount = computed(() => {
  const classes: string[] = [];
  const styles: { [key: string]: string | number } = {};

  if (props.menus?.length && props.menus?.length < 5) {
    styles['--level2-column-count'] = props.menus.length;
  }

  return { classes, styles };
});

const level3MenuColumns = computed(() =>
  props.menus?.map((menuItem, index) => {
    const classes: string[] = [];
    const styles: { [key: string]: string | number } = {};

    if (menuItem.children) {
      if (menuItem.children.length > 8) classes.push('level-3-items-multi-col');

      styles['--level3-column-count'] = Math.ceil(menuItem.children.length / 8);
    }

    if (menuItem.activeBranch) {
      classes.push('current-page')
      classes.push('show')
    }

    return { classes, styles };
  })
);
</script>
