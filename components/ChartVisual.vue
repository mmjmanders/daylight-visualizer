<script setup lang="ts">
import type { Options } from 'highcharts';
import { DateTime } from 'luxon';

const { t } = useI18n();
const props = defineProps<{ data: Datum[] }>();

const chartOptions = computed<Options>(() => ({
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
      id: 'sunset',
      name: t('chart.labels.daylight'),
      type: 'arearange',
      linecap: 'round',
      data: props.data.filter(
        d => d.sunrise != null && d.sunset != null,
      ).map(d => ({
        x: d.date,
        low: d.sunrise,
        high: d.sunset,
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
<span class="highcharts-strong">${t('chart.labels.sunrise')}: ${DateTime.fromMillis(
    this.low!,
  ).toFormat('HH:mm')}</span><br/>
<span class="highcharts-strong">${t('chart.labels.sunset')}: ${DateTime.fromMillis(
    this.high!,
  ).toFormat('HH:mm')}</span>
`;
    },
  },
  xAxis: {
    type: 'datetime',
  },
  yAxis: {
    type: 'datetime',
    labels: { format: '{value:%H:%M}' },
  },
}));
</script>

<template>
  <div v-bind="$attrs">
    <highcharts
      :options="chartOptions"
      class="highcharts-light"
    />
  </div>
</template>
