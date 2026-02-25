<template>
  <section class="content-row d-flex flex-column">
    <div class="row-title">
      {{ t('statements') }}
    </div>
    <div class="content-wrapper d-flex">
      <status v-if="error" :error="error" />
      <statement-card
        v-else
        v-for="statement in statements.rows"
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
import useStatementsApi from '~/composables/api/use-statements';
import { STATEMENTS } from '~~/constants/url-paths';

const { t } = useI18n();

const { statements, error } = await useStatementsApi(ref({ limit: 4 }))
</script>
