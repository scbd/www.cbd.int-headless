<template>
  <article class="cus-article container-xxl d-flex flex-column page-component">
    <h1>{{ t('search') }}</h1>
    <div class="filter-and-sort-wrapper container-fluid">
      <form @submit.prevent="onSearch" class="filter-and-sort-form">
        <label for="searchQuery" class="w-100">
          {{ t('searchFor') }}
          <input v-model="query" id="searchQuery" type="text" class="form-control" />
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
            <button type="button" class="btn-close btn-close-white ms-1"
              @click="removeFilter(filter.key)" />
          </span>
        </div>
      </form>
    </div>
  </article>
</template>
<i18n src="~~/i18n/dist/app/components/search/form.json"></i18n>

<script setup lang="ts">
import type { ActiveFilter } from '~~/types/api/search-result'

const { t } = useI18n()

const query = ref('')
const sortField = ref('date')
const sortDirection = ref('desc')
const activeFilters = ref<ActiveFilter[]>([])

const emit = defineEmits<{
  search: [params: { sort?: string; search?: string }]
}>()

function buildSort(): string {
  const field = sortField.value === 'title' ? 'title' : 'changed'
  return sortDirection.value === 'asc' ? field : `-${field}`
}

function onSearch() {
  activeFilters.value = query.value.trim()
    ? [{ key: 'query', label: t('search'), displayValue: query.value.trim() }]
    : []
  emit('search', { sort: buildSort(), search: query.value.trim() || undefined })
}

function removeFilter(key: string) {
  query.value = ''
  onSearch()
}
</script>