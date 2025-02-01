<script setup lang="ts">
const config = useRuntimeConfig();
</script>

<template>
  <span
    v-if="config.public.version && config.public.buildSha"
    class="font-monospace"
  >v{{ config.public.version }}-{{ config.public.buildSha }}</span>
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
