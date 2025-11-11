<template>
    <div v-for="article in articles" class="featured-item accent-cbd" :class="{'featured-primary': article.primary}">
        <img :src="article.coverImage.path" :alt="article.coverImage.alt" :placeholder="IMAGE_FALLBACK" class="featured-cover-image" />
        <NuxtLink :to="article.alias" class="featured-wrapper">
            <div class="featured-information">
                <div class="featured-taxonomy">
                    <div class="featured-source">CBD</div>
                    <div class="featured-type">{{ article.bundle }}</div>                    
                </div>
                <div class="featured-description">{{ article.title }}</div>
            </div>
            <div v-if="article.primary" class="featured-buttons container-field">
                <button class="btn cbd-btn cbd-btn-primary btn-lg">View Article</button>
            </div>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import type { Article } from '~~/types/content'
import { IMAGE_FALLBACK } from '~~/constants/image-paths'

const props = defineProps<{
    articles: (Article & {primary: boolean})[]
}>()
</script>