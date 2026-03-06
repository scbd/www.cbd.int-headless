<template>
  <section class="content-row d-flex flex-column">
    <div class="row-title">
      {{ t('recentUpdates') }}
    </div>
    <div class="content-wrapper d-flex">
      <status v-if="error" :error="error" />
      <recent-update-card
        v-else
        v-for="item in recentUpdates"
        :recent-update="item"
        :key="item.id"
      />
    </div>
  </section>
</template>
<i18n src="~~/i18n/dist/app/components/recent-update/card-list.json"></i18n>

<script lang="ts" setup>
import useRecentUpdatesListApi from '~/composables/api/use-recent-updates'

const { t } = useI18n()

const { recentUpdates, error } = await useRecentUpdatesListApi({ limit: 4 })
</script>