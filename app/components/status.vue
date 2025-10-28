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
            <title>Warning</title>
            <path
              d="M30.555 25.219l-12.519-21.436c-1.044-1.044-2.738-1.044-3.782 0l-12.52 21.436c-1.044 1.043-1.044 2.736 0 3.781h28.82c1.046-1.045 1.046-2.738 0.001-3.781zM14.992 11.478c0-0.829 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5v7c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-7zM16.501 24.986c-0.828 0-1.5-0.67-1.5-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.83-0.672 1.5-1.5 1.5z"
            ></path>
          </svg>
          <p>This feature is currently unavailable.</p>
        </div>

        <template>
          <div class="error-admin">
            <div class="message">Message: {{ error.cause.message }}</div>
            <div class="code">Status Code: {{ error.cause.statusCode }}</div>
            <div class="source">Source: {{ error.cause.statusMessage }}</div>
            <div class="stack">{{ error.cause.stack }}</div>
          </div>
        </template>
      </div>
    </template>
    <span class="loader"></span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  fetchError?: Error;
}>();

/**
 * TODO: Add other states
 * eg. loading
 */
const templateProperties = computed(() => {
  const classes = [];

  if (props.fetchError) classes.push('error-loader');

  return {
    classes
  };
});

const error = computed(() => {
  if (props.fetchError) {
    console.log(Object.keys(props.fetchError));

    const cause = props.fetchError?.cause as {
      error: string;
      url: string;
      statusCode: number;
      statusMessage: string;
      message: string;
      stack: string;
    };

    return {
      cause
    };
  }
});

/**
 * TODO: Display message depending on user.role.
 * ie. if (user.role === admin) ...
 */
</script>
