<template>
  <div class="d-flex flex-horizontal gap-3">
    <div v-for="item in items" 
    class="level-2-item nav-item" 
    :class="{ 'current-page' : item.url && url.startsWith(item.url) }"
    >
      <NuxtLink
        v-if="item.url"
        :to="item.url"
        class="nav-link"
      >
       {{ item.title }}
      </NuxtLink>
      <div v-else>
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
const props = defineProps<{
  items: Array<{ title: string; url?: string }>,
  url: string,
}>()
</script>
