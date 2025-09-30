<template>
  <footer class="cus-footer d-flex flex-column" v-if="menu">
    <div class="footer-row footer-navigation">
      <nav v-for="menuItem in menu" :key="menuItem.title">
        <div class="nav-title">
          {{ menuItem.title }}
        </div>

        <ul
          v-if="menuItem.children?.length"
          :class="{ 'two-column': menuItem.children.length > 7 }"
        >
          <div>
            <li
              v-for="childMenuItem in menuItem.children.slice(
                0,
                Math.round(menuItem.children.length / 2)
              )"
            >
              <NuxtLink :to="childMenuItem.url">
                {{ childMenuItem.title }}
              </NuxtLink>
            </li>
          </div>
          <div>
            <li
              v-for="childMenuItem in menuItem.children.slice(
                Math.round(menuItem.children.length / 2),
                menuItem.children.length
              )"
            >
              <NuxtLink :to="childMenuItem.url">
                {{ childMenuItem.title }}
              </NuxtLink>
            </li>
          </div>
        </ul>
        <ul v-else>
          <li v-for="childMenuItem in menuItem.children">
            <NuxtLink :to="childMenuItem.url">
              {{ childMenuItem.title }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <nav class="a-part-of">
        <div class="nav-title">A part of</div>
        <ul>
          <li>
            <NuxtLink
              to="https://un.org"
              target="_blank"
              rel="noopener noreferrer"
              ><NuxtImg
                src="/images/logo-un-negative.svg"
                class="logo-footer-un"
                alt="UN Logo"
            /></NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="https://unep.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                :src="unepLogoUrl"
                class="logo-footer-unep"
                alt="UNEP Logo"
              />
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();

const { data: menu } = await useFetch("/api/menu", {
  method: "GET",
  params: {
    menu: "cbd-footer",
  },
});

const unepLogoUrl = computed(
  () => `/images/unep-logo-${encodeURIComponent(locale.value)}.svg`
);
</script>
