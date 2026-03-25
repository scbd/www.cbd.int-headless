<template>
    <article class="cus-article container-xxl d-flex flex-column page-component">
        <h1>{{ t('meetings')}}</h1>
        <div>
          <p><b>{{ t('codeOfConduct') }}</b></p>
          <p>| <NuxtLink to="/doc/meetings/un-system-code-conduct-harassment-ar.pdf" target="_blank" rel="noopener noreferrer">العربية</NuxtLink>| <NuxtLink to="/doc/meetings/un-system-code-conduct-harassment-en.pdf" target="_blank" rel="noopener noreferrer">English</NuxtLink> | <NuxtLink to="/doc/meetings/un-system-code-conduct-harassment-es.pdf" target="_blank" rel="noopener noreferrer">Español</NuxtLink> | <NuxtLink to="/doc/meetings/un-system-code-conduct-harassment-fr.pdf" target="_blank" rel="noopener noreferrer">Français</NuxtLink> | <NuxtLink to="/doc/meetings/un-system-code-conduct-harassment-ru.pdf" target="_blank" rel="noopener noreferrer">Русский</NuxtLink> | <NuxtLink to="/doc/meetings/un-system-code-conduct-harassment-zh.pdf" target="_blank" rel="noopener noreferrer">中文</NuxtLink> |</p>
          <p><NuxtImg src="/images/icons/icon-file-pdf.svg" :alt="t('upcomingMeetings')"></NuxtImg> <NuxtLink to="/doc/lists/events-scbd.pdf" rel="noopener noreferrer">{{ t('upcomingMeetings') }}</NuxtLink></p>
        </div>
        <div class="filter-and-sort-wrapper container-fluid">
            <button
                class="btn cbd-btn-outline-icon filter-and-sort"
                type="button"
                data-bs-toggle="collapse"
                aria-expanded="true"
                data-bs-target="#searchForm"
                aria-controls="searchForm"
            >
                {{ t('filterAndSort') }}
            </button>

            <form
                @submit.prevent="onSearch"
                action="#"
                id="searchForm"
                class="filter-and-sort-form collapse show"
            >

            <label for="fsTitle" class="w-100">
                {{ t('titleContains') }}
                <input
                    v-model="title"
                    id="fsTitle"
                    type="text"
                    class="form-control"
                />
            </label>

            <div class="col">
                <SearchSelect
                  ref="subjectSelectRef"
                  v-model="selectedThemes"
                  :domain=SUBJECTS
                  input-id="fsThemes"
                >
                  {{ t('themes') }}
                </SearchSelect>
            </div>

            <div class="filter-row row">
              <div class="form_section-options d-flex gap-3">
                  <label>
                      {{ t('startDate') }}
                      <input v-model="startDate" type="date" class="form-control" />
                  </label>
                  <label>
                      {{ t('endDate') }}
                      <input v-model="endDate" type="date" class="form-control" />
                  </label>
              </div>
            </div>

            <input class="btn cbd-btn-primary" type="submit" :value="t('search')" />

            <div v-if="activeFilters.length" class="search-terms">
                <span v-for="filter in activeFilters" :key="filter.key" class="badge">
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
<i18n src="~~/i18n/dist/app/components/meeting/search.json"></i18n>

<script setup lang="ts">
import { solrEscape, andOr } from '~~/utils/solr'
import type { ActiveFilter } from '~~/types/api/search-result'
import { useFormatDate } from '~/composables/use-format-date'
import { SUBJECTS } from '~~/constants/thesaurus'

const { t, locale } = useI18n()
const { toFormatDate, toFormatStartDay, toFormatEndDay } = useFormatDate()

const title = ref('')
const selectedThemes = ref('')
const startDate = ref<string | undefined>(undefined)
const endDate   = ref<string | undefined>(undefined)
const activeFilters = ref<ActiveFilter[]>([])

const subjectSelectRef = ref<{ getLabel: (id: string) => string } | null>(null)

const emit = defineEmits<{
  search: [params: { fieldQueries?: string, startDate?: string, endDate?: string }]
}>()


function buildActiveFilters (): ActiveFilter[] {
  const filters: ActiveFilter[] = []
  if (title.value.trim()) {
    filters.push({ key: 'title', label: t('title'), displayValue: title.value.trim() })
  }
  if (selectedThemes.value) {
    const label = subjectSelectRef.value?.getLabel(selectedThemes.value) ?? selectedThemes.value
    filters.push({ key: 'themes', label: t('themes'), displayValue: label })
  }
  if (startDate.value) {
    filters.push({ key: 'startDate', label: t('startDate'), displayValue: toFormatDate(startDate.value) })
  }
  if (endDate.value) {
    filters.push({ key: 'endDate', label: t('endDate'), displayValue: toFormatDate(endDate.value) })
  }
  return filters
}

function removeFilter (key: string) {
  if (key === 'themes') {
    selectedThemes.value = ''
  } else {
    const fieldMap: Record<string, Ref> = { title, startDate, endDate }
    const field = fieldMap[key]
    if (field) {
      field.value = (key === 'startDate' || key === 'endDate') ? undefined : ''
    }
  }
  onSearch()
}

function buildFieldQueries (): string | undefined {
  const parts: string[] = []

  if (title.value.trim()) {
    parts.push(`(title_${locale.value.toUpperCase()}_t:${solrEscape(title.value.trim())} OR title_${locale.value.toUpperCase()}_t:*${solrEscape(title.value.trim())}* OR symbol_t:${solrEscape(title.value.trim())} OR symbol_t:*${solrEscape(title.value.trim())}*)`)
  }

  if (selectedThemes.value) {
    parts.push(`themes_ss:"${solrEscape(selectedThemes.value)}"`)
  }

  return parts.length > 0 ? andOr(parts, 'AND') : undefined
}

function onSearch () {
  activeFilters.value = buildActiveFilters()
  emit('search', {
    fieldQueries: buildFieldQueries(),
    startDate: toFormatStartDay(startDate.value),
    endDate: toFormatEndDay(endDate.value)
  })
}
</script>