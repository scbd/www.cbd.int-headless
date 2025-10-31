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

<script lang="ts" setup>
import usePortalsApi from '~/composables/api/use-portals';

const { t } = useI18n();

const props = defineProps<{
    portals: string;
}>();

const isError = ref<Error>();
const { getPortals } = usePortalsApi();
const items = await getPortals(encodeURIComponent(props.portals)).catch((error) => {
    isError.value = error;
    return [];
});
</script>
