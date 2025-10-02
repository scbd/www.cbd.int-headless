<template>
  <div v-if="menu" :style="level2MenuColumnCount">
    <li
      v-for="(menuItem, index) in menu"
      class="level-2-item nav-item"
      :class="level3MenuColumns[index]?.['multiple-columns']"
      :style="level3MenuColumns[index]?.['column-count']"
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
import useMenuApi from "~/composables/use-menu-api";

const props = defineProps<{
  submenu: string;
}>();

const { getMenu } = useMenuApi();
const { data: menu } = await getMenu(props.submenu);

const level2MenuColumnCount = computed(() => {
  if (menu.value && menu.value.length < 5)
    return `--level2-column-count: ${menu.value.length}`;
});

const level3MenuColumns = computed(() => {
  const menuObject: {
    [key: number]: {
      "multiple-columns": string;
      "column-count": string;
    };
  } = {};

  menu.value?.forEach((menuItem, index) => {
    if (menuItem.children) {
      menuObject[index] = {
        "multiple-columns":
          menuItem.children.length > 8 ? "level-3-items-multi-col" : "",
        "column-count": `--level3-column-count: ${Math.ceil(
          menuItem.children.length / 8
        ).toString()}`,
      };
    }
  });

  return menuObject;
});
</script>
