<script setup lang="ts">
import CoordinatesForm from '../coordinates-form/CoordinatesForm.vue';
import { ref } from 'vue';

const data = ref<any>(null);
</script>

<template>
  <CoordinatesForm v-model="data" />
  <div v-if="data">
    <pre><code>{{ data }}</code></pre>
  </div>
</template>

<style scoped></style>
