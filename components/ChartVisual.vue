<script setup lang="ts">
import { type Options, Time } from 'highcharts';

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
        custom: {
          day_length: d.day_length,
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
      const time = new Time();
      const date = time.dateFormat('%A, %b %e, %Y', this.x);
      const sunrise = time.dateFormat('%k:%M:%S', this.x + (this.low || 0));
      const sunset = time.dateFormat('%k:%M:%S', this.x + (this.high || 0));
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
                    <td colspan="2"/>
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
  },
  yAxis: {
    type: 'datetime',
    labels: { format: '{value:%k:%M}' },
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
