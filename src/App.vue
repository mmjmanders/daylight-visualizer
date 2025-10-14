<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import MainContent from '@/components/MainContent.vue';

const { VITE_BUILD_SHA: buildSha, VITE_APP_VERSION: version } = import.meta.env;
</script>

<template>
  <header class="d-flex flex-column align-items-center mb-4">
    <h1><FontAwesomeIcon :icon="faSun" /> Daylight Visualizer</h1>
    <h6 class="font-monospace fw-normal">
      v{{ version }}-{{ buildSha }} (Powered by
      <a class="text-body" href="https://sunrisesunset.io/" rel="noopener" target="_blank"
        >SunriseSunset.io</a
      >)
    </h6>
  </header>
  <main class="d-flex flex-column gap-2">
    <MainContent />
  </main>
  <VueQueryDevtools />
</template>

<style scoped>
h1,
h6 {
  margin-bottom: 0;
}
h6 {
  font-size: 0.75rem;
}
</style>
