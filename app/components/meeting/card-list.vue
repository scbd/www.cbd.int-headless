<template>
  <section class="content-row d-flex flex-column">
    <div class="row-title">
      {{ t('meetings') }}
    </div>
    <div class="content-wrapper d-flex">
      <meeting-card
        v-if="!isError"
        v-for="meeting in items"
        :meeting="meeting"
        :key="meeting.id"
      />
      <status v-else class="error-loader" />
    </div>
    <NuxtLink :to="MEETINGS" class="btn cbd-btn cbd-btn-outline-more-content">
      More meetings
    </NuxtLink>
  </section>
</template>

<script lang="ts" setup>
import useMeetingsApi from '~/composables/api/use-meetings';
import { MEETINGS } from '~~/constants/api-paths';

const { t, locale } = useI18n();

const isError = ref<Error>();
const { getMeetings } = useMeetingsApi();
const { rows: items } = await getMeetings({ limit: 4 }).catch((error) => {
  isError.value = error;
  return { rows: [] };
});
</script>
