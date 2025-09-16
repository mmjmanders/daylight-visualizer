<script setup lang="ts">
import InputForm from '@/components/InputForm.vue';
import { ref } from 'vue';
import type { Datum } from '@/queries';
import ChartVisual from '@/components/ChartVisual.vue';

const data = ref<Datum[] | undefined>(undefined);
</script>

<template>
  <InputForm v-model:chartData="data" />
  <ChartVisual v-if="data" :data="data" />
</template>

<style scoped></style>
