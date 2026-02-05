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
      <status v-else :error="isError" />
    </div>
    <NuxtLink :to="MEETINGS" class="btn cbd-btn cbd-btn-outline-more-content">
      {{ t('moreMeetings') }}
    </NuxtLink>
  </section>
</template>
<i18n src="~~/i18n/dist/app/components/meeting/card-list.json"></i18n>

<script lang="ts" setup>
import useMeetingsApi from '~/composables/api/use-meetings';
import { MEETINGS } from '~~/constants/url-paths';

const { t } = useI18n();

const isError = ref<Error>();
const { getMeetings } = useMeetingsApi();
const { rows: items } = await getMeetings({ limit: 4 }).catch((error) => {
  isError.value = error;
  return { rows: [] };
});
</script>
