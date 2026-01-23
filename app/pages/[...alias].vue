<template>
    <main class="cus-main cus-internal-page d-flex flex-column" role="main">
        <div class="main-wrapper">
            <div class="container-xxl d-flex">
                <article class="cus-article container-fluid d-flex flex-column">
                    <status v-if="isLoading" />
                    <section
                        v-dompurify-html="content.body"
                        class="rendered-content"
                    ></section>
                </article>
            </div>
        </div>
    </main>
</template>

<script lang="ts" setup>
import useContentApi from '~/composables/api/use-content-api'

const route = useRoute()
const { getContent } = useContentApi()
const isLoading = ref(true)

const content = await getContent(route.path).finally(() => {
  isLoading.value = false
})

definePageMeta({
  layout: 'home'
})
</script>