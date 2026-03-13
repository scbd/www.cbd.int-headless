<template>
  <article class="cus-article container-xxl d-flex flex-column page-component">
    <h1>{{ t('calendarOfActivities') }}</h1>
    <div class="filter-and-sort-wrapper container-fluid">
      <button
        class="btn cbd-btn-outline-icon filter-and-sort"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#calendarSearchForm"
        aria-controls="calendarSearchForm"
        aria-expanded="true"
      >
        {{ t('filterAndSort') }}
      </button>

      <form
        id="calendarSearchForm"
        class="filter-and-sort-form collapse show"
        action="#"
        @submit.prevent="onSearch"
      >
        <!-- Text search -->
        <label for="calSearch" class="w-100">
          {{ t('searchText') }}
          <input
            id="calSearch"
            v-model="searchText"
            type="text"
            class="form-control"
            :placeholder="t('searchPlaceholder')"
          />
        </label>

        <div class="row g-3 mt-1">
          <!-- Record type filter -->
          <div class="col-12 col-md-6 col-lg-4">
            <label for="calRecordType">{{ t('recordType') }}</label>
            <Multiselect
              id="calRecordType"
              v-model="selectedTypes"
              :options="recordTypeOptions"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :show-labels="false"
              label="label"
              track-by="value"
              :placeholder="t('selectTypes')"
              @select="onFilterChange"
              @remove="onFilterChange"
            >
              <template #option="{ option }">
                <span>{{ option.label }}</span>
                <span v-if="option.count != null" class="badge rounded-pill bg-secondary ms-1">{{ option.count }}</span>
              </template>
              <template #tag="{ option, remove }">
                <span class="multiselect__tag">
                  <span>{{ option.label }}</span>
                  <span v-if="option.count != null" class="badge rounded-pill bg-secondary ms-1">{{ option.count }}</span>
                  <i class="multiselect__tag-icon" tabindex="0" @click="remove(option)" @keydown.enter="remove(option)" />
                </span>
              </template>
            </Multiselect>
          </div>

          <!-- Activity types filter -->
          <div v-if="showActivityTypesFilter" class="col-12 col-md-6 col-lg-4">
            <label for="calActivityTypes">{{ t('activityTypes') }}</label>
            <Multiselect
              id="calActivityTypes"
              v-model="selectedActivityTypes"
              :options="activityTypeOptions"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :show-labels="false"
              label="label"
              track-by="value"
              :placeholder="t('selectActivityTypes')"
              @select="onFilterChange"
              @remove="onFilterChange"
            >
              <template #option="{ option }">
                <span>{{ option.label }}</span>
                <span v-if="option.count != null" class="badge rounded-pill bg-secondary ms-1">{{ option.count }}</span>
              </template>
              <template #tag="{ option, remove }">
                <span class="multiselect__tag">
                  <span>{{ option.label }}</span>
                  <i class="multiselect__tag-icon" tabindex="0" @click="remove(option)" @keydown.enter="remove(option)" />
                </span>
              </template>
            </Multiselect>
          </div>

          <!-- Status filter -->
          <div class="col-12 col-md-6 col-lg-4">
            <label for="calStatuses">{{ t('statuses') }}</label>
            <Multiselect
              id="calStatuses"
              v-model="selectedStatuses"
              :options="statusOptions"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :show-labels="false"
              label="label"
              track-by="value"
              :placeholder="t('selectStatuses')"
              @select="onFilterChange"
              @remove="onFilterChange"
            >
              <template #option="{ option }">
                <span>{{ option.label }}</span>
                <span v-if="option.count != null" class="badge rounded-pill bg-secondary ms-1">{{ option.count }}</span>
              </template>
              <template #tag="{ option, remove }">
                <span class="multiselect__tag">
                  <span>{{ option.label }}</span>
                  <i class="multiselect__tag-icon" tabindex="0" @click="remove(option)" @keydown.enter="remove(option)" />
                </span>
              </template>
            </Multiselect>
          </div>

          <!-- Subjects filter -->
          <div class="col-12 col-md-6 col-lg-4">
            <label for="calSubjects">{{ t('subjects') }}</label>
            <Multiselect
              id="calSubjects"
              v-model="selectedSubjects"
              :options="subjectOptions"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :show-labels="false"
              label="label"
              track-by="value"
              :placeholder="t('selectSubjects')"
              @select="onFilterChange"
              @remove="onFilterChange"
            >
              <template #option="{ option }">
                <span>{{ option.label }}</span>
                <span v-if="option.count != null" class="badge rounded-pill bg-secondary ms-1">{{ option.count }}</span>
              </template>
              <template #tag="{ option, remove }">
                <span class="multiselect__tag">
                  <span>{{ option.label }}</span>
                  <i class="multiselect__tag-icon" tabindex="0" @click="remove(option)" @keydown.enter="remove(option)" />
                </span>
              </template>
            </Multiselect>
          </div>

          <!-- Governing & Subsidiary Bodies filter (grouped) -->
          <div class="col-12 col-md-6 col-lg-4">
            <label for="calBodies">{{ t('governingAndSubsidiaryBodies') }}</label>
            <Multiselect
              id="calBodies"
              v-model="selectedBodies"
              :options="bodyFilterOptions"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :show-labels="false"
              group-values="options"
              group-label="groupLabel"
              label="label"
              track-by="value"
              :placeholder="t('selectBodies')"
              @select="onFilterChange"
              @remove="onFilterChange"
            >
              <template #option="slotProps">
                <span v-if="slotProps?.option?.$groupLabel">
                  {{ slotProps.option.$groupLabel }}
                </span>
                <span v-else>
                  {{ slotProps?.option?.label }}
                  <span v-if="slotProps?.option?.count != null" class="badge rounded-pill bg-secondary ms-1">{{ slotProps.option.count }}</span>
                </span>
              </template>
              <template #tag="{ option, remove }">
                <span class="multiselect__tag">
                  <span>{{ option.label }}</span>
                  <i class="multiselect__tag-icon" tabindex="0" @click="remove(option)" @keydown.enter="remove(option)" />
                </span>
              </template>
            </Multiselect>
          </div>

          <!-- COP Decisions filter -->
          <div class="col-12 col-md-6 col-lg-4">
            <label for="calDecisions">{{ t('copDecisions') }}</label>
            <Multiselect
              id="calDecisions"
              v-model="selectedCopDecisions"
              :options="decisionOptions"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :show-labels="false"
              label="label"
              track-by="value"
              :placeholder="t('selectDecisions')"
              @select="onFilterChange"
              @remove="onFilterChange"
            >
              <template #option="{ option }">
                <span>{{ option.label }}</span>
                <span v-if="option.count != null" class="badge rounded-pill bg-secondary ms-1">{{ option.count }}</span>
              </template>
              <template #tag="{ option, remove }">
                <span class="multiselect__tag">
                  <span>{{ option.label }}</span>
                  <i class="multiselect__tag-icon" tabindex="0" @click="remove(option)" @keydown.enter="remove(option)" />
                </span>
              </template>
            </Multiselect>
          </div>

          <!-- GBF Targets & Sections filter (grouped) -->
          <div class="col-12">
            <label for="calGbf">{{ t('gbfTargetsAndSections') }}</label>
            <Multiselect
              id="calGbf"
              v-model="selectedGbfItems"
              :options="gbfFilterOptions"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :show-labels="false"
              group-values="options"
              group-label="groupLabel"
              label="label"
              track-by="value"
              :placeholder="t('selectGbf')"
              @select="onFilterChange"
              @remove="onFilterChange"
            >
              <template #option="slotProps">
                <span v-if="slotProps?.option?.$groupLabel">
                  {{ slotProps.option.$groupLabel }}
                </span>
                <span v-else>
                  {{ slotProps?.option?.label }}
                  <span v-if="slotProps?.option?.count != null" class="badge rounded-pill bg-secondary ms-1">{{ slotProps.option.count }}</span>
                </span>
              </template>
              <template #tag="{ option, remove }">
                <span class="multiselect__tag">
                  <span>{{ option.label }}</span>
                  <i class="multiselect__tag-icon" tabindex="0" @click="remove(option)" @keydown.enter="remove(option)" />
                </span>
              </template>
            </Multiselect>
          </div>

          <!-- Countries filter -->
          <div class="col-12 col-md-6 col-lg-4">
            <label for="calCountries">{{ t('countries') }}</label>
            <Multiselect
              id="calCountries"
              v-model="selectedCountries"
              :options="countryOptions"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :show-labels="false"
              label="label"
              track-by="value"
              :placeholder="t('selectCountries')"
              @select="onFilterChange"
              @remove="onFilterChange"
            >
              <template #option="{ option }">
                <span>{{ option.label }}</span>
                <span v-if="option.count != null" class="badge rounded-pill bg-secondary ms-1">{{ option.count }}</span>
              </template>
              <template #tag="{ option, remove }">
                <span class="multiselect__tag">
                  <span>{{ option.label }}</span>
                  <i class="multiselect__tag-icon" tabindex="0" @click="remove(option)" @keydown.enter="remove(option)" />
                </span>
              </template>
            </Multiselect>
          </div>

          <!-- Date range -->
          <div class="col-12 col-md-6 col-lg-4">
            <label>{{ t('dateRange') }}</label>
            <div class="row g-2">
              <div class="col-6">
                <label for="calStartDate" class="visually-hidden">{{ t('startDate') }}</label>
                <input
                  id="calStartDate"
                  v-model="startDate"
                  type="date"
                  class="form-control form-control-sm"
                  :aria-label="t('startDate')"
                  @input="onStartDateManualInput"
                />
              </div>
              <div class="col-6">
                <label for="calEndDate" class="visually-hidden">{{ t('endDate') }}</label>
                <input
                  id="calEndDate"
                  v-model="endDate"
                  type="date"
                  class="form-control form-control-sm"
                  :aria-label="t('endDate')"
                  @input="onFilterChange"
                />
              </div>
            </div>
          </div>

          <!-- Action required checkbox -->
          <div class="col-12 col-md-6 col-lg-4">
            <div class="form-check mt-md-4">
              <input
                id="calActionReq"
                v-model="actionRequired"
                type="checkbox"
                class="form-check-input"
                @change="onFilterChange"
              />
              <label for="calActionReq" class="form-check-label">{{ t('actionRequired') }}</label>
            </div>
          </div>
        </div>

        <!-- Sort -->
        <div class="row g-3 mt-1">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="form_section-options column">
              <div class="form_section-header">{{ t('sort') }}</div>
              <div class="form_section-options">
                <Multiselect
                  id="calSort"
                  v-model="selectedSort"
                  :options="sortOptions"
                  :multiple="false"
                  :allow-empty="false"
                  :show-labels="false"
                  label="label"
                  track-by="value"
                  @select="onFilterChange"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-3">
          <input class="btn cbd-btn-primary" type="submit" :value="t('search')" />
          <button type="button" class="btn cbd-btn-outline ms-2" @click="clearFilters">{{ t('clear') }}</button>
        </div>

        <!-- Active filter pills -->
        <div v-if="activeFilters.length" class="search-terms mt-3">
          <span class="fw-semibold me-2">{{ t('appliedFilters') }}:</span>
          <span v-for="filter in activeFilters" :key="filter.key" class="badge me-1 mb-1">
            {{ filter.label }} {{ filter.displayValue }}
            <button
              type="button"
              class="btn-close btn-close-white ms-1"
              :aria-label="`Remove ${filter.label} filter`"
              @click="removeFilter(filter.key)"
            />
          </span>
        </div>
      </form>
    </div>
  </article>
</template>
<i18n src="~~/i18n/dist/app/components/calendar-activity/search.json"></i18n>

<script setup lang="ts">
import type { CalendarSearchParams, CalendarFilterOption, ParsedFacets } from '~~/types/calendar-activity';
import type { ActiveFilter } from '~~/types/api/search-result';

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();

// ---------------------------------------------------------------------------
// Props & Emits
// ---------------------------------------------------------------------------

const props = defineProps<{
  facets?: ParsedFacets;
}>();

const emit = defineEmits<{
  search: [params: CalendarSearchParams];
}>();

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_SORT = 'startDate:asc';

const MANAGED_QUERY_KEYS = new Set([
  'types', 'subjects', 'statuses', 'subsidiaryBodies', 'governingBodies',
  'copDecisions', 'activityTypes', 'globalTargets', 'gbfSections',
  'countries', 'sort', 'startDate', 'endDate', 'actionRequired', 'searchText',
]);

// ---------------------------------------------------------------------------
// Types for grouped multiselects
// ---------------------------------------------------------------------------

interface BodyFilterOption extends CalendarFilterOption {
  bodyGroup: 'governingBodies' | 'subsidiaryBodies';
}

interface GbfFilterOption extends CalendarFilterOption {
  gbfGroup: 'gbfSections' | 'globalTargets';
}

interface GroupedOptions<T extends CalendarFilterOption> {
  groupLabel: string;
  options: T[];
}

// ---------------------------------------------------------------------------
// Filter state
// ---------------------------------------------------------------------------

const searchText = ref('');
const selectedTypes = ref<CalendarFilterOption[]>([]);
const selectedActivityTypes = ref<CalendarFilterOption[]>([]);
const selectedSubjects = ref<CalendarFilterOption[]>([]);
const selectedStatuses = ref<CalendarFilterOption[]>([]);
const selectedBodies = ref<BodyFilterOption[]>([]);
const selectedCopDecisions = ref<CalendarFilterOption[]>([]);
const selectedGbfItems = ref<GbfFilterOption[]>([]);
const selectedCountries = ref<CalendarFilterOption[]>([]);
const startDate = ref('');
const endDate = ref('');
const actionRequired = ref(false);
const selectedSort = ref<CalendarFilterOption | null>(null);
const startDateIsAutoApplied = ref(true);
const isLoadingFromUrl = ref(false);

// ---------------------------------------------------------------------------
// Thesaurus filter options
// ---------------------------------------------------------------------------

const facetsRef = computed<ParsedFacets>(() => props.facets ?? {});

const {
  recordTypeOptions,
  subjectOptions,
  governingBodyOptions,
  subsidiaryBodyOptions,
  activityTypeOptions,
  globalTargetOptions,
  gbfSectionOptions,
  countryOptions,
  statusOptions,
  decisionOptions,
} = useCalendarThesaurusFilters({
  locale: computed(() => locale.value),
  facets: facetsRef,
});

// ---------------------------------------------------------------------------
// Sort options
// ---------------------------------------------------------------------------

const sortOptions = computed<CalendarFilterOption[]>(() => [
  { value: 'startDate:asc', label: t('sortStartDateAsc') },
  { value: 'startDate:desc', label: t('sortStartDateDesc') },
  { value: 'endDate:asc', label: t('sortEndDateAsc') },
  { value: 'endDate:desc', label: t('sortEndDateDesc') },
]);

// ---------------------------------------------------------------------------
// Grouped filter options
// ---------------------------------------------------------------------------

const bodyFilterOptions = computed<GroupedOptions<BodyFilterOption>[]>(() => {
  const groups: GroupedOptions<BodyFilterOption>[] = [];

  if (governingBodyOptions.value.length > 0) {
    groups.push({
      groupLabel: t('governingBodies'),
      options: governingBodyOptions.value.map((opt) => ({ ...opt, bodyGroup: 'governingBodies' as const })),
    });
  }

  if (subsidiaryBodyOptions.value.length > 0) {
    groups.push({
      groupLabel: t('subsidiaryBodies'),
      options: subsidiaryBodyOptions.value.map((opt) => ({ ...opt, bodyGroup: 'subsidiaryBodies' as const })),
    });
  }

  return groups;
});

const gbfFilterOptions = computed<GroupedOptions<GbfFilterOption>[]>(() => {
  const groups: GroupedOptions<GbfFilterOption>[] = [];

  if (gbfSectionOptions.value.length > 0) {
    groups.push({
      groupLabel: t('gbfSections'),
      options: gbfSectionOptions.value.map((opt) => ({ ...opt, gbfGroup: 'gbfSections' as const })),
    });
  }

  if (globalTargetOptions.value.length > 0) {
    groups.push({
      groupLabel: t('gbfTargets'),
      options: globalTargetOptions.value.map((opt) => ({ ...opt, gbfGroup: 'globalTargets' as const })),
    });
  }

  return groups;
});

// ---------------------------------------------------------------------------
// Activity types visibility (MR-05)
// ---------------------------------------------------------------------------

const showActivityTypesFilter = computed<boolean>(() => {
  const typeValues = selectedTypes.value.map((t) => t.value);

  return typeValues.length === 0 || typeValues.includes('calendarActivity');
});

// ---------------------------------------------------------------------------
// Value extraction helpers
// ---------------------------------------------------------------------------

function extractValues(selection: CalendarFilterOption[]): string[] {
  return selection.map((item) => item.value).filter(Boolean);
}

function extractBodyValuesByGroup(group: 'governingBodies' | 'subsidiaryBodies'): string[] {
  return selectedBodies.value
    .filter((item) => item.bodyGroup === group)
    .map((item) => item.value);
}

function extractGbfValuesByGroup(group: 'gbfSections' | 'globalTargets'): string[] {
  return selectedGbfItems.value
    .filter((item) => item.gbfGroup === group)
    .map((item) => item.value);
}

// ---------------------------------------------------------------------------
// Build CalendarSearchParams from current state
// ---------------------------------------------------------------------------

function buildSearchParams(): CalendarSearchParams {
  const params: CalendarSearchParams = {};

  const types = extractValues(selectedTypes.value);

  if (types.length) params.types = types;

  const subjects = extractValues(selectedSubjects.value);

  if (subjects.length) params.subjects = subjects;

  const statuses = extractValues(selectedStatuses.value);

  if (statuses.length) params.statuses = statuses;

  const subsidiaryBodies = extractBodyValuesByGroup('subsidiaryBodies');

  if (subsidiaryBodies.length) params.subsidiaryBodies = subsidiaryBodies;

  const governingBodies = extractBodyValuesByGroup('governingBodies');

  if (governingBodies.length) params.governingBodies = governingBodies;

  const copDecisions = extractValues(selectedCopDecisions.value);

  if (copDecisions.length) params.copDecisions = copDecisions;

  const activityTypes = extractValues(selectedActivityTypes.value);

  if (activityTypes.length) params.activityTypes = activityTypes;

  const globalTargets = extractGbfValuesByGroup('globalTargets');

  if (globalTargets.length) params.globalTargets = globalTargets;

  const gbfSections = extractGbfValuesByGroup('gbfSections');

  if (gbfSections.length) params.gbfSections = gbfSections;

  const countries = extractValues(selectedCountries.value);

  if (countries.length) params.countries = countries;

  if (startDate.value) params.startDate = startDate.value;

  if (endDate.value) params.endDate = endDate.value;

  if (actionRequired.value) params.actionRequired = true;

  const normalizedSearch = searchText.value.trim();

  if (normalizedSearch) params.searchText = normalizedSearch;

  const sortValue = selectedSort.value?.value ?? DEFAULT_SORT;

  if (sortValue !== DEFAULT_SORT) params.sort = sortValue;

  return params;
}

// ---------------------------------------------------------------------------
// URL sync
// ---------------------------------------------------------------------------

function parseQueryArray(param: string | string[] | undefined): string[] {
  if (!param) return [];
  if (Array.isArray(param)) return param.filter(Boolean);

  return String(param).split(',').filter(Boolean);
}

function toProvisionalOptions(values: string[]): CalendarFilterOption[] {
  return values.map((v) => ({ value: v, label: v }));
}

function updateUrl(): void {
  if (isLoadingFromUrl.value) return;

  const preserved: Record<string, string | string[]> = {};

  for (const [key, value] of Object.entries(route.query)) {
    if (!MANAGED_QUERY_KEYS.has(key) && value != null) {
      preserved[key] = value as string | string[];
    }
  }

  const query: Record<string, string | undefined> = { ...preserved } as Record<string, string | undefined>;

  const types = extractValues(selectedTypes.value);

  if (types.length) query.types = types.join(',');

  const subjects = extractValues(selectedSubjects.value);

  if (subjects.length) query.subjects = subjects.join(',');

  const statuses = extractValues(selectedStatuses.value);

  if (statuses.length) query.statuses = statuses.join(',');

  const subsidiaryBodies = extractBodyValuesByGroup('subsidiaryBodies');

  if (subsidiaryBodies.length) query.subsidiaryBodies = subsidiaryBodies.join(',');

  const governingBodies = extractBodyValuesByGroup('governingBodies');

  if (governingBodies.length) query.governingBodies = governingBodies.join(',');

  const copDecisions = extractValues(selectedCopDecisions.value);

  if (copDecisions.length) query.copDecisions = copDecisions.join(',');

  const activityTypes = extractValues(selectedActivityTypes.value);

  if (activityTypes.length) query.activityTypes = activityTypes.join(',');

  const globalTargets = extractGbfValuesByGroup('globalTargets');

  if (globalTargets.length) query.globalTargets = globalTargets.join(',');

  const gbfSections = extractGbfValuesByGroup('gbfSections');

  if (gbfSections.length) query.gbfSections = gbfSections.join(',');

  const countries = extractValues(selectedCountries.value);

  if (countries.length) query.countries = countries.join(',');

  const sortValue = selectedSort.value?.value ?? DEFAULT_SORT;

  if (sortValue !== DEFAULT_SORT) query.sort = sortValue;

  if (startDate.value) query.startDate = startDate.value;

  if (endDate.value) query.endDate = endDate.value;

  if (actionRequired.value) query.actionRequired = 'true';

  const normalizedSearch = searchText.value.trim();

  if (normalizedSearch) query.searchText = normalizedSearch;

  router.replace({ query });
}

function readFromUrl(): void {
  isLoadingFromUrl.value = true;

  const query = route.query;

  const types = parseQueryArray(query.types as string | undefined);
  const subjects = parseQueryArray(query.subjects as string | undefined);
  const statuses = parseQueryArray(query.statuses as string | undefined);
  const subsidiaryBodies = parseQueryArray(query.subsidiaryBodies as string | undefined);
  const governingBodies = parseQueryArray(query.governingBodies as string | undefined);
  const copDecisions = parseQueryArray(query.copDecisions as string | undefined);
  const activityTypes = parseQueryArray(query.activityTypes as string | undefined);
  const globalTargets = parseQueryArray(query.globalTargets as string | undefined);
  const gbfSections = parseQueryArray(query.gbfSections as string | undefined);
  const countries = parseQueryArray(query.countries as string | undefined);

  selectedTypes.value = types.length ? toProvisionalOptions(types) : [];
  selectedSubjects.value = subjects.length ? toProvisionalOptions(subjects) : [];
  selectedStatuses.value = statuses.length ? toProvisionalOptions(statuses) : [];

  const provisionalBodies: BodyFilterOption[] = [
    ...governingBodies.map((v) => ({ value: v, label: v, bodyGroup: 'governingBodies' as const })),
    ...subsidiaryBodies.map((v) => ({ value: v, label: v, bodyGroup: 'subsidiaryBodies' as const })),
  ];

  selectedBodies.value = provisionalBodies;

  selectedCopDecisions.value = copDecisions.length ? toProvisionalOptions(copDecisions) : [];
  selectedActivityTypes.value = activityTypes.length ? toProvisionalOptions(activityTypes) : [];

  const provisionalGbf: GbfFilterOption[] = [
    ...gbfSections.map((v) => ({ value: v, label: v, gbfGroup: 'gbfSections' as const })),
    ...globalTargets.map((v) => ({ value: v, label: v, gbfGroup: 'globalTargets' as const })),
  ];

  selectedGbfItems.value = provisionalGbf;

  selectedCountries.value = countries.length ? toProvisionalOptions(countries) : [];

  // Sort
  const sortParam = typeof query.sort === 'string' ? query.sort : '';

  if (sortParam) {
    const matched = sortOptions.value.find((o) => o.value === sortParam);

    selectedSort.value = matched ?? sortOptions.value[0];
  } else {
    selectedSort.value = sortOptions.value[0] ?? null;
  }

  // Date
  if (typeof query.startDate === 'string' && query.startDate) {
    startDate.value = query.startDate;
    startDateIsAutoApplied.value = false;
  }

  if (typeof query.endDate === 'string' && query.endDate) {
    endDate.value = query.endDate;
  }

  // Action required
  actionRequired.value = query.actionRequired === 'true';

  // Search text
  searchText.value = typeof query.searchText === 'string' ? query.searchText : '';

  nextTick(() => {
    isLoadingFromUrl.value = false;
  });
}

// ---------------------------------------------------------------------------
// Active filter pills
// ---------------------------------------------------------------------------

function buildActiveFilters(): ActiveFilter[] {
  const filters: ActiveFilter[] = [];

  if (searchText.value.trim()) {
    filters.push({ key: 'searchText', label: t('searchText'), displayValue: searchText.value.trim() });
  }

  for (const item of selectedTypes.value) {
    filters.push({ key: `type:${item.value}`, label: t('recordType'), displayValue: item.label });
  }

  for (const item of selectedActivityTypes.value) {
    filters.push({ key: `activityType:${item.value}`, label: t('activityTypes'), displayValue: item.label });
  }

  for (const item of selectedSubjects.value) {
    filters.push({ key: `subject:${item.value}`, label: t('subjects'), displayValue: item.label });
  }

  for (const item of selectedStatuses.value) {
    filters.push({ key: `status:${item.value}`, label: t('statuses'), displayValue: item.label });
  }

  for (const item of selectedBodies.value) {
    const group = item.bodyGroup === 'governingBodies' ? t('governingBodies') : t('subsidiaryBodies');

    filters.push({ key: `body:${item.bodyGroup}:${item.value}`, label: group, displayValue: item.label });
  }

  for (const item of selectedCopDecisions.value) {
    filters.push({ key: `copDecision:${item.value}`, label: t('copDecisions'), displayValue: item.label });
  }

  for (const item of selectedGbfItems.value) {
    const group = item.gbfGroup === 'gbfSections' ? t('gbfSections') : t('gbfTargets');

    filters.push({ key: `gbf:${item.gbfGroup}:${item.value}`, label: group, displayValue: item.label });
  }

  for (const item of selectedCountries.value) {
    filters.push({ key: `country:${item.value}`, label: t('countries'), displayValue: item.label });
  }

  if (startDate.value) {
    filters.push({ key: 'startDate', label: t('startDate'), displayValue: startDate.value });
  }

  if (endDate.value) {
    filters.push({ key: 'endDate', label: t('endDate'), displayValue: endDate.value });
  }

  if (actionRequired.value) {
    filters.push({ key: 'actionRequired', label: t('actionRequired'), displayValue: '✓' });
  }

  return filters;
}

const activeFilters = ref<ActiveFilter[]>([]);

function removeFilter(key: string): void {
  if (key === 'searchText') {
    searchText.value = '';
  } else if (key === 'startDate') {
    startDate.value = '';
    startDateIsAutoApplied.value = false;
  } else if (key === 'endDate') {
    endDate.value = '';
  } else if (key === 'actionRequired') {
    actionRequired.value = false;
  } else if (key.startsWith('type:')) {
    const value = key.slice('type:'.length);

    selectedTypes.value = selectedTypes.value.filter((i) => i.value !== value);
  } else if (key.startsWith('activityType:')) {
    const value = key.slice('activityType:'.length);

    selectedActivityTypes.value = selectedActivityTypes.value.filter((i) => i.value !== value);
  } else if (key.startsWith('subject:')) {
    const value = key.slice('subject:'.length);

    selectedSubjects.value = selectedSubjects.value.filter((i) => i.value !== value);
  } else if (key.startsWith('status:')) {
    const value = key.slice('status:'.length);

    selectedStatuses.value = selectedStatuses.value.filter((i) => i.value !== value);
  } else if (key.startsWith('body:')) {
    const parts = key.split(':');
    const bodyGroup = parts[1] as 'governingBodies' | 'subsidiaryBodies';
    const value = parts[2];

    selectedBodies.value = selectedBodies.value.filter(
      (i) => !(i.value === value && i.bodyGroup === bodyGroup),
    );
  } else if (key.startsWith('copDecision:')) {
    const value = key.slice('copDecision:'.length);

    selectedCopDecisions.value = selectedCopDecisions.value.filter((i) => i.value !== value);
  } else if (key.startsWith('gbf:')) {
    const parts = key.split(':');
    const gbfGroup = parts[1] as 'gbfSections' | 'globalTargets';
    const value = parts[2];

    selectedGbfItems.value = selectedGbfItems.value.filter(
      (i) => !(i.value === value && i.gbfGroup === gbfGroup),
    );
  } else if (key.startsWith('country:')) {
    const value = key.slice('country:'.length);

    selectedCountries.value = selectedCountries.value.filter((i) => i.value !== value);
  }

  onSearch();
}

// ---------------------------------------------------------------------------
// Search & clear
// ---------------------------------------------------------------------------

function onSearch(): void {
  activeFilters.value = buildActiveFilters();
  updateUrl();
  emit('search', buildSearchParams());
}

function onFilterChange(): void {
  onSearch();
}

function onStartDateManualInput(): void {
  startDateIsAutoApplied.value = false;
  onSearch();
}

function clearFilters(): void {
  searchText.value = '';
  selectedTypes.value = [];
  selectedActivityTypes.value = [];
  selectedSubjects.value = [];
  selectedStatuses.value = [];
  selectedBodies.value = [];
  selectedCopDecisions.value = [];
  selectedGbfItems.value = [];
  selectedCountries.value = [];
  startDate.value = '';
  endDate.value = '';
  actionRequired.value = false;
  selectedSort.value = sortOptions.value[0] ?? null;
  startDateIsAutoApplied.value = false;
  onSearch();
}

// ---------------------------------------------------------------------------
// Selection ↔ option synchronisation
// ---------------------------------------------------------------------------

function syncSelectionWithOptions(
  selection: Ref<CalendarFilterOption[]>,
  options: Ref<CalendarFilterOption[]> | ComputedRef<CalendarFilterOption[]>,
): void {
  watch(
    options,
    (newOptions) => {
      if (newOptions.length === 0) return;

      const optionMap = new Map(newOptions.map((opt) => [opt.value, opt]));
      const updated = selection.value
        .map((item) => optionMap.get(item.value))
        .filter((opt): opt is CalendarFilterOption => Boolean(opt));

      const changed =
        updated.length !== selection.value.length ||
        updated.some((opt, i) => {
          const current = selection.value[i];

          return !current || current.value !== opt.value || current.label !== opt.label;
        });

      if (changed) {
        selection.value = updated;
      }
    },
    { immediate: true },
  );
}

syncSelectionWithOptions(selectedTypes, recordTypeOptions);
syncSelectionWithOptions(selectedSubjects, subjectOptions);
syncSelectionWithOptions(selectedStatuses, statusOptions);
syncSelectionWithOptions(selectedCopDecisions, decisionOptions);
syncSelectionWithOptions(selectedActivityTypes, activityTypeOptions);
syncSelectionWithOptions(selectedCountries, countryOptions);

// Sync grouped bodies
watch(
  [governingBodyOptions, subsidiaryBodyOptions],
  ([newGov, newSub]) => {
    if (newGov.length === 0 && newSub.length === 0) return;

    const govMap = new Map(newGov.map((opt) => [opt.value, { ...opt, bodyGroup: 'governingBodies' as const }]));
    const subMap = new Map(newSub.map((opt) => [opt.value, { ...opt, bodyGroup: 'subsidiaryBodies' as const }]));

    const updated = selectedBodies.value
      .map((item) => {
        if (item.bodyGroup === 'governingBodies') return govMap.get(item.value);
        if (item.bodyGroup === 'subsidiaryBodies') return subMap.get(item.value);

        return govMap.get(item.value) ?? subMap.get(item.value);
      })
      .filter((opt): opt is BodyFilterOption => Boolean(opt));

    const changed =
      updated.length !== selectedBodies.value.length ||
      updated.some((opt, i) => {
        const current = selectedBodies.value[i];

        return !current || current.value !== opt.value || current.label !== opt.label;
      });

    if (changed) {
      selectedBodies.value = updated;
    }
  },
  { immediate: true },
);

// Sync grouped GBF items
watch(
  [gbfSectionOptions, globalTargetOptions],
  ([newSections, newTargets]) => {
    if (newSections.length === 0 && newTargets.length === 0) return;

    const sectionMap = new Map(newSections.map((opt) => [opt.value, { ...opt, gbfGroup: 'gbfSections' as const }]));
    const targetMap = new Map(newTargets.map((opt) => [opt.value, { ...opt, gbfGroup: 'globalTargets' as const }]));

    const updated = selectedGbfItems.value
      .map((item) => {
        if (item.gbfGroup === 'gbfSections') return sectionMap.get(item.value);
        if (item.gbfGroup === 'globalTargets') return targetMap.get(item.value);

        return sectionMap.get(item.value) ?? targetMap.get(item.value);
      })
      .filter((opt): opt is GbfFilterOption => Boolean(opt));

    const changed =
      updated.length !== selectedGbfItems.value.length ||
      updated.some((opt, i) => {
        const current = selectedGbfItems.value[i];

        return !current || current.value !== opt.value || current.label !== opt.label;
      });

    if (changed) {
      selectedGbfItems.value = updated;
    }
  },
  { immediate: true },
);

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

onMounted(() => {
  readFromUrl();

  // Apply today as default start date if no URL param was present
  if (!startDate.value) {
    const today = new Date().toISOString().slice(0, 10);

    startDate.value = today;
    startDateIsAutoApplied.value = true;
  }

  // Initialise sort if not set from URL
  if (!selectedSort.value) {
    selectedSort.value = sortOptions.value[0] ?? null;
  }

  // Emit initial search
  onSearch();
});
</script>

<style scoped>
.search-terms .badge {
  background-color: var(--cbd-green, #009b48);
  color: #ffffff;
  font-weight: 400;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  padding: 0.35em 0.65em;
}

.search-terms .btn-close {
  font-size: 0.55rem;
}
</style>
