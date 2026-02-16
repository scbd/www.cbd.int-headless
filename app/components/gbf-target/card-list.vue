<template>
  <section class="content-row d-flex flex-column gbf-targets">
    <div class="row-title">{{ t('gbfTargets') }}</div>
    <div class="content-wrapper d-flex" ref="gbfTargetWrapperRef">
      <status v-if="error" :error="error" />
      <gbf-target-card
        v-else
        v-for="gbfTarget of gbfTargets"
        :key="gbfTarget.identifier"
        :gbf-target="gbfTarget"
    /></div>
    
    <div v-if="!error" class="controls">
      <button class="btn cbd-btn previous" @click="scrollToTarget('previous')"
        ><NuxtImg src="images/icons/icon-btn-arrow-circle-right-full.svg" />{{
          t('previous')
        }}</button
      >
      <button class="btn cbd-btn next" @click="scrollToTarget('next')"
        >{{ t('next')
        }}<NuxtImg src="images/icons/icon-btn-arrow-circle-right-full.svg" />
      </button>
    </div>

    <NuxtLink
      to="/gbf/targets"
      class="btn cbd-btn cbd-btn-outline-more-content"
      >{{ t('allGbfTargets') }}</NuxtLink
    >
  </section>
</template>
<i18n src="~~/i18n/dist/app/components/gbf-target/card-list.json"></i18n>

<script setup lang="ts">
import useGbfTargetsApi from '~/composables/api/use-gbf-targets-api'

const { t } = useI18n()

const { gbfTargets, error } = await useGbfTargetsApi()

const gbfTargetWrapper = useTemplateRef<HTMLDivElement>('gbfTargetWrapperRef')

const scrollToTarget = (to: 'previous' | 'next') => {
  const list = gbfTargetWrapper.value?.children
  const width = (list?.[0] as HTMLElement).offsetWidth ?? 300

  if (to === 'next')
    gbfTargetWrapper.value?.scrollBy({
      left: width * 3,
      top: 0,
      behavior: 'smooth'
    })
  if (to === 'previous')
    gbfTargetWrapper.value?.scrollBy({
      left: -width * 3,
      top: 0,
      behavior: 'smooth'
    })
}
</script>
