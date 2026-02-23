<template>
    <article class="cus-article container-xxl d-flex flex-column page-component">
        <h1>Notifications</h1>
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

            <label for="fsTitle" class="w-100">
                Title Contains:
                <input
                    id="fsTitle"
                    type="text"
                    class="form-control"
                />
            </label>

            <div class="row">
                <div class="col">
                    <label for="fsThemes" class="w-100">
                        Themes:
                        <input
                            type="text"
                            name="fsThemes"
                            id="fsThemes"
                            class="form-control"
                        />
                    </label>
                </div>
                <div class="col">
                    <label for="fsRecipients" class="w-100">
                        Recipients:
                        <input
                            type="text"
                            name="fsRecipients"
                            id="fsRecipients"
                            class="form-control"
                        />
                    </label>
                </div>
            </div>

            <div class="filter-row row">
                <div class="form_section-header">Filter:</div>
                <div class="form_section-options">
                <select name="" id="" class="form-select">
                    <option :value="'0'" :selected="true">
                    Any year
                    </option>
                    <option
                        v-for="year of [...Array(new Date().getFullYear() + 1).keys()]
                            .slice(1991)
                            .reverse()"
                        :value="year.toString()"
                    >
                    {{ year }}
                    </option>
                </select>
                </div>
            </div>

            <div class="form_section-options column">
                <div class="form_section-header">Sort</div>
                <div class="form_section-options">
                <select
                    id="sortName"
                    name="sortName"
                    class="form-select"
                >
                    <option value="asc" selected>
                    Name &uarr;
                    </option>
                    <option value="desc">Name &darr;</option>
                </select>
                <select
                    id="sortDate"
                    name="sortDate"
                    class="form-select"
                >
                    <option value="asc" selected>
                    Date &uarr;
                    </option>
                    <option value="desc">Date &darr;</option>
                </select>
                </div>
            </div>

            <input
                class="btn cbd-btn-primary"
                type="submit"
                value="Search"
            />
            </form>
        </div>
    </article>
</template>

<script setup lang="ts">
</script>