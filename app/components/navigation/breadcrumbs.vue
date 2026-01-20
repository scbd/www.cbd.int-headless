<template>
  <div
    style="background: pink; border: red 0.5px solid; padding: 0.5rem 1rem;"
    class="d-flex flex-horizontal gap-2"
  >
    <div>
      <NuxtLink
        :to="`/${items[0]?.url.split('/')[1]}`"
        class="_nav-link"
      >
        {{ items[0]?.url.split('/')[1] }}
      </NuxtLink>
    </div>
    <div v-for="item of items">
      >
      <NuxtLink
        :to="item.url"
        class="_nav-link"
      >
        {{ item.url.split('/').slice(-1)[0] }}
      </NuxtLink>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
const props = defineProps<{
  items: Array<{ title: string; url: string }>
}>()
</script>
