<template>
    <div class="info">
        <hgroup class="titles">
            <h1 class="error-heading">{{ statusCode }} - {{ errorCodeMessage }}</h1>
            <h2 class="error-msg">{{ errorMessage }}</h2>
            <br />
            <button class="btn btn-secondary" @click="handleError">{{ t('backButton') }}</button>
        </hgroup>
    </div>
</template>
<i18n src="~~/i18n/dist/app/components/error-message.json"></i18n>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()

const props = defineProps({
    statusCode: Number
})

const errorCodeMessage = t(`errorCodeMessage-${props.statusCode}`) || t('errorCodeMessage-default')
const errorMessage = t(`errorMessage-${props.statusCode}`, { path: route.path }) || t('errorMessage-default')
const handleError = () => {
  clearError()
  if (import.meta.client && window.history.length > 1) {
    navigateTo(localePath(router.back))
  } else {
    navigateTo(localePath('/'))
  }
}
</script>

<style scoped>
.info {
  flex: 1 1 calc(40% - 4rem);
  flex-direction: column;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .titles {
    flex: 2 1 calc(100% - 1rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .error-msg {
    flex-basis: 1rem;
    align-self: flex-end;
    color: lightgrey;
    font-size: 1.0rem;
  }
}

@media (max-width: 900px) {
  .info {
    height: 50%;
    flex: 1 1 auto;
  }
}
</style>