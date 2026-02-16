<template>
  <Suspense>
    <template #default>
      <slot />
    </template>
    <template #fallback>
      <status />
    </template>
  </Suspense>
</template>
