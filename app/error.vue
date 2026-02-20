<template>
  <div class="error-container">
    <div class="graphic">
      <NuxtImg
        src="/images/cbd-logo-white.svg"
        width="300"
        height="auto"
        class="cbd-logo"
        aria-hidden="true"
        />
    </div>
    <ErrorMessage :statusCode="statusCode" :url="url" />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "nuxt/app"
import ErrorMessage from "./components/error-message.vue";

const props = defineProps<{
  error: NuxtError;
}>();

const statusCode = computed(() => props.error?.statusCode)
const url = computed(() => (props.error as any)?.url as string | undefined)
</script>

<style scoped>
@import "https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wdth,wght@0,62.5..100,100..900;1,62.5..100,100..900&display=swap";

.error-container {
  --cbd-green: #009c48;
  --gradient-green: #004e24;
  --white: #fff;
  --text-color: #1a1a1a;
  font-size: 16px;
  font-family: "Noto Sans", sans-serif;
  scroll-behavior: smooth;
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
  display: flex;
  overflow: hidden;
}

.error-heading {
  color: var(--cbd-green);
}

h1.error-heading {
  font-size: 2.4rem;
  margin: 0 0 0.5rem;
}

.graphic {
  flex: 1 1 60%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  background: linear-gradient(45deg, var(--gradient-green), var(--cbd-green));
  clip-path: polygon(0 0, 70% 0, 100% 100%, 0 100%);

  .cbd-logo {
    width: 75%;
  }
}

@media (max-width: 900px) {
  .error-container {
    flex-direction: column-reverse;
    overflow: auto;
  }
  .graphic {
    height: 50%;
    flex: 1 1 auto;
    justify-content: center;
    clip-path: none;

    .cbd-logo {
      width: auto;
      height: calc(100% - 2rem);
    }
  }
}
</style>