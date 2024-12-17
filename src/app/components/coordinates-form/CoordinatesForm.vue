<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { number, object } from 'zod';

const { defineField, handleSubmit, errors, setFieldValue } = useForm({
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
  <form
    class="flex items-end gap-2"
    novalidate
    @submit.prevent="onSubmit"
  >
    <label class="block">
      <span class="block">Latitude</span>
      <input
        v-model="latitude"
        type="number"
        v-bind="latitudeAttrs"
      >
    </label>
    <label class="block">
      <span class="block">Longitude</span>
      <input
        v-model="longitude"
        type="number"
        v-bind="longitudeAttrs"
      >
    </label>
    <button
      class="align-bottom"
      type="submit"
      :disabled="Object.keys(errors).length > 0"
    >
      Submit
    </button>
  </form>
</template>

<style scoped></style>
