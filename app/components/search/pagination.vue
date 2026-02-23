<template>
  <nav v-if="totalPages > 1" class="results-pagination">
    <!-- Page numbers (show up to 5 pages) -->
    <span
      v-for="page in visiblePages"
      :key="page"
      class="page"
      :class="{ 'current-page': page === currentPage }"
      @click="page !== currentPage && $emit('update:page', page)"
    >
      {{ page }}
    </span>

    <!-- Next page arrow -->
    <span
      v-if="currentPage < totalPages"
      class="page"
      @click="$emit('update:page', currentPage + 1)"
    >
      &#9654;
    </span>

    <!-- Page jump dropdown -->
    <select
      class="form-select form-select-sm"
      style="width: auto;"
      :value="currentPage"
      @change="$emit('update:page', Number(($event.target as HTMLSelectElement).value))"
    >
      <option v-for="page in totalPages" :key="page" :value="page">
        {{ page }}
      </option>
    </select>

    <!-- Total pages indicator -->
    <span>{{ totalPages }}</span>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

defineEmits<{
  'update:page': [page: number]
}>()

const visiblePages = computed(() => {
  const pages: number[] = []
  const maxVisible = 5
  let start = Math.max(1, props.currentPage - Math.floor(maxVisible / 2))
  const end = Math.min(props.totalPages, start + maxVisible - 1)

  // Adjust start if we're near the end
  start = Math.max(1, end - maxVisible + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})
</script>