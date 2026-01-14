<template>
  <div class="content-object statement">
    <div class="date">
      {{ formatDate(statement.createdOn) }}
    </div>

    <NuxtImg
      :src="statement.imageUrl"
      class="content-image"
      loading="lazy"
      :placeholder="IMAGE_FALLBACK"
    />

    <div class="title"
      >{{ statement.code }} - {{ lstring(statement.title, locale) }}</div
    >

    <div class="subjects">
      <template v-for="theme of statement.themes">
        {{ lstring(theme, locale) }}
      </template>
    </div>

    <div class="read-on-wrapper">
      <NuxtLink :to="statement.url" class="read-on">{{ t('viewStatement') }}</NuxtLink>
    </div>
  </div>
</template>
<i18n src="~~/i18n/dist/app/components/statement/card.json"></i18n>

<script lang="ts" setup>
import type { Statement } from '~~/types/statement'
import { formatDate } from '~~/utils/date'
import { lstring } from '@scbd/vue-components'
import { IMAGE_FALLBACK } from '~~/constants/image-paths'

const { t, locale } = useI18n()

const props = defineProps<{
  statement: Statement
}>()

const statement = computed(() => {
  return {
    ...props.statement,
    url: props.statement.urls[0],
    /**
     * To be replaced with proper image handling when available;
     * WILL BE REMOVED SOON
     */
    imageUrl: `/content/images/statements/${encodeURIComponent(
      props.statement.code
    )}.jpg`
  }
})
</script>
