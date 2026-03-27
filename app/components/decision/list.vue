<template>
    <h1>{{ t('title', { code }) }}</h1>
</template>
<i18n src="~~/i18n/dist/app/components/decision/list.json"></i18n>

<script setup lang="ts">
const { t } = useI18n()

const props = defineProps<{
  code: string
}>()

const code = computed(() => props.code)

</script>