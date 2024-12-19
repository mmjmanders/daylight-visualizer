<script setup lang="ts">
defineProps<{ data: any }>();
</script>

<template>
  <div>
    <div
      v-if="data"
      id="chart"
    />
  </div>
</template>

<style scoped></style>
