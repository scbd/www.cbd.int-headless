<template>
    <article class="cus-article container-xxl d-flex flex-column page-component">
        <h1>{{ t('notifications')}}</h1>
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

            <div class="row">
                <div class="col">
                    <label for="fsThemes" class="w-100">
                        {{ t('themes') }}
                        <input
                            v-model="themes"
                            type="text"
                            name="fsThemes"
                            id="fsThemes"
                            class="form-control"
                        />
                    </label>
                </div>
                <div class="col">
                    <label for="fsRecipients" class="w-100">
                        {{ t('recipients') }}
                        <input
                            v-model="recipients"
                            type="text"
                            name="fsRecipients"
                            id="fsRecipients"
                            class="form-control"
                        />
                    </label>
                </div>
            </div>

            <div class="filter-row row">
                <div class="form_section-header">{{ t('filter') }}</div>
                <div class="form_section-options">
                <select v-model="year" class="form-select">
                    <option value="">
                    {{ t('anyYear') }}
                    </option>
                    <option
                        v-for="y of [...Array(new Date().getFullYear() + 1).keys()].slice(1991).reverse()"
                        :key="y"
                        :value="y"
                    >
                    {{ y }}
                    </option>
                </select>
                </div>
            </div>

            <div class="form_section-options column">
                <div class="form_section-header">{{ t('sort') }}</div>
                    <div class="form_section-options">
                        <select v-model="sortField" class="form-select">
                            <option value="title">{{ t('name') }}</option>
                            <option value="date">{{ t('date') }}</option>
                        </select>
                        <select v-model="sortDirection" class="form-select">
                            <option value="asc">&uarr; {{ t('ascending') }}</option>
                            <option value="desc">&darr; {{ t('descending') }}</option>
                        </select>
                    </div>
                </div>

                <input class="btn cbd-btn-primary" type="submit" :value="t('search')" />
            </form>

            <div v-if="activeFilters.length" class="search-terms">
                <span v-for="filter in activeFilters" :key="filter.key" class="badge">
                    {{ filter.label }}: {{ filter.displayValue }}
                    <button
                        type="button"
                        class="btn-close btn-close-white ms-1"
                        :aria-label="`Remove ${filter.label} filter`"
                        @click="removeFilter(filter.key)"
                    />
                </span>
            </div>
        </div>
    </article>
</template>
<i18n src="~~/i18n/dist/app/components/notification/search.json"></i18n>

<script setup lang="ts">
import { solrEscape, andOr } from '~~/utils/solr'
import type { ActiveFilter } from '~~/types/api/search-result'

const { t } = useI18n()

const title = ref('')
const themes = ref('')
const recipients = ref('')
const year = ref(0)
const sortField = ref('date')
const sortDirection = ref('desc')

const activeFilters = ref<ActiveFilter[]>([])

const emit = defineEmits<{
  search: [params: { fieldQueries?: string, sort?: string }]
}>()

function buildActiveFilters (): ActiveFilter[] {
  const filters: ActiveFilter[] = []
  if (title.value.trim()) {
    filters.push({ key: 'title', label: t('title'), displayValue: title.value.trim() })
  }
  if (themes.value.trim()) {
    filters.push({ key: 'themes', label: t('themes'), displayValue: themes.value.trim() })
  }
  if (recipients.value.trim()) {
    filters.push({ key: 'recipients', label: t('recipients'), displayValue: recipients.value.trim() })
  }
  if (year.value) {
    filters.push({ key: 'year', label: t('year'), displayValue: String(year.value) })
  }
  return filters
}

function removeFilter (key: string) {
  const fieldMap: Record<string, Ref> = { title, themes, recipients, year }
  const field = fieldMap[key]
  if (field) {
    field.value = key === 'year' ? 0 : ''
  }
  onSearch()
}

function buildFieldQueries (): string | undefined {
  const parts: string[] = []

  if (title.value.trim()) {
    parts.push(`(title_EN_t:${solrEscape(title.value.trim())} OR title_EN_t:*${solrEscape(title.value.trim())}*)`)
  }
  if (themes.value.trim()) {
    parts.push(`(themes_EN_txt:${solrEscape(themes.value.trim())} OR themes_EN_txt:*${solrEscape(themes.value.trim())}*)`)
  }
  if (recipients.value.trim()) {
    parts.push(`(recipient_txt:${solrEscape(recipients.value.trim())} OR recipient_txt:*${solrEscape(recipients.value.trim())}*)`)
  }
  if (year.value) {
    // Date range — NOT escaped since we control the format
    parts.push(`createdDate_dt:[${year.value}-01-01T00:00:00Z TO ${year.value}-12-31T23:59:59Z]`)
  }

  return parts.length > 0 ? andOr(parts, 'AND') : undefined
}

function buildSort (): string {
  if (sortField.value === 'title') {
    return `title_EN_t ${sortDirection.value === 'asc' ? 'ASC' : 'DESC'}`
  }
  return `updatedDate_dt ${sortDirection.value === 'asc' ? 'ASC' : 'DESC'}`
}

function onSearch () {
  activeFilters.value = buildActiveFilters()
  emit('search', {
    fieldQueries: buildFieldQueries(),
    sort: buildSort()
  })
}
</script>