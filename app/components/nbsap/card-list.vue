<template>
  <section class="content-row d-flex flex-column">
    <div class="row-title">
      {{ t('nbsaps') }}
    </div>
    <div class="content-wrapper d-flex">
      <status v-if="pending || error" :error="error" />
      <nbsap-card
        v-else
        v-for="nbsap in nbsaps.rows"
        :nbsap="nbsap"
        :key="nbsap.id"
      />
    </div>
    <NuxtLink :to="NBSAPS" class="btn cbd-btn cbd-btn-outline-more-content">
      {{ t('moreNbsaps') }}
    </NuxtLink>
  </section>
</template>
<i18n src="~~/i18n/dist/app/components/nbsap/card-list.json"></i18n>

<script lang="ts" setup>
import { NBSAPS } from '~~/constants/url-paths'

const { t } = useI18n()

const { getNbsapList } = useNbsaps()

const { data: nbsaps, pending, error } = getNbsapList({ limit: 4 })
</script> 
