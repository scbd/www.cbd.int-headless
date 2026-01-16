<template>
  <section class="content-row d-flex flex-column">
    <div class="row-title">
      {{ t('nbsaps') }}
    </div>
    <div class="content-wrapper d-flex">
      <nbsap-card
        v-if="!isError"
        v-for="nbsap in items"
        :nbsap="nbsap"
        :key="nbsap.id"
      />
      <status v-else :error="isError" />
    </div>
    <NuxtLink :to="NBSAPS" class="btn cbd-btn cbd-btn-outline-more-content">
      More nbsaps
    </NuxtLink>
  </section>
</template>

<script lang="ts" setup>
import useNbsapsApi from '~/composables/api/use-nbsaps-api'
import { NBSAPS } from '~~/constants/api-paths'

const { t } = useI18n()

const isError = ref<Error>()
const { getNbsaps } = useNbsapsApi()
const { rows: items } = await getNbsaps({ limit: 4 }).catch((error: Error) => {
  isError.value = error
  return { rows: [] }
})
</script>
