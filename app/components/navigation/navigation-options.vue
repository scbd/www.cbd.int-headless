<template>
  <div class="cus-options container-fluid justify-content-end">
    <ul class="navbar-nav">
      <li class="nav-item">
        <NuxtLink class="nav-link" :to="''" role="button">
          <NuxtImg
            src="/images/icons/icon-nav-search-outline.svg"
            :alt="'Search Icon'"
          />
          <span class="nav-options-search-slot">Search</span>
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
            :alt="'Language Icon'"
          />
          <span class="nav-options-current-lang-slot"> English </span>
        </NuxtLink>

        <ul class="language-selector-dropdown dropdown-menu">
          <li v-for="(language, index) in Languages" :key="language.locale">
            <NuxtLink class="dropdown-item" to="#">
              {{ languagesDropdown[index] }}
            </NuxtLink>
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <NuxtLink class="nav-link" to="#" role="button">
          <NuxtImg
            src="/images/icons/icon-nav-account-outline.svg"
            :alt="'Login Icon'"
          />
          <span class="nav-options-login-slot">Login</span>
        </NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink class="nav-link" to="#" role="button">
          <NuxtImg
            src="/images/icons/icon-nav-settings-outline.svg"
            :alt="'Settings Icon'"
          />
          <span class="nav-options-settings-slot">Settings</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Languages } from '~~/types/un-languages';

const { t, locale } = useI18n();

const languagesDropdown = computed(() =>
  Languages.map((language, index) => {
    return language.locale !== locale.value
      ? `${language.name} (${language.translations?.[locale.value]})`
      : language.name;
  })
);
</script>
