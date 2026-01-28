<template>
    <div class="info">
      <hgroup class="titles">
        <h1 class="error-heading">{{ t('errorCode') }} - {{ t('errorCodeMessage') }}</h1>
        <h2 class="error-msg">{{ t('errorMessage', { path: route.path })  }}</h2>
        <br />
        <button class="btn btn-secondary" @click="handleError">{{t('homeButton')}}</button>
      </hgroup>
    </div>
</template>
<i18n src="~~/i18n/dist/app/pages/error/403.json"></i18n>

<script setup lang="ts">
const { t } = useI18n()
const handleError = () => clearError({ redirect: '/' })
const route = useRoute()
</script>
