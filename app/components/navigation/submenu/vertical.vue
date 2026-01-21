<template>
  <aside class="cus-aside aside-nav" :class="{ 'aside-collapsed': isVisible }">    
    <div class="nav">
      <NavigationSubmenuVerticalItems
        :menu="submenu"
        :url="url"
        :level="3"
      />
    </div>

    <div class="aside-collapse-controls">
      <button
        class="cbd-btn-aside-collapse btn"
        @click="isVisible = !isVisible"
      >
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M36 66C52.53 66 66 52.53 66 36C66 19.47 52.53 6 36 6C19.47 6 6 19.47 6 36C6 52.53 19.47 66 36 66ZM27.63 34.41L38.22 23.82C38.67 23.37 39.24 23.16 39.81 23.16C40.38 23.16 40.95 23.37 41.4 23.82C42.27 24.69 42.27 26.13 41.4 27L32.4 36L41.4 45C42.27 45.87 42.27 47.31 41.4 48.18C40.53 49.05 39.09 49.05 38.22 48.18L27.63 37.59C26.73 36.72 26.73 35.28 27.63 34.41Z"
          />
        </svg>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Menu } from '~~/types/menu'
const isVisible = ref(false)

const props = defineProps<{
  menu: Menu
  url: string,
}>()

// only show the menu starting at the 3rd level
const submenu = computed(() => {
  return props.menu.children?.find((item: any) => props.url.startsWith(item.url)) as Menu
})
</script>
