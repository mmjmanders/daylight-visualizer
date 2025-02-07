<script setup lang="ts">
import { faSun } from '@fortawesome/free-solid-svg-icons';

const data = ref<Datum[] | null>(null);
</script>

<template>
  <div class="container d-flex flex-column gap-3">
    <header class="d-flex justify-content-center">
      <h1>
        <FontAwesome :icon="faSun" />&nbsp;Daylight visualizer
        <AppVersion />
      </h1>
    </header>
    <div class="row">
      <CoordinatesForm
        v-model="data"
        class="col-12 col-xl-8 offset-xl-2"
      />
    </div>
    <div
      v-if="data"
      class="row"
    >
      <ChartVisual
        :data="data"
        class="col-12 col-xl-8 offset-xl-2"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
h1 {
  position: relative;
}
</style>
