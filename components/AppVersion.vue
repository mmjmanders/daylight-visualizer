<script setup lang="ts">
const { buildSha: version } = useRuntimeConfig().public;
</script>

<template>
  <span class="font-monospace">v{{ version }}</span>
</template>

<style scoped lang="scss">
span {
  position: absolute;
  right: 0;
  bottom: -1.25rem;
  font-weight: normal;
  font-size: .75rem;
}
</style>
