<template>
  <div class="search-item content-object object-type-notification">
    <div class="content-image-wrapper">
      <NuxtImg
        :src="notification.imageUrl"
        alt=""
        class="content-image"
        loading="lazy"
        :placeholder="IMAGE_FALLBACK"
      />
    </div>

    <div class="content-information-wrapper">
      <div class="information">
        <div class="date">
          {{ notification.updatedOn }}
          <template v-if="notification.endOn">
            <span class="dash">&ndash;</span>
            {{ notification.endOn }}
          </template>
        </div>

        <NuxtLink class="title" :to="notification.url"
          >{{ notification.code }} &ndash;
          {{ notification.title[locale] }}</NuxtLink
        >

        <div v-if="notification.actionOn" class="action-required">
          Action required: {{ notification.actionOn }}
        </div>

        <div class="subjects" v-if="notification.themes?.[locale]">
          Subject(s): {{ notification.themes[locale] }}
        </div>

        <div
          class="description"
          v-dompurify-html:plaintext="notification.fulltext[locale]"
        ></div>
      </div>

      <div v-if="notification.files.length" class="files">
        <div class="files">
          <div class="files-title">Files</div>
          <div class="files-available">
            <NuxtLink
              v-for="file in notification.files"
              :to="file.url"
              class="btn"
              :title="file.name"
              target="_blank"
            >
              <NuxtImg
                :src="`/images/icons/icon-file-${file.mime}.svg`"
                :alt="`Download ${file.mime} icon`"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Notification } from '~~/types/notification'
import { formatDate } from '~~/utils/date'
import { IMAGE_FALLBACK } from '~~/constants/image-paths'
import { handleFileMimeType } from '~~/utils/item-file-type-handler'

const { t, locale } = useI18n()

const props = defineProps<{
  notification: Notification
}>()

const notification = computed(() => ({
  ...props.notification,
  updatedOn: formatDate(props.notification.updatedOn, locale.value),
  endOn: formatDate(props.notification.endOn, locale.value),
  actionOn: formatDate(props.notification.actionOn, locale.value),
  themes: props.notification.themes.find((l) => l[locale.value]),
  url: props.notification.urls[0],
  imageUrl: `/content/images/notifications/${encodeURIComponent(
    props.notification.code
  )}.jpg`,
  files: props.notification.files.map((file) => ({
    ...file,
    mime: handleFileMimeType(file.type)
  }))
}))
</script>
