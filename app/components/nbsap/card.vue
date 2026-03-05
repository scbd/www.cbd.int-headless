<template>
  <div class="content-object meeting">
    <div class="date">
      {{ toFormatDate(nbsap.updatedOn) }}
    </div>

    <div class="title">{{ toLocaleText(nbsap.title) }}</div>
    <div v-if="nbsap.country" class="location">
      {{ `${toLocaleText(nbsap.country)}` }}
    </div>
    <div class="read-on-wrapper">
      <NuxtLink :to="nbsap.url" class="read-on">{{ t('viewNbsap') }}</NuxtLink>
    </div>
  </div>
</template>
<i18n src="~~/i18n/dist/app/components/nbsap/card.json"></i18n>

<script lang="ts" setup>
import type { Nbsap } from '~~/types/nbsap'
import { useFormatDate } from '~/composables/use-format-date'
import { useLString } from '~/composables/use-lstring'

const { t } = useI18n()
const { toLocaleText } = useLString()
const { toFormatDate } = useFormatDate()

const props = defineProps<{
  nbsap: Nbsap
}>()

const nbsap = computed(() => {
  return {
    ...props.nbsap,
    url: props.nbsap.urls[0],
  }
})
</script>
