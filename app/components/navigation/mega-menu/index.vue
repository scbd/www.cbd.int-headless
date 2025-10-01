<template>
  <div class="cus-mega-menu container-fluid" role="navigation">
    <navigation-branding />

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#mainNavigation"
      aria-controls="mainNavigation"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="mainNavigation">
      <div class="offcanvas-header">
        <NavigationBranding />
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <ul class="mega-menu-settings navbar-nav">
        <li class="mega-menu-item nav-item dropdown">
          <NuxtLink
            class="nav-link dropdown-toggle"
            to="#"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            >Options</NuxtLink
          >

          <nav class="mega-menu-drawer dropdown-menu container-fluid">
            <ul class="mega-menu-drawer-internal nav">
              <li class="nav-item">
                <NuxtLink class="nav-link" to="#" role="button">
                  <NuxtImg
                    src="/images/icons/icon-nav-search-outline.svg"
                    alt="Search Icon"
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

                <ul class="language-selector-dropdown dropdown-menu show">
                  <li
                    v-for="language in [
                      { langCode: 'ar', label: 'عربي (Arabic)' },
                      { langCode: 'en', label: 'English' },
                      { langCode: 'es', label: 'Español (Spanish)' },
                      { langCode: 'fr', label: 'Français (French)' },
                      { langCode: 'ru', label: 'Русский (Russian)' },
                      { langCode: 'zh', label: '中国人 (Chinese)' },
                    ]"
                    :key="language.langCode"
                  >
                    <NuxtLink class="dropdown-item" to="#" @click.prevent="">
                      {{ language.label }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>

              <li class="nav-item">
                <NuxtLink class="nav-link" to="#" role="button">
                  <NuxtImg
                    src="/images/icons/icon-nav-account-outline.svg"
                    alt="Login Icon"
                  />
                  <span class="nav-options-login-slot">Login</span>
                </NuxtLink>
              </li>

              <li class="nav-item">
                <NuxtLink class="nav-link" to="#" role="button">
                  <NuxtImg
                    src="/images/icons/icon-nav-settings-outline.svg"
                    alt="Settings Icon"
                  />
                  <span class="nav-options-settings-slot">Settings</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </li>
      </ul>
      <ul class="navbar-nav">
        <li v-for="childMenu in menu" class="mega-menu-item nav-item dropdown">
          <NuxtLink
            class="nav-link dropdown-toggle"
            :to="childMenu.url"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ childMenu.title }}
          </NuxtLink>

          <NavigationMegaMenuDrawer :menu="childMenu" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import useMenuApi from "~/composables/useMenuApi";

const { t } = useI18n();

const { getMenu } = useMenuApi();
const { data: menu } = await getMenu("cbd-header");
</script>