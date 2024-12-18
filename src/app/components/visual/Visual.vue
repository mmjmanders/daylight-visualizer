<script setup lang="ts">
import CoordinatesForm from '../coordinates-form/CoordinatesForm.vue';
import { ref, watch } from 'vue';
import { Options } from 'highcharts';

const data = ref<any>(null);

const chartOptions = ref<Options>({
  credits: {
    href: 'https://sunrisesunset.io/',
    text: 'Powered by SunriseSunset.io',
  },
  title: {
    text: '',
  },
});

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
      <highcharts
        :options="chartOptions"
        style="width: 400px; height: 400px"
      />
    </div>
  </div>
</template>

<style scoped></style>
