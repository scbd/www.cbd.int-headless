<template>
  <div class="content-object statement">
    <div class="date">
      {{ statement.createdOn }}
    </div>

    <NuxtImg
      :src="statement.imageUrl"
      class="content-image"
      loading="lazy"
      :placeholder="IMAGE_FALLBACK"
    />

    <div class="title">{{ statement.fullTitle }}</div>

    <div v-if="statement.themes" class="subjects">
      Subjects: {{ statement.themes[locale] }}
    </div>

    <div class="read-on-wrapper">
      <NuxtLink :to="statement.url" class="read-on">View statement</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Statement } from '~~/types/statement';
import { formatDate } from '~~/utils/date';
import { IMAGE_FALLBACK } from '~~/constants/image-paths';

const { t, locale } = useI18n();

const props = defineProps<{
  statement: Statement;
}>();

const statement = computed(() => {
  return {
    ...props.statement,
    fullTitle: `${props.statement.code} - ${
      props.statement.title[locale.value]
    }`,
    createdOn: formatDate(props.statement.createdOn, locale.value),
    themes: props.statement.themes.find((l) => l[locale.value]),
    url: props.statement.urls[0] ?? '#',
    /**
     * To be replaced with proper image handling when available;
     * WILL BE REMOVED SOON
     */
    imageUrl: `/content/images/notifications/${props.statement.code}.jpg`
  };
});
</script>
