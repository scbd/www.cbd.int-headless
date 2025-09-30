<template>
  <div class="social-media-follow">
    <div class="social-media-title">Follow us on social media</div>
    <div class="social-media-icons">
      <NuxtLink to="#" target="_blank"
        ><NuxtImg
          src="/images/icons/icon-social-yt.svg"
          alt="Follow us on YouTube"
          class="social-media-icon"
      /></NuxtLink>
      <NuxtLink to="#" target="_blank"
        ><NuxtImg
          src="/images/icons/icon-social-fb.svg"
          alt="Follow us on Facebook"
          class="social-media-icon"
      /></NuxtLink>
      <NuxtLink to="#" target="_blank"
        ><NuxtImg
          src="/images/icons/icon-social-x.svg"
          alt="Follow us on X"
          class="social-media-icon"
      /></NuxtLink>
      <NuxtLink to="#" target="_blank"
        ><NuxtImg
          src="/images/icons/icon-social-li.svg"
          alt="Follow us on LinkedIn"
          class="social-media-icon"
      /></NuxtLink>
      <NuxtLink to="#" target="_blank"
        ><NuxtImg
          src="/images/icons/icon-social-ig.svg"
          alt="Follow us on Instagram"
          class="social-media-icon"
      /></NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>
