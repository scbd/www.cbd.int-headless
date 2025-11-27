<template>
  <section class="content-row d-flex flex-column">
    <div class="row-title">
      {{ t('statements') }}
    </div>
    <div class="content-wrapper d-flex">
      <statement-card
        v-if="!isError"
        v-for="statement in items"
        :statement="statement"
        :key="statement.id"
      />
      <status v-else :error="isError" />
    </div>
    <NuxtLink :to="STATEMENTS" class="btn cbd-btn cbd-btn-outline-more-content">
      {{ t('moreStatements') }}
    </NuxtLink>
  </section>
</template>
<i18n src="~~/i18n/dist/app/components/statement/card-list.json"></i18n>

<script lang="ts" setup>
import useStatementsApi from '~/composables/api/use-statements-api'
import { STATEMENTS } from '~~/constants/api-paths'

const { t, locale } = useI18n()

const isError = ref<Error>()
const { getStatements } = useStatementsApi()
const { rows: items } = await getStatements({ limit: 4 }).catch((error) => {
  isError.value = error
  return { rows: [] }
})
</script>
