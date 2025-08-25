<script setup lang="ts">
import InputForm from '@/components/InputForm.vue';
import { ref } from 'vue';
import type { ChartData } from '@/queries';
import ChartVisual from '@/components/ChartVisual.vue';

const chartData = ref<ChartData | undefined>(undefined);

const onChartTypeChange = (type: 'polar' | 'line') => {
  if (chartData.value) {
    chartData.value.chartType = type;
  }
};
</script>

<template>
  <InputForm v-model:chartData="chartData" @chartTypeChange="onChartTypeChange" />
  <ChartVisual v-if="chartData?.data" :chartData="chartData" />
</template>

<style scoped></style>
