<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { number, object, string } from 'zod';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faLocationCrosshairs,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { ref } from 'vue';
import dayjs from 'dayjs';

const { meta, defineField, handleSubmit, errors, setFieldValue } = useForm({
  validationSchema: toTypedSchema(
    object({
      latitude: number().min(-90).max(90),
      longitude: number().min(-180).max(180),
      startDate: string().date(),
      endDate: string().date(),
    }).refine(({ startDate, endDate }) => {
      const start = dayjs(startDate);
      const end = dayjs(endDate);
      return (
        (start.isBefore(end) || start.isSame(end)) &&
        end.diff(start, 'year', true) <= 1
      );
    })
  ),
});

const [latitude, latitudeAttrs] = defineField('latitude');
const [longitude, longitudeAttrs] = defineField('longitude');
const [startDate, startDateAttrs] = defineField('startDate');
const [endDate, endDateAttrs] = defineField('endDate');

const onSubmit = handleSubmit(
  async ({ latitude, longitude, startDate, endDate }) => {
    const date_start = dayjs(startDate).format('YYYY-MM-DD');
    const date_end = dayjs(endDate).format('YYYY-MM-DD');
    const res = await fetch(
      `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date_start=${date_start}&date_end=${date_end}`
    );
    const data = await res.json();
    console.log(latitude, longitude, JSON.stringify(data, null, 2));
  }
);

const gettingLocation = ref(false);
const getLocation = () => {
  if (navigator.geolocation) {
    gettingLocation.value = true;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFieldValue('latitude', position.coords.latitude);
        setFieldValue('longitude', position.coords.longitude);
        gettingLocation.value = false;
      },
      (error) => {
        console.error(error);
        gettingLocation.value = false;
      }
    );
  }
};
</script>

<template>
  <form novalidate @submit.prevent="onSubmit" class="flex flex-col gap-4">
    <div class="flex items-end gap-4">
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
      <button
        type="button"
        class="align-bottom"
        :disabled="gettingLocation"
        @click="getLocation()"
      >
        <FontAwesomeIcon v-if="gettingLocation" :icon="faSpinner" spin />
        <FontAwesomeIcon v-else :icon="faLocationCrosshairs" />
        <span class="pl-1">Get location</span>
      </button>
    </div>
    <div class="flex items-end gap-4">
      <label class="block">
        <span class="block mb-1">Start date</span>
        <input
          v-model="startDate"
          :class="{ error: errors.startDate }"
          type="date"
          v-bind="startDateAttrs"
        />
      </label>
      <label class="block">
        <span class="block mb-1">End date</span>
        <input
          v-model="endDate"
          :class="{ error: errors.endDate }"
          type="date"
          v-bind="endDateAttrs"
        />
      </label>
      <button class="align-bottom" type="submit" :disabled="!meta.valid">
        Submit
      </button>
    </div>
  </form>
</template>

<style scoped></style>
