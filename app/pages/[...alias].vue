<template>
    <main class="cus-main cus-internal-page d-flex flex-column" role="main">
        <div class="main-wrapper">
            <div class="container-xxl d-flex">
                <article class="cus-article container-fluid d-flex flex-column">
                    <section
                        v-dompurify-html="page.body"
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
const { getPage } = useContentApi()

const page = await getPage(route.path)

definePageMeta({
  layout: 'home'
})
</script>