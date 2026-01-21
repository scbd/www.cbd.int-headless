<template>
  <div class="cus-options container-fluid justify-content-end">
    <ul class="navbar-nav">
      <li class="nav-item">
        <NuxtLink class="nav-link" :to="''" role="button">
          <NuxtImg
            src="/images/icons/icon-nav-search-outline.svg"
            :alt="$t('searchIcon')"
          />
          <span class="nav-options-search-slot">{{ $t('search') }}</span>
        </NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink
          to="#"
          class="nav-link current-lang"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <NuxtImg
            src="/images/icons/icon-nav-language-outline.svg"
            :alt="$t('languageIcon')"
          />
          <span class="nav-options-current-lang-slot"> English </span>
        </NuxtLink>

        <ul class="language-selector-dropdown dropdown-menu">
          <li
            v-for="(language, index) in languagesWithLabel"
            :key="language.locale"
          >
            <NuxtLink class="dropdown-item" to="#">
              {{ language.label }}
            </NuxtLink>
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <NuxtLink class="nav-link" to="#" role="button">
          <NuxtImg
            src="/images/icons/icon-nav-account-outline.svg"
            :alt="$t('loginIcon')"
          />
          <span class="nav-options-login-slot">{{ $t('login') }}</span>
        </NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink class="nav-link" to="#" role="button">
          <NuxtImg
            src="/images/icons/icon-nav-settings-outline.svg"
            :alt="$t('settingsIcon')"
          />
          <span class="nav-options-settings-slot">{{ $t('settings') }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<i18n src="~~/i18n/dist/app/components/navigation/navigation-options.json"></i18n>

<script setup lang="ts">
import { languages } from '~~/data/un-languages';

const { locale } = useI18n();

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
