<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { number, object } from 'zod';

const { meta, defineField, handleSubmit, errors, setFieldValue } = useForm({
  validationSchema: toTypedSchema(
    object({
      latitude: number().min(-90).max(90),
      longitude: number().min(-180).max(180),
    })
  ),
});

const [latitude, latitudeAttrs] = defineField('latitude');
const [longitude, longitudeAttrs] = defineField('longitude');

const onSubmit = handleSubmit(async ({ latitude, longitude }) => {
  // const res = await fetch(
  //   `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date_start=2024-01-01&date_end=2024-12-31`
  // );
  // const data = await res.json();
  console.log(latitudeAttrs, longitudeAttrs);
});
</script>

<template>
  <form class="flex items-end gap-2" novalidate @submit.prevent="onSubmit">
    <label class="block">
      <span class="block mb-1">Latitude</span>
      <input
        v-model="latitude"
        :class="{ error: errors.latitude }"
        type="number"
        v-bind="latitudeAttrs"
      />
    </label>
    <label class="block">
      <span class="block mb-1">Longitude</span>
      <input
        v-model="longitude"
        :class="{ error: errors.longitude }"
        type="number"
        v-bind="longitudeAttrs"
      />
    </label>
    <button class="align-bottom" type="submit" :disabled="!meta.valid">
      Submit
    </button>
  </form>
</template>

<style scoped></style>
