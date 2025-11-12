<template>
  <main class="cus-main d-flex flex-column">
    <article
      class="cus-article container-xxl d-flex flex-column page-component"
    >
      <section>
        <h1>{{ t('notification') }} {{ notification.code }}</h1>

        <div class="content-object">
          <div class="information">
            <div class="date">
              {{ notification.createdOn }}
              <template v-if="notification.endOn">
                <span class="dash">&ndash;</span> {{ notification.endOn }}
              </template>
            </div>
            <div v-show="notification.actionOn" class="action-required">
              {{ t('action-required') }}: {{ notification.actionOn }}
            </div>
            <div
              v-dompurify-html:plaintext="notification.title"
              class="description"
            >
            </div>
          </div>

          <div class="subjects-recipients">
            <div v-show="notification.recipients" class="subjects recipients">
              <span class="fw-bold"> {{ t('recipients') }}: </span>
              <!-- Link to Notification SERP with recipient as search param -->
              <NuxtLink
                v-for="recipient in notification.recipients"
                to="#"
                class="badge"
              >
                {{ recipient }}
              </NuxtLink>
            </div>
            <div v-show="notification.themes" class="subjects recipients">
              <span class="fw-bold"> {{ t('themes') }}: </span>
              <!-- Link to Notification SERP with theme as search param -->
              <NuxtLink
                v-for="theme in notification.themes"
                to="#"
                class="badge"
              >
                {{ theme }}
              </NuxtLink>
            </div>

            <div class="files">
              <div class="files-title"
                >Download Notification in available languages</div
              >
              <div class="files-available">
                <NuxtLink
                  v-for="file in notification.files"
                  class="btn"
                  target="_blank"
                  :to="file.url"
                >
                  {{ file.language }}

                  <NuxtImg
                    :src="`/images/icons/icon-file-${file.mime}.svg`"
                    :alt="`Download ${file.mime} icon`"
                  />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <div
          v-dompurify-html:html="notification.fulltext"
          class="rendered-content"
        ></div>

        <div class="signed">
          <span class="signature">(Signed) Astrid Schomaker</span> <br />
          {{ notification.sender }}
        </div>

        <div class="recipients-footer"
          >{{ t('to') }}: {{ notification.recipientsFooter }}</div
        >
      </section>
    </article>
  </main>
</template>

<script setup lang="ts">
import useNotificationsApi from '~/composables/api/use-notifications'
import { formatDate } from '~~/utils/date'
import { handleHtmlTags, handleFileMimeType } from '~~/utils/parse-item-content'

const { t, locale } = useI18n()

const route = useRoute()

const { getNotification } = useNotificationsApi()

const code = route.params.code ? route.params.code.toString() : ''
const item = await getNotification(code)

const notification = computed(() => {
  const themes: string[] = []
  item.themes.map((l) => {
    const theme = l[locale.value]
    if (theme) themes.push(theme)
  })

  return {
    ...item,
    title: item.title[locale.value],
    themes: themes,
    createdOn: formatDate(item.createdOn, locale.value),
    endOn: item.endOn ? formatDate(item.endOn, locale.value) : item.endOn,
    updatedOn: formatDate(item.updatedOn, locale.value),
    actionOn: item.actionOn
      ? formatDate(item.actionOn, locale.value)
      : item.actionOn,
    fulltext: item.fulltext[locale.value]
      ? handleHtmlTags(item.fulltext[locale.value]!)
      : item.fulltext[locale.value],
    files: item.files.map((file) => ({
      ...file,
      mime: handleFileMimeType(file.type)
    })),
    recipientsFooter: item.recipients.join(', ')
  }
})

definePageMeta({
  layout: 'item',
  breadcrumbs: true
})
</script>
