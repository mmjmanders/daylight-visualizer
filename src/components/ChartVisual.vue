<script setup lang="ts">
import type { Datum } from '@/queries';
// import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
// import { DateTime } from 'luxon';
import type { EChartsCoreOption } from 'echarts/core';
import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  LegendComponent,
  PolarComponent,
  TooltipComponent,
} from 'echarts/components';
import { SVGRenderer } from 'echarts/renderers';

use([TitleComponent, LegendComponent, PolarComponent, TooltipComponent, LineChart, SVGRenderer]);
import VChart from 'vue-echarts';

// const { t, locale } = useI18n();
const props = defineProps<{ data: Datum[] }>();

const chartOptions = computed<EChartsCoreOption>(() => ({
  title: {
    text: props.data[0].date,
  },
  legend: {
    data: ['line'],
  },
  polar: {
    center: ['50%', '54%'],
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
  },
  angleAxis: {
    type: 'value',
    startAngle: 0,
  },
  radiusAxis: {
    min: 0,
  },
  series: [
    {
      coordinateSystem: 'polar',
      name: 'line',
      type: 'line',
      showSymbol: false,
      data: [],
    },
  ],
  animationDuration: 2000,
}));
</script>

<template>
  <div class="chart-container">
    <v-chart :option="chartOptions"></v-chart>
  </div>
</template>

<style scoped>
.chart-container {
  aspect-ratio: 1 / 1;
}

#chart {
  width: 100%;
  height: 100%;
}
</style>
