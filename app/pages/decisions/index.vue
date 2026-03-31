<template>
    <article class="cus-article container-xxl d-flex flex-column page-component">
        <h1>{{ t('decisions') }}</h1>
        <div class="search-results-items">
            <div class="content-information-wrapper">
                <div class="information">
                    <ul>
                        <li><NuxtLink to="/decisions/COP">{{ t('cop') }}</NuxtLink></li>
                        <li><NuxtLink to="/decisions/CP">{{ t('cp') }}</NuxtLink></li>
                        <li><NuxtLink to="/decisions/NP">{{ t('np') }}</NuxtLink></li>
                    </ul>
                </div>
            </div>
        </div>

        <h1>{{ t('recommendations') }}</h1>
        <div class="search-results-items">
            <div class="content-information-wrapper">
                <div class="information">
                    <ul>
                        <li><NuxtLink to="/recommendations/SBSTTA">{{ t('sbstta') }}</NuxtLink></li>
                        <li><NuxtLink to="/recommendations/SBI">{{ t('sbi') }}</NuxtLink></li>
                        <li><NuxtLink to="/recommendations/SB8J">{{ t('sb8j') }}</NuxtLink></li>
                        <li><NuxtLink to="/recommendations/WG2020">{{ t('wg2020') }}</NuxtLink></li>
                        <li><NuxtLink to="/recommendations/WG8J">{{ t('wg8j') }}</NuxtLink></li>
                        <li><NuxtLink to="/recommendations/ICNP">{{ t('icnp') }}</NuxtLink></li>
                        <li><NuxtLink to="/recommendations/ICCP">{{ t('iccp') }}</NuxtLink></li>
                        <li><NuxtLink to="/recommendations/WGDSi">{{ t('wgdsi') }}</NuxtLink></li>
                        <li><NuxtLink to="/recommendations/WGRI">{{ t('wgri') }}</NuxtLink></li>
                    </ul>
                </div>
            </div>
        </div>
    </article>
</template>
<i18n src="~~/i18n/dist/app/pages/decisions/index.json"></i18n>

<script setup lang="ts">
definePageMeta({
  layout: 'home'
})

const { t } = useI18n()
</script>
