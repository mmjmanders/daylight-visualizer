<script setup lang="ts">
import { computed } from 'vue';
import { Datum } from '../../queries';
import { Options } from 'highcharts';

const props = defineProps<{ data: Datum[] | null }>();

const chartOptions = computed<Options>(() => {
  const min = Math.min(...props.data.map((d) => d.first));
  const max = Math.max(...props.data.map((d) => d.last));
  return {
    accessibility: {
      enabled: false,
    },
    boost: {
      enabled: true,
    },
    chart: {
      polar: true,
    },
    credits: {
      href: 'https://sunrisesunset.io/',
      text: 'Powered by SunriseSunset.io',
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      {
        type: 'areaspline',
        data: props.data.map((d) => ({
          x: d.date,
          y: d.last,
        })),
      },
      {
        type: 'areaspline',
        data: props.data.map((d) => ({
          x: d.date,
          y: d.dusk,
        })),
      },
      {
        type: 'areaspline',
        data: props.data.map((d) => ({
          x: d.date,
          y: d.sunset,
        })),
      },
      {
        type: 'areaspline',
        data: props.data.map((d) => ({
          x: d.date,
          y: d.sunrise,
        })),
      },
      {
        type: 'areaspline',
        data: props.data.map((d) => ({
          x: d.date,
          y: d.dawn,
        })),
      },
      {
        type: 'areaspline',
        data: props.data.map((d) => ({
          x: d.date,
          y: d.first,
        })),
      },
    ],
    time: {
      timezone: undefined,
    },
    title: {
      text: '',
    },
    xAxis: { type: 'datetime' },
    yAxis: { type: 'datetime', min, max },
  };
});
</script>

<template>
  <div class="flex justify-center">
    <highcharts :options="chartOptions" class="w-[600px] h-[600px]" />
  </div>
</template>

<style scoped></style>
