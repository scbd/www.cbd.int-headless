<template>
  <div class="cus-options container-fluid justify-content-end">
    <ul class="navbar-nav">
      <li class="nav-item">
        <NuxtLink class="nav-link" to="/search" role="button">
          <NuxtImg
            src="/images/icons/icon-nav-search-outline.svg"
            :alt="t('searchIcon')"
          />
          <span class="nav-options-search-slot">{{ t('search') }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<i18n src="~~/i18n/dist/app/components/navigation/navigation-options.json"></i18n>

<script setup lang="ts">
import { languages } from '~~/data/un-languages';

const { t, locale } = useI18n();

const languagesWithLabel = computed(() =>
  languages.map((l) => {
    const label =
      l.locale !== locale.value
        ? `${l.name[l.locale]} (${l.name?.[locale.value]})`
        : l.name[locale.value];

    return { ...l, label };
  })
);
</script>
