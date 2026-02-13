<template>
    <section class="content-row d-flex flex-column">
        <div class="row-title">
            {{ t('portals') }}
        </div>
        <div class="content-wrapper d-flex">
            <status v-if="isLoading" />
            <status v-else-if="error" :error="error" />
            <portal-card
                v-else
                v-for="portal in portals"
                :portal="portal"
                :key="portal.position" />
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

const { portals, pending: isLoading, error } = usePortalsApi(encodeURIComponent(props.portal))
</script>
