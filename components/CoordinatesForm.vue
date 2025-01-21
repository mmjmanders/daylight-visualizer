<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { number, object, string } from 'zod';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faLocationCrosshairs, faSpinner } from '@fortawesome/free-solid-svg-icons';
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
        (start.isBefore(end) || start.isSame(end))
        && end.diff(start, 'year', true) <= 1
      );
    }),
  ),
});

const [latitude, latitudeAttrs] = defineField('latitude');
const [longitude, longitudeAttrs] = defineField('longitude');
const [startDate, startDateAttrs] = defineField('startDate');
const [endDate, endDateAttrs] = defineField('endDate');

const today = dayjs();
const startOfMonth = today.startOf('month');
const defaultStartDate
  = today.diff(startOfMonth, 'day') >= 10
    ? startOfMonth
    : today.subtract(10, 'day');
setFieldValue('startDate', defaultStartDate.format('YYYY-MM-DD'));
setFieldValue('endDate', today.format('YYYY-MM-DD'));

const latitudeRef = ref<number | null>(null);
const longitudeRef = ref<number | null>(null);
const startDateTimestamp = ref<string | null>(null);
const endDateTimestamp = ref<string | null>(null);
const { data, status } = await useAsyncData('daylight', () => $fetch(
  `https://api.sunrisesunset.io/json?lat=${latitudeRef.value}&lng=${longitudeRef.value}&date_start=${startDateTimestamp.value}&date_end=${endDateTimestamp.value}`,
), {
  immediate: false,
  server: false,
  transform: transformData,
  watch: [latitudeRef, longitudeRef, startDateTimestamp, endDateTimestamp],
});

const onSubmit = handleSubmit(({ latitude, longitude, startDate, endDate }) => {
  latitudeRef.value = latitude;
  longitudeRef.value = longitude;
  startDateTimestamp.value = dayjs(startDate).format('YYYY-MM-DD');
  endDateTimestamp.value = dayjs(endDate).format('YYYY-MM-DD');
});

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
      },
    );
  }
};

defineProps<{ modelValue: Datum[] | null }>();
const emit = defineEmits<{
  'update:modelValue': [value: Datum[]];
}>();

watch(data, (newValue) => {
  if (newValue) {
    emit('update:modelValue', newValue);
  }
});
</script>

<template>
  <div v-bind="$attrs">
    <form
      novalidate
      @submit.prevent="onSubmit"
    >
      <div class="row">
        <div class="col-4">
          <label
            for="latitude"
            class="form-label"
          >Latitude</label>
          <input
            id="latitude"
            v-model="latitude"
            class="form-control"
            :class="{ error: errors.latitude }"
            type="number"
            v-bind="latitudeAttrs"
          >
        </div>
        <div class="col-4">
          <label
            for="longitude"
            class="form-label"
          >Longitude</label>
          <input
            id="longitude"
            v-model="longitude"
            class="form-control"
            :class="{ error: errors.longitude }"
            type="number"
            v-bind="longitudeAttrs"
          >
        </div>
        <div class="col-auto d-flex flex-column justify-content-end">
          <button
            class="btn btn-primary"
            type="button"
            :disabled="gettingLocation || status === 'pending'"
            @click="getLocation()"
          >
            <FontAwesomeIcon
              v-if="gettingLocation"
              :icon="faSpinner"
              spin
            />
            <FontAwesomeIcon
              v-else
              :icon="faLocationCrosshairs"
            />
            <span>&nbsp;Get location</span>
          </button>
        </div>
      </div>

      <div class="row mt-2">
        <div class="col-4">
          <label
            for="startDate"
            class="form-label"
          >Start date</label>
          <input
            id="startDate"
            v-model="startDate"
            class="form-control"
            :class="{ error: errors.startDate }"
            type="date"
            v-bind="startDateAttrs"
          >
        </div>
        <div class="col-4">
          <label
            for="endDate"
            class="form-label"
          >End date</label>
          <input
            id="endDate"
            v-model="endDate"
            class="form-control"
            :class="{ error: errors.endDate }"
            type="date"
            v-bind="endDateAttrs"
          >
        </div>
        <div class="col-auto d-flex flex-column justify-content-end">
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="!meta.valid || status === 'pending'"
          >
            Submit&nbsp;<FontAwesomeIcon
              v-if="status === 'pending'"
              :icon="faSpinner"
              spin
            />
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
