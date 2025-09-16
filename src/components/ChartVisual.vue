<script setup lang="ts">
import type { Datum } from '@/queries';
import type { Options } from 'highcharts';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

const { t, locale } = useI18n();
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
  legend: {
    events: {
      itemClick: function () {
        return false;
      },
    },
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
      name: t('chart.labels.daylight'),
      type: 'areasplinerange',
      linecap: 'round',
      data: props.data
        .filter((d) => d.sunrise != null && d.sunset != null)
        .map((d) => ({
          x: d.date,
          low: d.sunrise,
          high: d.sunset,
          custom: {
            day_length: d.day_length,
            timezone: d.timezone,
          },
        })),
    },
  ],
  time: {
    timezone: undefined,
  },
  title: {
    text: undefined,
  },
  tooltip: {
    useHTML: true,
    formatter: function () {
      const date = dayjs(this.x).tz(this.custom.timezone).locale(locale.value).format('dddd, ll');
      const sunrise = dayjs(this.x + (this.low ?? 0))
        .tz(this.custom.timezone)
        .locale(locale.value)
        .format('LTS');
      const sunset = dayjs(this.x + (this.high ?? 0))
        .tz(this.custom.timezone)
        .locale(locale.value)
        .format('LTS');

      return `<table class="table table-borderless table-sm">
                <thead class="border-bottom">
                  <tr>
                    <th scope="col" colspan="2">${date}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">${t('chart.labels.sunrise')}</th>
                    <td>${sunrise}</td>
                  </tr>
                  <tr>
                    <th scope="row">${t('chart.labels.sunset')}</th>
                    <td>${sunset}</td>
                  </tr>
                  <tr>
                    <th scope="row">${t('chart.labels.daylight')}</th>
                    <td>${this.custom.day_length}</td>
                  </tr>                 
                </tbody>
              </table>`;
    },
  },
  xAxis: {
    tickLength: 5,
    type: 'datetime',
  },
  yAxis: {
    type: 'datetime',
    labels: { format: '{value:%k:%M}' },
    title: {
      text: undefined,
    },
  },
}));
</script>

<template>
  <div class="chart-container">
    <highcharts :options="chartOptions" class="highcharts-light" :lang="locale" />
  </div>
</template>

<style scoped></style>
