<template>
    <section class="content-row d-flex flex-column">
        <div class="row-title">
            {{ t('portals') }}
        </div>
        <div class="content-wrapper d-flex">
            <portal-card v-if="!isError" v-for="portal in items" :portal="portal" :key="portal.position" />
            <status v-else :error="isError" />
        </div>
    </section>
</template>
<i18n src="~~/i18n/dist/app/components/portal/card-list.json"></i18n>

<script lang="ts" setup>
import usePortalsApi from '~/composables/api/use-portals-api';

const { t } = useI18n();

const props = defineProps<{
    portal: string;
}>();

const isError = ref<Error>();
const { getPortals } = usePortalsApi();
const items = await getPortals(encodeURIComponent(props.portal)).catch((error) => {
    isError.value = error;
    return [];
});
</script>
