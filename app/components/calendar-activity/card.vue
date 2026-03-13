<template>
  <div
    class="content-object calendar-activity-card"
    :class="[`schema-${doc.schema}`]"
    :style="cardBackgroundStyle"
  >
    <div class="calendar-activity-card__header">
      <!-- Type-colored banner -->
      <div
        class="calendar-activity-card__type"
        :style="{ backgroundColor: typeColor.background, color: typeColor.text }"
      >
        {{ schemaLabel }}
        <template v-if="doc.schema === 'calendarActivity' && activityTypeLabel">
          &mdash; {{ activityTypeLabel }}
        </template>
      </div>

      <!-- Date range -->
      <div class="calendar-activity-card__date">
        {{ formattedDateRange }}
      </div>
    </div>

    <div class="calendar-activity-card__content">
      <!-- Title -->
      <div class="calendar-activity-card__title-row">
        <NuxtLink v-if="docUrl" :to="docUrl" class="calendar-activity-card__title">
          {{ displayTitle }}
        </NuxtLink>
        <span v-else class="calendar-activity-card__title">{{ displayTitle }}</span>
      </div>

      <!-- Status badge -->
      <div
        v-if="statusLabel || isActionRequired"
        class="calendar-activity-card__badges"
      >
        <span
          v-if="isActionRequired"
          class="badge bg-danger"
        >
          {{ t('actionRequired') }}
        </span>
        <span
          v-if="statusLabel"
          class="badge"
          :class="`bg-${statusColorClass}`"
        >
          {{ statusLabel }}
        </span>
      </div>

      <!-- Location (meetings only) -->
      <div v-if="meetingLocation" class="calendar-activity-card__location">
        {{ meetingLocation }}
      </div>

      <!-- Expand toggle -->
      <div class="calendar-activity-card__actions">
        <button
          class="btn cbd-btn-outline expand-toggle"
          :aria-expanded="isExpanded"
          :aria-controls="`detail-${doc.id}`"
          @click="$emit('toggle', doc.id)"
        >
          {{ isExpanded ? t('collapse') : t('expand') }}
        </button>
      </div>
    </div>
  </div>
</template>

<i18n src="~~/i18n/dist/app/components/calendar-activity/card.json"></i18n>

<script lang="ts" setup>
import type { CalendarDoc, MeetingDoc } from '~~/types/calendar-activity';
import {
  formatDateRange,
  normalizeTypeKey,
  getTypeColor,
  normalizeStatusKey,
  normalizeStatusLabel,
  statusColor,
  resolveCountryLabel,
} from '~~/utils/calendar';

const props = defineProps<{
  doc: CalendarDoc;
  isExpanded?: boolean;
}>();

defineEmits<{
  toggle: [id: string];
}>();

const { t } = useI18n();
const { toLocaleText } = useLString();

// ---------------------------------------------------------------------------
// Title
// ---------------------------------------------------------------------------

const displayTitle = computed(() => {
  const text = toLocaleText(props.doc.title);

  return text || t('untitled');
});

// ---------------------------------------------------------------------------
// Date range
// ---------------------------------------------------------------------------

const formattedDateRange = computed(() => formatDateRange(props.doc));

// ---------------------------------------------------------------------------
// Type color
// ---------------------------------------------------------------------------

const resolvedTypeKey = computed(() => {
  if (props.doc.schema === 'calendarActivity') {
    return normalizeTypeKey(props.doc.type ?? props.doc.schema);
  }

  return normalizeTypeKey(props.doc.schema);
});

const typeColor = computed(() => getTypeColor(resolvedTypeKey.value));

const cardBackgroundStyle = computed(() => {
  const hex = typeColor.value.background;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return { backgroundColor: `rgba(${r}, ${g}, ${b}, 0.15)` };
});

// ---------------------------------------------------------------------------
// Schema / type labels
// ---------------------------------------------------------------------------

const schemaLabel = computed(() => {
  const labelMap: Record<string, string> = {
    meeting: t('meeting'),
    notification: t('notification'),
    calendarActivity: t('activity'),
  };

  return labelMap[props.doc.schema] ?? props.doc.schema;
});

const activityTypeLabel = computed(() => {
  if (props.doc.schema !== 'calendarActivity') {
    return '';
  }

  const raw = props.doc.type;

  if (!raw) {
    return '';
  }

  // Strip the thesaurus prefix and humanize
  return raw
    .replace(/^CAL-ACTIVITY-TYPE-/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
});

// ---------------------------------------------------------------------------
// Status
// ---------------------------------------------------------------------------

const statusLabel = computed(() => {
  const rawStatus = props.doc.status;
  const statusKey = props.doc.statusKey;

  const normalizedKey = normalizeStatusKey(statusKey ?? rawStatus);

  if (normalizedKey === 'NOT_SET' || normalizedKey === 'PUBLISHED' || normalizedKey === 'NODATE') {
    return '';
  }

  return normalizeStatusLabel(normalizedKey, rawStatus ?? undefined);
});

const statusColorClass = computed(() => statusColor(props.doc));

// ---------------------------------------------------------------------------
// Action required
// ---------------------------------------------------------------------------

const isActionRequired = computed(() =>
  props.doc.actionRequired || props.doc.actionRequiredByParties || props.doc.actionRequiredByPartiesCOA,
);

// ---------------------------------------------------------------------------
// Location (meetings only)
// ---------------------------------------------------------------------------

const meetingLocation = computed(() => {
  if (props.doc.schema !== 'meeting') {
    return '';
  }

  const meeting = props.doc as MeetingDoc;
  const city = toLocaleText(meeting.eventCity);
  const country = toLocaleText(meeting.eventCountry);
  const resolvedCountry = country ? resolveCountryLabel(country) : '';
  const parts = [city, resolvedCountry].filter((p) => p && p.trim());

  return parts.join(', ');
});

// ---------------------------------------------------------------------------
// Detail URL
// ---------------------------------------------------------------------------

const docUrl = computed(() => {
  if (props.doc.url) {
    return props.doc.url;
  }

  return '';
});
</script>

<style scoped>
.calendar-activity-card {
  padding: 1rem;
  border-bottom: 1px solid var(--bs-border-color, #dee2e6);
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
}

.calendar-activity-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.calendar-activity-card__type {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.calendar-activity-card__date {
  font-size: 0.875rem;
  color: var(--bs-secondary-color, #6c757d);
  font-weight: 500;
}

.calendar-activity-card__content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.calendar-activity-card__title-row {
  display: flex;
  align-items: flex-start;
}

.calendar-activity-card__title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--bs-body-color, #212529);
  text-decoration: none;
}

a.calendar-activity-card__title:hover {
  color: var(--cbd-link-hover-color, #0f7abd);
  text-decoration: underline;
}

.calendar-activity-card__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.calendar-activity-card__location {
  font-size: 0.875rem;
  color: var(--bs-secondary-color, #6c757d);
}

.calendar-activity-card__actions {
  display: flex;
  align-items: center;
  margin-top: 0.25rem;
}

.expand-toggle {
  font-size: 0.8125rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--cbd-primary, #009b48);
  color: var(--cbd-primary, #009b48);
  background: transparent;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.expand-toggle:hover,
.expand-toggle:focus-visible {
  background: var(--cbd-primary, #009b48);
  color: #fff;
}

/* Responsive: stack header on small screens */
@media (max-width: 575.98px) {
  .calendar-activity-card__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
