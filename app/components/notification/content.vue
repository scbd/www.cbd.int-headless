<template>
  <article class="cus-article container-xxl d-flex flex-column page-component">
    <template v-if="notifications.total === 0">
        <h1>Notification {{ code }} was not found.</h1>
    </template>
    <section v-for="notification in notifications.rows" :key="notification.id">
      <h1>Notification {{ notification.code }}</h1>
      <h2>{{ toLocaleText(notification.title) }}</h2>
      <div class="content-object">
        <div class="information">
          <div class="date">{{ toFormatDate(notification.createdOn) }}</div>
          <div v-if="notification.deadlineOn" class="action-required">
            Action Required: {{ toFormatDate(notification.deadlineOn) }}
          </div>
        </div>
        <div class="subjects-recipients">
          <div v-if="notification.recipients" class="recipients-row">
            <span class="fw-bold">Recipients:</span>
            <div class="recipients">
              <span v-for="recipient in notification.recipients" :key="toLocaleText(recipient)" class="badge">
                {{ toLocaleText(recipient) }}
              </span>
            </div>
          </div>
          <div v-if="notification.themes" class="recipients-row">
            <span class="fw-bold">Themes:</span>
            <div class="recipients">
              <span v-for="theme in notification.themes" :key="toLocaleText(theme)" class="badge">
                {{ toLocaleText(theme) }}
              </span>
            </div>
          </div>
          <div v-if="notification.file" class="files">
            <div class="files-title">Download notification in available languages:</div>
            <div class="files-available">
                <NuxtLink
                    class="file-badge"
                    target="_blank"
                    :href="notification.file.url"
                >
                <NuxtImg
                    v-show="notification.file.type.match(/application\/pdf/)"
                    src="/images/icons/icon-file-pdf.svg"
                    alt="Download this notification as a PDF."></NuxtImg>

                <NuxtImg
                    v-show="notification.file.type.match(/\.doc/)"
                    src="/images/icons/icon-file-doc.svg"
                    alt="Download this notification as a DOC."></NuxtImg>
                </NuxtLink>
             </div>
          </div>
        </div>
        <div class="description" v-html="contentParser(toLocaleText(notification.fulltext))"></div>
        <div class="description"><p>{{ toLocaleText(notification.from) }}</p></div>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { useNotificationsApi } from '~/composables/api/use-notifications'
import contentParser from '~~/utils/content-parser'

const props = defineProps<{
  code: string
}>()

const { toLocaleText } = useLString()
const { toFormatDate } = useFormatDate()

const { notifications, error } = await useNotificationsApi(props.code)
</script>
