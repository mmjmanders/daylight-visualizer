<script setup lang="ts">
import { onMounted } from 'vue';
import { select } from 'd3-selection';
import { Datum } from '../../queries';
import { scaleUtc } from 'd3-scale';

const props = defineProps<{ data: Datum[] | null }>();

const renderChart = (data: Datum[]) => {
  const width = 600,
    height = 600;
  const innerRadius = width / 5;
  const outerRadius = width / 2;
  const x = scaleUtc()
    .domain([new Date(data[0].date), new Date(data[data.length - 1].date)])
    .range([0, 2 * Math.PI]);

  const chart = select('#chart');
  chart.selectAll('svg').remove();
  chart
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .selectAll()
    .data(x.ticks())
    .join('g')
    .each((d) => {
    });
};

onMounted(() => {
  if (props.data?.length) {
    renderChart(props.data);
  }
});
</script>

<template>
  <div>
    <div id="chart"></div>
    <div>
      <pre><code>{{ data }}</code></pre>
    </div>
  </div>
</template>

<style scoped></style>
