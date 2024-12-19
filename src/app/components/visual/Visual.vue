<script setup lang="ts">
import CoordinatesForm from '../coordinates-form/CoordinatesForm.vue';
import { ref, watch } from 'vue';

const data = ref<any>(null);
watch(data, (newValue) => {});
</script>

<template>
  <div class="flex gap-4">
    <CoordinatesForm
      v-model="data"
      class="flex-grow flex-shrink basis-0"
    />
    <div
      v-if="data"
      class="flex-grow flex-shrink basis-0 flex justify-center"
    >
      <div id="chart" />
    </div>
  </div>
</template>

<style scoped></style>
