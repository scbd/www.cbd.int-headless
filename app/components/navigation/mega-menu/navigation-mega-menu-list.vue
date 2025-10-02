<template>
  <div v-if="menu" :style="level2MenuColumnCount">
    <li
      v-for="(menuItem, index) in menu"
      class="level-2-item nav-item"
      :class="level3MenuColumns?.[index]?.classes"
      :style="level3MenuColumns?.[index]?.styles"
    >
      <NuxtLink class="nav-link" :to="menuItem.url">
        {{ menuItem.title }}
      </NuxtLink>

      <ul v-if="menuItem.children" class="level-3-items nav">
        <NavigationMegaMenuListItem :menu="menuItem" />
      </ul>
    </li>
  </div>
</template>

<script setup lang="ts">
import useMenuApi from '~/composables/use-menu-api';

const props = defineProps<{
  submenu: string;
}>();

const { getMenu } = useMenuApi();
const { data: menu } = await getMenu(props.submenu);

const level2MenuColumnCount = computed(() => {
  if (menu.value && menu.value.length < 5)
    return `--level2-column-count: ${menu.value.length}`;
});

const level3MenuColumns = computed(() =>
  menu.value?.map((menuItem, index) => {
    const classes = [];
    const styles: { [key: string]: string | number } = {};

    if (menuItem.children) {
      if (menuItem.children.length > 8) {
        classes.push('level-3-items-multi-col');
      }

      styles['--level3-column-count'] = Math.ceil(menuItem.children.length / 8);
    }

    return { classes, styles };
  })
);
</script>
