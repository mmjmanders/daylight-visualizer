<script setup lang="ts">
import type { ChartData } from '@/queries';
import { computed } from 'vue';
import ChartVisual from './ChartVisual.vue';

const props = defineProps<{ data: ChartData }>();
const months = computed(() => Array.from(props.data.keys()));
</script>

<template>
  <div class="month-container d-grid row-gap-2">
    <ChartVisual v-for="month of months" :key="month" :data="data.get(month)!" />
  </div>
</template>

<style scoped></style>
