<template>
  <div class="content-object" :class="item.category">
    <div class="date">
      <template v-if="item.category === 'meeting' && item.startOn && item.endOn">
        {{ toFormatDate(item.startOn) }} &ndash; {{ toFormatDate(item.endOn) }}
      </template>
      <template v-else>
        {{ toFormatDate(item.updatedOn) }}
      </template>
    </div>

    <NuxtImg
      :src="item?.image?.path"
      :alt="item?.image?.alt"
      class="content-image"
      loading="lazy"
      :placeholder="IMAGE_FALLBACK"
    />

    <div class="category-badge">
      {{ t(item.category) }}
    </div>

    <div class="title">
      <template v-if="item.category !== 'meeting'">{{ item.code }} &ndash; </template>
      {{ toLocaleText(item.title) }}
    </div>

    <div v-if="item.category === 'meeting' && (item.city || item.country)" class="location">
      {{ [item.city && toLocaleText(item.city), item.country && toLocaleText(item.country)].filter(Boolean).join(', ') }}
    </div>

    <div class="read-on-wrapper">
      <NuxtLink :to="item.url" class="read-on">{{ t('viewDetails') }}</NuxtLink>
    </div>
  </div>
</template>
<i18n src="~~/i18n/dist/app/components/recent-update/card.json"></i18n>

<script lang="ts" setup>
import type { RecentUpdate } from '~~/types/recent-updates'
import { useFormatDate } from '~/composables/use-format-date'
import { useLString } from '~/composables/use-lstring'
import { IMAGE_FALLBACK } from '~~/constants/image-paths'

const { t } = useI18n()
const { toLocaleText } = useLString()
const { toFormatDate } = useFormatDate()

const props = defineProps<{
  recentUpdate: RecentUpdate
}>()

const item = computed(() => ({
  ...props.recentUpdate,
  url: props.recentUpdate.urls[0]
}))
</script>