<template>
    <article class="cus-article container-xxl d-flex flex-column page-component">
        <h1>{{ t('articles') }}</h1>
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
<i18n src="~~/i18n/dist/app/components/article/search.json"></i18n>

<script setup lang="ts">
import type { ActiveFilter } from '~~/types/api/search-result'

const { t } = useI18n()

const title = ref('')
const sortField = ref('date')
const sortDirection = ref('desc')
const activeFilters = ref<ActiveFilter[]>([])

const emit = defineEmits<{
  search: [params: { search?: string, sort?: string }]
}>()

function buildActiveFilters (): ActiveFilter[] {
  const filters: ActiveFilter[] = []
  if (title.value.trim()) {
    filters.push({ key: 'title', label: t('title'), displayValue: title.value.trim() })
  }
  return filters
}

function removeFilter (key: string) {
  const fieldMap: Record<string, Ref> = { title }
  const field = fieldMap[key]
  if (field) {
    field.value = ''
  }
  onSearch()
}

function buildSort (): string {
  if (sortField.value === 'title') {
    return sortDirection.value === 'asc' ? 'title' : '-title'
  }
  return sortDirection.value === 'asc' ? 'changed,created' : '-changed,-created'
}

function onSearch () {
  activeFilters.value = buildActiveFilters()
  emit('search', {
    search: title.value.trim() || undefined,
    sort: buildSort()
  })
}
</script>