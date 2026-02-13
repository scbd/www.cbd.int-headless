<template>
  <section class="content-row d-flex flex-column">
    <div class="row-title">
      {{ t('meetings') }}
    </div>
    <div class="content-wrapper d-flex">
      <status v-if="isLoading" />
      <status v-else-if="error" :error="error" />
      <meeting-card
        v-else
        v-for="meeting in meetings"
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
import useMeetingsApi from '~/composables/api/use-meetings'
import { MEETINGS } from '~~/constants/url-paths'

const { t } = useI18n()

const { meetings, pending: isLoading, error } = useMeetingsApi({ limit: 4 })
</script>