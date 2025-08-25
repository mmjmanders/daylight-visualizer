<script setup lang="ts">
import type { ChartData } from '@/queries';
import type { Options } from 'highcharts';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { DateTime } from 'luxon';

const { t, locale } = useI18n();
const props = defineProps<{ chartData: ChartData }>();

const chartOptions = computed<Options>(() => ({
  accessibility: {
    enabled: false,
  },
  boost: {
    enabled: true,
  },
  chart: {
    polar: props.chartData.chartType === 'polar',
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
      data: props.chartData.data
        .filter((d) => d.sunrise != null && d.sunset != null)
        .map((d) => ({
          x: d.date,
          low: d.sunrise,
          high: d.sunset,
          custom: {
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
  <div class="chart-container" :class="chartData.chartType">
    <highcharts :options="chartOptions" class="highcharts-light" :lang="locale" />
  </div>
</template>

<style scoped lang="scss">
.chart-container {
  width: 100%;
  height: 100%;

  &.polar {
    aspect-ratio: 1 / 1;
  }
  &.line {
    margin-top: 2rem;
    aspect-ratio: 16 / 9;
  }

  .highcharts-light {
    width: 100%;
    height: 100%;
  }
}
</style>
