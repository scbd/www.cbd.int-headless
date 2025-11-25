<template>
  <article class="cus-article container-xxl d-flex flex-column">
    <section>
      <h1>{{ t('notification', 1) }}</h1>
      <p>Search Criteria</p>
    </section>
    <section>
      <!-- shared-forms-filter-sort -->
      <div class="filter-and-sort-wrapper container-fluid">
        <button
          class="btn cbd-btn-outline-icon filter-and-sort"
          type="button"
          data-bs-toggle="collapse"
          aria-expanded="true"
          data-bs-target="#searchForm"
          aria-controls="searchForm"
        >
          Filter and Sort
        </button>

        <form
          @submit.prevent="null"
          action="#"
          id="searchForm"
          class="filter-and-sort-form collapse show"
        >
          <label for="fsTitle">
            Title Contains
            <input id="fsTitle" type="text" class="form-control" />
          </label>

          <label for="fsThemes">
            Themes
            <input
              type="text"
              name="fsThemes"
              id="fsThemes"
              class="form-control"
            />
          </label>

          <label for="fsRecipients">
            Recipients
            <input
              type="text"
              name="fsRecipients"
              id="fsRecipients"
              class="form-control"
            />
          </label>

          <div class="filter-row row">
            <div class="form_section-header">Filter</div>
            <div class="form_section-options">
              <select name="" id="" class="form-select">
                <option :value="0" :selected="true"> Any Year </option>
                <option v-for="year of formData.years" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>
          </div>

          <div class="form_section-options column">
            <div class="form_section-header">Sort</div>
            <div class="form_section-options">
              <select id="sortName" name="sortName" class="form-select">
                <option value="asc" selected>Name &uarr;</option>
                <option value="desc">Name &darr;</option>
              </select>
              <select id="sortDate" name="sortDate" class="form-select">
                <option value="asc" selected>Date &uarr;</option>
                <option value="desc">Date &darr;</option>
              </select>
            </div>
          </div>

          <button class="btn cbd-btn-primary" type="submit">Search</button>
        </form>

        <div class="search-terms">
          <!-- v-if="searchTerms.length" -->
          <span class="fw-bold">Search Terms</span>
        </div>
      </div>
    </section>
    <section class="search-results">
      <!-- shared-forms-pagination -->
      <div class="search-results-items">
        <!-- notification-serp-card (v-for="notification of notificationSearcResults") -->
      </div>
      <!-- shared-forms-pagination -->
    </section>
  </article>
</template>

<script setup lang="ts">
const { t } = useI18n()

const formData = computed(() => {
  const years: number[] = [...Array(new Date().getFullYear() + 1).keys()]
    .slice(1991)
    .reverse()

  return {
    years
  }
})

definePageMeta({
  layout: 'home'
})
</script>
