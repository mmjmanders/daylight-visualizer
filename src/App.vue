<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import MainContent from '@/components/MainContent.vue'

const { VITE_BUILD_SHA: buildSha, VITE_APP_VERSION: version } = import.meta.env
</script>

<template>
  <header class="d-flex justify-content-center mb-4">
    <h1 class="position-relative">
      <FontAwesomeIcon :icon="faSun" />
      Daylight Visualizer
      <span class="position-absolute font-monospace">v{{ version }} - {{ buildSha }}</span>
    </h1>
  </header>
  <main class="d-flex flex-column gap-2">
    <MainContent />
  </main>
  <VueQueryDevtools />
</template>

<style scoped>
span {
  font-size: 0.75rem;
  right: 0;
  bottom: -0.75rem;
}
</style>
