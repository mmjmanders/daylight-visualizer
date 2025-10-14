<script setup lang="ts">
import { DATE_FORMAT_SHORT, type Datum } from '@/queries';
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
const props = defineProps<{ data: Datum[]; month: string }>();

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
    enabled: false,
  },
  legend: {
    enabled: false,
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
    text: `${dayjs(props.month, DATE_FORMAT_SHORT).locale(locale.value).format('MMMM YYYY')}`,
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
    type: 'datetime',
    labels: { format: '{value:%e}' },
  },
  yAxis: {
    endOnTick: false,
    type: 'datetime',
    labels: { format: '{value:%k:%M}' },
    title: {
      text: undefined,
    },
    min: 0,
    max: 24 * 60 * 60 * 1000,
  },
}));
</script>

<template>
  <div class="chart-container" :class="'month-' + month.replace(/.*-/g, '')">
    <highcharts :options="chartOptions" :lang="locale" />
  </div>
</template>

<style scoped></style>
