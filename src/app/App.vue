<script setup lang="ts">
import CoordinatesForm from './components/coordinates-form/CoordinatesForm.vue';
import Visual from './components/visual/Visual.vue';

import { ref } from 'vue';

const data = ref<any>(null);
</script>

<template>
  <div class="container">
    <h1 class="text-center">
      Daylight visualizer
    </h1>
    <div class="flex gap-4 my-4">
      <CoordinatesForm
        v-model="data"
        class="flex-grow flex-shrink basis-0"
      />
      <div class="flex-grow flex-shrink basis-0">
        <Visual
          v-if="data"
          :data="data"
        />
      </div>
    </div>
  </div>
</template>
