<template>
  <li v-for="item in items" :key="item.id" class="nav-item">
    <NuxtLink class="nav-link" :to="item.url">
      {{ toLocaleText(item.title) }}
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
import type { SearchResult } from '~~/types/api/search-result';
import type { LString } from '@scbd/vue-components';
import useMeetingsApi from '~/composables/api/use-meetings';
import useNotificationsApi from '~/composables/api/use-notifications';
import useStatementsApi from '~/composables/api/use-statements';
import { useLString } from '~/composables/use-lstring';

const props = defineProps<{
  component: string;
}>();

const { toLocaleText } = useLString();

const contents: Record<string, () => Promise<SearchResult<{ id: string; title: LString; urls: string[] }>>> = {
  meetings: () => useMeetingsApi().getMeetings({ limit: 4 }),
  notifications: () => useNotificationsApi().getNotifications({ limit: 4 }),
  statements: () => useStatementsApi().getStatements({ limit: 4 })
};

const items = ref<{ id: string; title: LString; url: string }[]>([]);

const content = contents[props.component];

if (content) {
  const { rows } = await content().catch(() => ({ rows: [] }));

  items.value = rows.map((row) => ({
    id: row.id,
    title: row.title,
    url: row.urls?.[0] ?? '#',
  }));
}
</script>
