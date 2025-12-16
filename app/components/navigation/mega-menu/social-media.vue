<template>
  <div class="social-media-follow">
    <div class="social-media-title">{{ t('followUs') }}</div>
    <div class="social-media-icons">
      <NuxtLink to="#" target="_blank"
        ><NuxtImg
          src="/images/icons/icon-social-yt.svg"
          :alt="t('youtube')"
          class="social-media-icon"
      /></NuxtLink>
      <NuxtLink to="#" target="_blank"
        ><NuxtImg
          src="/images/icons/icon-social-fb.svg"
          :alt="t('facebook')"
          class="social-media-icon"
      /></NuxtLink>
      <NuxtLink to="#" target="_blank"
        ><NuxtImg
          src="/images/icons/icon-social-x.svg"
          :alt="t('x')"
          class="social-media-icon"
      /></NuxtLink>
      <NuxtLink to="#" target="_blank"
        ><NuxtImg
          src="/images/icons/icon-social-li.svg"
          :alt="t('linkedin')"
          class="social-media-icon"
      /></NuxtLink>
      <NuxtLink to="#" target="_blank"
        ><NuxtImg
          src="/images/icons/icon-social-ig.svg"
          :alt="t('instagram')"
          class="social-media-icon"
      /></NuxtLink>
    </div>
  </div>
</template>
<i18n
  src="~~/i18n/dist/app/components/navigation/mega-menu/social-media.json"
></i18n>

<script setup lang="ts">
const { t } = useI18n()
</script>
