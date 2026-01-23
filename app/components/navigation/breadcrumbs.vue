<template>
  <nav class="breadcrumbs" aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <NuxtLink to="/">{{ t('Home') }}</NuxtLink>
      </li>
      <template v-for="breadcrumb of path" :key="breadcrumb.url">
        <li class="breadcrumb-item">
          <NuxtLink :to="breadcrumb.url">
            {{ breadcrumb.title }}
          </NuxtLink>
        </li>
      </template>
    </ol>
  </nav>
</template>

<script setup lang="ts">
const { t } = useI18n()

const props = defineProps<{
  path: Array<{
    title: string
    url: string
  }>
}>()
</script>
