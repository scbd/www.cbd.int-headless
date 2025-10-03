<template>
  <li v-for="childMenuItem in menu.children" class="nav-item">
    <NuxtLink class="nav-link" :to="childMenuItem.url">
      {{ childMenuItem.title }}
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import type { Menu } from "~~/types/menu";

const props = defineProps<{
  menu: Menu;
}>();
</script>
