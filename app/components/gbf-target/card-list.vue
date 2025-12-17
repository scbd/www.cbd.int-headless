<template>
  <section class="content-row d-flex flex-column gbf-targets">
    <div class="row-title">{{ t('gbfTargets') }}</div>
    <div class="content-wrapper">
      <!-- d-flex -->
      <status v-if="error" :error="error" />
      <gbf-target-card
        v-else
        v-for="gbfTarget of gbfTargets"
        :key="gbfTarget.id"
        :gbf-target="gbfTarget"
    /></div>
    <div class="controls" style="color: white">
      <div>prev</div>
      <div>next</div>
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
import type { NuxtError } from '#app'
import useGbfTargetsApi from '~/composables/api/use-gbf-targets-api'

const { t } = useI18n()

const error = ref<NuxtError>()
const { getGbfTargets } = useGbfTargetsApi()
const items = await getGbfTargets().catch((nuxtError: NuxtError) => {
  error.value = nuxtError
  return []
})

const gbfTargets = computed(() => items)
</script>

<style lang="scss" scoped>
.gbf-targets .content-wrapper {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  scroll-snap-type: x mandatory;
  // display: grid;
  // grid-template-columns: (repeat(23, 30%));
  overflow-x: scroll;
  .content-object {
    width: 33%;
    flex: none;
    scroll-snap-align: start;
  }
}
</style>
