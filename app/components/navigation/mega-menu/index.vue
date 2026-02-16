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
      :aria-label="t('toggleNavigation')"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="mainNavigation">
      <div class="offcanvas-header">
        <navigation-branding />
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          :aria-label="t('close')"
        ></button>
      </div>

      <ul class="mega-menu-settings navbar-nav">
        <li class="mega-menu-item nav-item dropdown">
          <NuxtLink
            class="nav-link dropdown-toggle"
            to="#"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            >{{ t('options') }}</NuxtLink
          >

          <nav class="mega-menu-drawer dropdown-menu container-fluid">
            <ul class="mega-menu-drawer-internal nav">
              <li class="nav-item">
                <NuxtLink class="nav-link" to="#" role="button">
                  <NuxtImg
                    src="/images/icons/icon-nav-search-outline.svg"
                    :alt="t('searchIcon')"
                  />
                  <span class="nav-options-search-slot">{{ t('search') }}</span>
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
                    :alt="t('languageIcon')"
                  />
                  <span class="nav-options-current-lang-slot"> English </span>
                </NuxtLink>

                <ul class="language-selector-dropdown dropdown-menu show">
                  <li
                    v-for="language in languagesWithLabel"
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
                    :alt="t('loginIcon')"
                  />
                  <span class="nav-options-login-slot">{{ t('login') }}</span>
                </NuxtLink>
              </li>

              <li class="nav-item">
                <NuxtLink class="nav-link" to="#" role="button">
                  <NuxtImg
                    src="/images/icons/icon-nav-settings-outline.svg"
                    :alt="t('settingsIcon')"
                  />
                  <span class="nav-options-settings-slot">{{ t('settings') }}</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </li>
      </ul>
      <status v-if="error" :error="error" />
      <ul v-else class="navbar-nav">
        <li v-for="childMenu in menu" class="mega-menu-item nav-item dropdown">
          <NuxtLink
            class="nav-link dropdown-toggle"
            :to="childMenu.url"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ childMenu.title }}
          </NuxtLink>

          <navigation-mega-menu-drawer :menu="childMenu" />
        </li>
      </ul>
    </div>
  </div>
</template>
<i18n src="~~/i18n/dist/app/components/navigation/mega-menu/index.json"></i18n>

<script setup lang="ts">
import { languages } from '~~/data/un-languages';
import useMenuApi from '~/composables/api/use-menu-api';

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

const { menu, error } = await useMenuApi('cbd-header');
</script>
