<script setup lang="ts">
import { computed } from 'vue';
import { Datum } from '../../queries';
import { Options } from 'highcharts';

const props = defineProps<{ data: Datum[] | null }>();

const chartOptions = computed<Options>(() => {
  const sanitizedData = props.data.filter(
    (d) => d.dawn && d.sunrise && d.sunset && d.dusk
  );
  const min = Math.min(...sanitizedData.map((d) => d.dawn));
  const max = Math.max(...sanitizedData.map((d) => d.dusk));
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
        data: sanitizedData.map((d) => ({
          x: d.date,
          y: d.dusk,
        })),
      },
      {
        type: 'areaspline',
        data: sanitizedData.map((d) => ({
          x: d.date,
          y: d.sunset,
        })),
      },
      {
        type: 'areaspline',
        data: sanitizedData.map((d) => ({
          x: d.date,
          y: d.sunrise,
        })),
      },
      {
        type: 'areaspline',
        data: sanitizedData.map((d) => ({
          x: d.date,
          y: d.dawn,
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
