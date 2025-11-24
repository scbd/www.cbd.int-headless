<template>
  <div class="content-object nbsap">
    <div class="date">
      {{ nbsap.updatedOn }}
    </div>

    <div class="title">{{ nbsap.title[locale] }}</div>

    <div
      v-dompurify-html:plaintext="nbsap.summary[locale]"
      class="description"
    ></div>

    <div class="read-on-wrapper">
      <NuxtLink :to="nbsap.url" class="read-on" target="_blank"
        >View nbsap</NuxtLink
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Nbsap } from '~~/types/nbsap'
import { formatDate } from '~~/utils/date'

const { locale } = useI18n()

const props = defineProps<{
  nbsap: Nbsap
}>()

const nbsap = computed(() => {
  return {
    ...props.nbsap,
    updatedOn: formatDate(props.nbsap.updatedOn, locale.value)
  }
})
</script>
