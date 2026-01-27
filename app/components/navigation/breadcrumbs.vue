<template>
  <div class="breadcrumbs">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <NuxtLink to="/">
          {{ t('home') }}
        </NuxtLink>
      </li class="breadcrumb-item">
      <li
        v-for="item of items"
        class="breadcrumb-item"
      >
        <NuxtLink
          :to="item.url"
          :class="{
            'router-link-active router-link-exact-active': item.url === url
          }"
        >
          {{ item.title }}
        </NuxtLink>
      </li>
    </ol>
  </div>
</template>

<script
  setup
  lang="ts"
>
const { t } = useI18n();

const props = defineProps<{
  items: Array<{ title: string; url: string }>,
  url: string
}>()
</script>
