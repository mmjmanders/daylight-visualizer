<script setup lang="ts">
import { computed } from 'vue';
import { Datum } from '../../queries';
import { Options } from 'highcharts';

defineProps<{ data: Datum[] | null }>();

const chartOptions = computed<Options>(() => ({
  accessibility: {
    enabled: false,
  },
  credits: {
    href: 'https://sunrisesunset.io/',
    text: 'Powered by SunriseSunset.io',
  },
  title: {
    text: '',
  },
}));
</script>

<template>
  <div class="flex justify-center">
    <highcharts
      :options="chartOptions"
      class="w-[600px] h-[600px]"
    />
  </div>
  <div>
    <pre><code>{{ data }}</code></pre>
  </div>
</template>

<style scoped></style>
