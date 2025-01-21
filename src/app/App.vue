<script setup lang="ts">
import CoordinatesForm from './components/coordinates-form/CoordinatesForm.vue';
import Visual from './components/visual/Visual.vue';

import { ref } from 'vue';
import { Datum } from './queries';

const data = ref<Datum[] | null>(null);
</script>

<template>
  <div class="container">
    <header class="d-flex justify-content-center">
      <h1>Daylight visualizer</h1>
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
      <Visual
        :data="data"
        class="col-12 col-xl-8 offset-xl-2"
      />
    </div>
  </div>
</template>
