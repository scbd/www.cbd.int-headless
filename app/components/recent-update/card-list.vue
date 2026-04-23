<template>
  <section class="content-row d-flex flex-column">
    <div class="row-title">
      {{ t('recentUpdates') }}
    </div>
    <div class="content-wrapper d-flex">
      <status v-if="pending || error" :error="error" />
      <recent-update-card
        v-else
        v-for="item in recentUpdates?.rows"
        :recent-update="item"
        :key="item.id"
      />
    </div>
  </section>
</template>
<i18n src="~~/i18n/dist/app/components/recent-update/card-list.json"></i18n>

<script lang="ts" setup>
const { t } = useI18n()

const {  getRecentUpdateList } = useRecentUpdates()

const { data: recentUpdates, pending, error } = await getRecentUpdateList({ limit: 4 })
</script>