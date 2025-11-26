<template>
  <main class="cus-main d-flex flex-column">
    <article
      class="cus-article container-xxl d-flex flex-column page-component"
    >
      <section>
        <h1>{{ statement.title[locale] }} </h1>
        <div class="content-object">
          <div class="information">
            <div class="date">{{ statement.updatedOn }}</div>
            <div class="description">{{ statement.code }}</div>
          </div>
          <div class="subjects-recipients">
            <div class="recipients">
              <span class="fw-bold">Themes:</span>
              <NuxtLink class="badge" v-for="theme of statement.themes">
                {{ theme }}
              </NuxtLink>
            </div>
          </div>
          <div class="files">
            <div class="files-title"
              >Download statement in available languages</div
            >
            <div class="files-available">
              <NuxtLink
                v-for="file in statement.urls"
                class="btn"
                target="_blank"
                :to="file"
              >
                <NuxtImg
                  :src="`/images/icons/icon-file-${handleFileMimeType(
                    file
                  )}.svg`"
                  alt="Download"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </article>
  </main>
</template>

<script setup lang="ts">
import useStatementsApi from '~/composables/api/use-statements'
import { formatDate } from '~~/utils/date'
import { handleFileMimeType } from '~~/utils/item-file-type-handler'

const { locale } = useI18n()

const { getStatement } = useStatementsApi()

const route = useRoute()
const code = route.params.code?.toString() ?? ''
const item = await getStatement(code)

const statement = computed(() => {
  const themes: string[] = []
  item.themes.map((l) => {
    const theme = l[locale.value]
    if (theme) themes.push(theme)
  })

  return {
    ...item,
    updatedOn: formatDate(item.updatedOn, locale.value),
    themes
  }
})

definePageMeta({
  layout: 'item',
  breadcrumbs: true
})
</script>
