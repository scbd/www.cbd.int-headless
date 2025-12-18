<template>
  <section class="content-row d-flex flex-column">
    <div class="row-title">
      {{ t('meetings') }}
    </div>
    <div class="content-wrapper d-flex">
      <status v-if="error" :error="error" />
      <meeting-card
        v-else
        v-for="meeting in items"
        :meeting="meeting"
        :key="meeting.id"
      />
    </div>
    <NuxtLink :to="MEETINGS" class="btn cbd-btn cbd-btn-outline-more-content">
      {{ t('moreMeetings') }}
    </NuxtLink>
  </section>
</template>
<i18n src="~~/i18n/dist/app/components/meeting/card-list.json"></i18n>

<script lang="ts" setup>
import type { NuxtError } from '#app'
import useMeetingsApi from '~/composables/api/use-meetings-api'
import { MEETINGS } from '~~/constants/api-paths'

const { t } = useI18n()

const error = ref<NuxtError>()
const { getMeetings } = useMeetingsApi()
const { rows: items } = await getMeetings({ limit: 4 }).catch(
  (nuxtError: NuxtError) => {
    error.value = nuxtError
    return { rows: [] }
  }
)
</script>
