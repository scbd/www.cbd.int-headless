<template>
  <div class="content-object statement">
    <div class="date">
      {{ toFormatDate(statement.createdOn) }}
    </div>

    <NuxtImg
      :src="statement.imageUrl"
      class="content-image"
      loading="lazy"
      :placeholder="IMAGE_FALLBACK"
    />

    <div class="title"
      >{{ statement.code }} - {{ toLocaleText(statement.title) }}</div
    >

    <div class="subjects">
      <template v-for="theme of statement.themes">
        {{ toLocaleText(theme) }}
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
import { useLString } from '~/composables/use-lstring'
import { useFormatDate } from '~/composables/use-format-date'
import { IMAGE_FALLBACK } from '~~/constants/image-paths'

const { t } = useI18n()
const { toLocaleText } = useLString()
const { toFormatDate } = useFormatDate()

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
