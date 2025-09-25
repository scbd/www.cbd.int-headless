<template>
  <div
    v-if="menu"
    :style="menu.length < 5 ? `--level2-column-count: ${menu.length}` : ''"
  >
    <li
      v-for="menuItem in menu"
      class="level-2-item nav-item"
      :class="[
        {
          'level-3-items-multi-col':
            menuItem.children && menuItem.children.length > 8,
        },
      ]"
      :style="`--level3-column-count: ${
        menuItem.children
          ? Math.ceil(menuItem.children.length / 8).toString()
          : '1'
      }`"
    >
      <NuxtLink
        class="nav-link"
        :to="menuItem.url !== '<nolink>' ? menuItem.url : ''"
      >
        {{ menuItem.title }}
      </NuxtLink>

      <ul v-if="menuItem.children" class="level-3-items nav">
        <navigation-megamenu-listitem :menuItem="menuItem" />
      </ul>
    </li>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  submenu: string;
}>();

const { data } = await useFetch("/api/menu", {
  method: "GET",
  params: {
    menu: props.submenu,
  },
});

const menu = data.value;
</script>