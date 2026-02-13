<template>
  <li v-for="item in items" :key="item.id" class="nav-item">
    <NuxtLink class="nav-link" :to="item.url">
      {{ toLocaleText(item.title) }}
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import useMeetingsApi from '~/composables/api/use-meetings';
import useNotificationsApi from '~/composables/api/use-notifications';
import useStatementsApi from '~/composables/api/use-statements';
import { useLString } from '~/composables/use-lstring';

const props = defineProps<{
  component: string;
}>();

const { toLocaleText } = useLString();

function getContent(component: string) {
  switch (component) {
    case 'meetings':       return useMeetingsApi({ limit: 4 }).meetings;
    case 'notifications':  return useNotificationsApi({ limit: 4 }).notifications;
    case 'statements':     return useStatementsApi({ limit: 4 }).statements;
  }
}

const rows = getContent(props.component);

const items = computed(() =>
  (rows?.value ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    url: row.urls?.[0] ?? '#',
  }))
);
</script>
