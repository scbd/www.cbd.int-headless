<template>
  <li v-for="childMenuItem in menuItem.children" class="nav-item">
    <NuxtLink class="nav-link" :to="childMenuItem.url">
      {{ childMenuItem.title }}
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import type { Menu } from "~~/types/menu";

const props = defineProps<{
  menuItem: Menu;
}>();
</script>
