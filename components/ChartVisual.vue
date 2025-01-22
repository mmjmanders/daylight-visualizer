<script setup lang="ts">
import type { Options } from 'highcharts';
import dayjs from 'dayjs';

const props = defineProps<{ data: Datum[] }>();

const chartOptions = computed<Options>(() => {
  const sanitizedData = props.data.filter(
    d => d.dawn && d.sunrise && d.sunset && d.dusk,
  );
  const min = Math.min(...sanitizedData.map(d => d.dawn));
  const max = Math.max(...sanitizedData.map(d => d.dusk));
  return {
    accessibility: {
      enabled: false,
    },
    boost: {
      enabled: true,
    },
    chart: {
      polar: true,
      styledMode: true,
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
        id: 'dusk',
        name: 'Dusk',
        type: 'areaspline',
        data: sanitizedData.map(d => ({
          x: d.date,
          y: d.dusk,
        })),
      },
      {
        id: 'sunset',
        name: 'Sunset',
        type: 'areaspline',
        data: sanitizedData.map(d => ({
          x: d.date,
          y: d.sunset,
        })),
      },
      {
        id: 'sunrise',
        name: 'Sunrise',
        type: 'areaspline',
        data: sanitizedData.map(d => ({
          x: d.date,
          y: d.sunrise,
        })),
      },
      {
        id: 'dawn',
        name: 'Dawn',
        type: 'areaspline',
        data: sanitizedData.map(d => ({
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
    tooltip: {
      pointFormatter: function () {
        return `
<span class="highcharts-color-${this.colorIndex}">&#9679;</span>
<span>&nbsp;${this.series.name}:&nbsp;</span>
<span class="highcharts-strong">${dayjs(this.x + (this.y ?? 0)).format(
  'HH:mm:ss',
)}</span>
<br/>`;
      },
      shared: true,
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      type: 'datetime',
      min,
      max,
      labels: { format: '{value:%H:%M}' },
    },
  };
});
</script>

<template>
  <div v-bind="$attrs">
    <highcharts :options="chartOptions" class="highcharts-light"/>
  </div>
</template>

<style scoped></style>
