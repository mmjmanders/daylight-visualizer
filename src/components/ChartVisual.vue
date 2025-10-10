<script setup lang="ts">
import type { Datum } from '@/queries';
import { computed } from 'vue';
import MonthVisual from '@/components/MonthVisual.vue';

const props = defineProps<{ data: Record<string, Datum[]> }>();
const months = computed(() => Object.keys(props.data).sort((a, b) => a.localeCompare(b)));
const columns = computed(() => Math.min(Math.max(Object.keys(props.data).length, 1), 4));
</script>

<template>
  <div
    class="month-container d-md-grid gap-2"
    :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }"
  >
    <MonthVisual v-for="month in months" :key="month" :month="month" :data="data[month]!" />
  </div>
</template>

<style scoped></style>
