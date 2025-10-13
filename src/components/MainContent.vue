<script setup lang="ts">
import InputForm from '@/components/InputForm.vue';
import ChartContainer from '@/components/ChartContainer.vue';
import { ref } from 'vue';
import type { ChartData } from '@/queries';

const data = ref<ChartData | undefined>(undefined);
</script>

<template>
  <InputForm v-model="data" />
  <ChartContainer v-if="data" :data="data" />
</template>

<style scoped></style>
