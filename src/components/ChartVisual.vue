<script setup lang="ts">
import type { Datum } from '@/queries';
import type { Options } from 'highcharts';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { DateTime } from 'luxon';

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
    text: '',
  },
  tooltip: {
    useHTML: true,
    formatter: function () {
      const date = DateTime.fromMillis(this.x, { zone: this.custom.timezone })
        .setLocale(locale.value)
        .toLocaleString({
          ...DateTime.DATE_HUGE,
          month: 'short',
        });
      const sunrise = DateTime.fromMillis(this.x + (this.low ?? 0), { zone: this.custom.timezone })
        .setLocale(locale.value)
        .toLocaleString(DateTime.TIME_WITH_SECONDS);
      const sunset = DateTime.fromMillis(this.x + (this.high ?? 0), { zone: this.custom.timezone })
        .setLocale(locale.value)
        .toLocaleString(DateTime.TIME_WITH_SECONDS);
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
  },
}));
</script>

<template>
  <div class="chart-container">
    <highcharts :options="chartOptions" class="highcharts-light" :lang="locale" />
  </div>
</template>

<style scoped>
.chart-container {
  aspect-ratio: 1 / 1;
}

.highcharts-light {
  width: 100%;
  height: 100%;
}
</style>
