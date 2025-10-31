<template>
    <div class="content-object portal">

        <NuxtImg :src="portal.imageUrl" class="content-image" loading="lazy" />

        <div class="title">{{ portal.title }}</div>

        <div class="read-on-wrapper">
            <NuxtLink :to="portal.url" class="read-on">View portal</NuxtLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Menu as Portal } from '~~/types/menu';
import { IMAGE_FALLBACK } from '~~/constants/image-paths';

const { t, locale } = useI18n();

const props = defineProps<{
    portal: Portal;
}>();

const portal = computed(() => {
    return {
        ...props.portal,
        imageUrl: props.portal.icon ? `/images/${props.portal.icon}` : IMAGE_FALLBACK
    };
});
</script>
