<template>
  <div class="body-replace">
    <layout-shared-header>
      <async-block>
        <navigation-mega-menu />
      </async-block>
    </layout-shared-header>
    <NuxtPage />
    <async-block>
      <layout-shared-footer />
    </async-block>
  </div>
</template>

<script setup lang="ts"></script>
