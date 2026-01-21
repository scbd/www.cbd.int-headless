<template>
  <div class="loader-wrapper" :class="templateProperties.classes">
    <template v-if="error">
      <div class="error-warning">
        <div class="error-users">
          <svg
            fill="#fff"
            width="32px"
            height="32px"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>{{ t('warning') }}</title>
            <path
              d="M30.555 25.219l-12.519-21.436c-1.044-1.044-2.738-1.044-3.782 0l-12.52 21.436c-1.044 1.043-1.044 2.736 0 3.781h28.82c1.046-1.045 1.046-2.738 0.001-3.781zM14.992 11.478c0-0.829 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5v7c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-7zM16.501 24.986c-0.828 0-1.5-0.67-1.5-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.83-0.672 1.5-1.5 1.5z"
            ></path>
          </svg>
          <p>{{ t('error.unavailable') }}</p>
        </div>

        <template v-if="isAdmin">
          <div class="error-admin">
            <template v-for="(value, key) of error">
              <div v-if="value" :class="key">
                <pre v-if="key === 'stack'">{{ value }}</pre>
                <template v-else>
                  <span class="fw-bold">{{ key }}:</span> {{ value }}
                </template>
              </div>
            </template>
          </div>
        </template>
        <template v-if="isLoading">
          <div class="loader"></div>
        </template>
      </div>
    </template>
    <span class="loader"></span>
  </div>
</template>
<i18n src="~~/i18n/dist/app/components/status.json"></i18n>

<script lang="ts" setup>
const { t } = useI18n();

const props = defineProps<{
  error?: Error;
}>();

const isAdmin = ref(false);
const isLoading = ref(false);

/**
 * TODO: Add other states
 * eg. loading
 */
const templateProperties = computed(() => {
  const classes = [];

  if (props.error) classes.push('error-loader');

  return {
    classes
  };
});

const error = computed(() => {
  if (props.error) {
    const params = { ...props.error };

    const cause = props.error.cause as {
      error: string;
      url: string;
      statusCode: number;
      statusMessage: string;
      message: string;
      stack: string;
    };

    return {
      name: props.error.name,
      message: props.error.message,
      statusCode: cause.statusCode,
      statusMessage: cause.statusMessage,
      cause: props.error.cause,
      stack: props.error.stack
    };
  }
});
</script>
