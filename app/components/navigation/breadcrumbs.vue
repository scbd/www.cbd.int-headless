<template>
  <div class="breadcrumbs">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <NuxtLink to="/">
          {{ t('home') }}
        </NuxtLink>
      </li>
      <li
        v-for="item of items"
        :key="item.url"
        class="breadcrumb-item"
      >
        <NuxtLink
          :to="item.url"
          :class="{
            'router-link-active router-link-exact-active': item.activeBranch
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
  items: Array<{ title: string; url: string, activeBranch: boolean }>
}>()
</script>
