<template>
  <section class="content-row d-flex flex-column">
    <div class="row-title">
      {{ t('statements') }}
    </div>
    <div class="content-wrapper d-flex">
      <status v-if="error" :error="error" />
      <statement-card
        v-else
        v-for="statement in items"
        :statement="statement"
        :key="statement.id"
      />
    </div>
    <NuxtLink :to="STATEMENTS" class="btn cbd-btn cbd-btn-outline-more-content">
      {{ t('moreStatements') }}
    </NuxtLink>
  </section>
</template>
<i18n src="~~/i18n/dist/app/components/statement/card-list.json"></i18n>

<script lang="ts" setup>
import type { NuxtError } from '#app'
import useStatementsApi from '~/composables/api/use-statements-api'
import { STATEMENTS } from '~~/constants/api-paths'

const { t } = useI18n()

const error = ref<NuxtError>()
const { getStatements } = useStatementsApi()
const { rows: items } = await getStatements({ limit: 4 }).catch(
  (nuxtError: NuxtError) => {
    error.value = nuxtError
    return { rows: [] }
  }
)
</script>
