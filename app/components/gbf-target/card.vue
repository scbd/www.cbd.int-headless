<template>
  <div class="content-object gbf-target" :class="gbfTarget.classes">
    <div class="header" :style="gbfTarget.styles">
      <div class="information">
        <div class="title">
          <NuxtLink :to="gbfTarget.url">{{
            t('target', { number: gbfTarget.number })
          }}</NuxtLink>
        </div>
        <div class="description">
          <NuxtLink :to="gbfTarget.url">{{
            toLocaleText(gbfTarget.description)
          }}</NuxtLink>
        </div>
      </div>
    </div>
    <div class="resources"></div>
    <div class="links">
      <NuxtLink :to="gbfTarget.url">{{ t('quickLinksImportant') }}</NuxtLink>
      <NuxtLink :to="gbfTarget.url">{{ t('quickLinksExplanation') }}</NuxtLink>
      <NuxtLink :to="gbfTarget.url">{{
        t('quickLinksGuidingQuestions')
      }}</NuxtLink>
      <NuxtLink :to="gbfTarget.url">{{ t('quickLinksLinks') }}</NuxtLink>
      <NuxtLink :to="gbfTarget.url">{{
        t('quickLinksRelevantResources')
      }}</NuxtLink>
      <NuxtLink :to="gbfTarget.url">{{ t('quickLinksIndicators') }}</NuxtLink>
    </div>
    <NuxtLink :to="gbfTarget.url" class="view-target">{{
      t('viewGbfTarget')
    }}</NuxtLink>
  </div>
</template>
<i18n src="~~/i18n/dist/app/components/gbf-target/card.json"></i18n>

<script setup lang="ts">
import type { GbfTarget } from '~~/types/gbf-target'
import { useLString } from '~/composables/use-lstring'

const { t } = useI18n()
const { toLocaleText } = useLString()

const props = defineProps<{
  gbfTarget: GbfTarget
}>()

const gbfTarget = computed(() => {
  const identifier = props.gbfTarget.identifier.slice(-2)
  return {
    ...props.gbfTarget,
    number: identifier,
    url: `/gbf/targets/${identifier}`,
    classes: [`gbf-target-${identifier}`],
    styles: [
      'background-color: blue',
      `background-image: url("/content/images/gbf/GBF_Targets-${identifier}.png")`
    ]
  }
})
</script>
