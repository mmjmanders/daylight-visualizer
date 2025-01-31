<script setup lang="ts">
const config = useRuntimeConfig();
</script>

<template>
  <span
    v-if="config?.public?.buildSha"
    class="font-monospace"
  >ver {{ config.public.buildSha }}</span>
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
