<template>
  <div
    style="background: pink; border: red 0.5px solid; padding: 0.5rem 1rem;"
    class="d-flex flex-horizontal gap-3"
  >
    <div v-for="item in items">
      <NuxtLink
        v-if="item.url"
        :to="item.url"
        class="_nav-link"
        :class="{ 'fw-bold': url.startsWith(item.url) }"
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
  items: Array<{ title: string; url: string }>,
  url: string,
}>()
</script>
