<script setup lang="ts">
import InputForm from '@/components/InputForm.vue';
import { computed, ref } from 'vue';
import type { Datum } from '@/queries';
import ChartVisual from '@/components/ChartVisual.vue';

const data = ref<Record<string, Datum[]> | undefined>(undefined);
const shouldShowChart = computed(() => data.value && Object.entries(data.value).length > 0);
</script>

<template>
  <InputForm v-model:chartData="data" />
  <ChartVisual v-if="shouldShowChart" :data="data!" />
</template>

<style scoped lang="scss">
.circle-container {
  display: grid;
  gap: 1rem;

  .circle {
    aspect-ratio: 1/1;
    width: 100%;
  }
}
</style>
