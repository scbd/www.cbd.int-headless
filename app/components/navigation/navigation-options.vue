<template>
  <div class="cus-options container-fluid justify-content-end">
    <ul class="navbar-nav">
      <li class="nav-item">
        <NuxtLink class="nav-link" :to="''" role="button">
          <NuxtImg
            src="/images/icons/icon-nav-search_outline.svg"
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
            src="/images/icons/icon-nav-language_outline.svg"
            :alt="'Language Icon'"
          />
          <span class="nav-options-current-lang-slot"> English </span>
        </NuxtLink>

        <ul class="language-selector-dropdown dropdown-menu">
          <li
            v-for="language in [
              { langCode: 'ar', label: 'Arabic' },
              { langCode: 'en', label: 'English' },
              { langCode: 'es', label: 'Spanish' },
              { langCode: 'fr', label: 'French' },
              { langCode: 'ru', label: 'Russian' },
              { langCode: 'zh', label: 'Chinese' },
            ]"
            :key="language.langCode"
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
            src="/images/icons/icon-nav-account_outline.svg"
            :alt="'Login Icon'"
          />
          <span class="nav-options-login-slot">Login</span>
        </NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink class="nav-link" to="#" role="button">
          <NuxtImg
            src="/images/icons/icon-nav-settings_outline.svg"
            :alt="'Settings Icon'"
          />
          <span class="nav-options-settings-slot">Settings</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>
