<script setup lang="ts">
import { number, object, string } from 'yup';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faExclamationCircle, faLocationCrosshairs, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { DateTime } from 'luxon';
import { Tooltip } from 'bootstrap';

const { meta, defineField, handleSubmit, errors, setFieldValue } = useForm({
  validationSchema: toTypedSchema(
    object({
      latitude: number().required().min(-90).max(90),
      longitude: number().required().min(-180).max(180),
      startDate: string().required(),
      endDate: string().required()
        .test('is-after-start', 'End date must be same or after start date', (val, context) => {
          const start = DateTime.fromISO(context.parent.startDate);
          const end = DateTime.fromISO(val);
          return end >= start;
        })
        .test('is-max-one-year-range', 'Date range must not exceed 1 year', (val, context) => {
          const start = DateTime.fromISO(context.parent.startDate);
          const end = DateTime.fromISO(val);
          return end.diff(start, 'years').years < 1;
        }),
    }),
  ),
});

const [latitude, latitudeAttrs] = defineField('latitude');
const [longitude, longitudeAttrs] = defineField('longitude');
const [startDate, startDateAttrs] = defineField('startDate');
const [endDate, endDateAttrs] = defineField('endDate');

const today = DateTime.now();
const startOfMonth = today.startOf('month');
const defaultStartDate
  = today.diff(startOfMonth, 'days').days >= 10
    ? startOfMonth
    : today.minus({ days: 10 });
setFieldValue('startDate', defaultStartDate.toISODate());
setFieldValue('endDate', today.toISODate());

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
  startDateTimestamp.value = startDate;
  endDateTimestamp.value = endDate;
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

onMounted(() => {
  document.querySelectorAll('[data-bs-toggle="tooltip"]')?.forEach(
    (element: Element) => {
      new Tooltip(element);
    });
});
</script>

<template>
  <div v-bind="$attrs">
    <form
      class="container d-flex flex-column gap-3"
      novalidate
      @submit.prevent="onSubmit"
    >
      <div class="row gap-3">
        <div class="col-12 col-md-4">
          <label
            for="latitude"
            class="form-label"
          >Latitude</label>
          <div :class="{ 'input-group': errors.latitude }">
            <input
              id="latitude"
              v-model="latitude"
              class="form-control"
              :class="{ 'is-invalid': errors.latitude }"
              type="number"
              v-bind="latitudeAttrs"
            >
            <span
              v-show="errors.latitude"
              class="input-group-text"
              data-bs-toggle="tooltip"
              data-bs-custom-class="error-tooltip"
              data-bs-title="Latitude must be between -90 and 90"
            >
              <FontAwesomeIcon
                class="text-danger"
                :icon="faExclamationCircle"
              />
            </span>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <label
            for="longitude"
            class="form-label"
          >Longitude</label>
          <div :class="{ 'input-group': errors.longitude }">
            <input
              id="longitude"
              v-model="longitude"
              class="form-control"
              :class="{ 'is-invalid': errors.longitude }"
              type="number"
              v-bind="longitudeAttrs"
            >
            <span
              v-show="errors.longitude"
              class="input-group-text"
              data-bs-toggle="tooltip"
              data-bs-custom-class="error-tooltip"
              data-bs-title="Longitude must be between -180 and 180"
            >
              <FontAwesomeIcon
                class="text-danger"
                :icon="faExclamationCircle"
              />
            </span>
          </div>
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

      <div class="row gap-3">
        <div class="col-12 col-md-4">
          <label
            for="startDate"
            class="form-label"
          >Start date</label>
          <input
            id="startDate"
            v-model="startDate"
            class="form-control"
            :class="{ 'is-invalid': errors.startDate }"
            type="date"
            v-bind="startDateAttrs"
          >
        </div>
        <div class="col-12 col-md-4">
          <label
            for="endDate"
            class="form-label"
          >End date</label>
          <div :class="{ 'input-group': errors.endDate }">
            <input
              id="endDate"
              v-model="endDate"
              class="form-control"
              :class="{ 'is-invalid': errors.endDate }"
              type="date"
              v-bind="endDateAttrs"
            >
            <span
              v-show="errors.endDate"
              class="input-group-text"
              data-bs-toggle="tooltip"
              data-bs-custom-class="error-tooltip"
              data-bs-title="End date must be same or after start date and not exceed 1 year"
            >
              <FontAwesomeIcon
                class="text-danger"
                :icon="faExclamationCircle"
              />
            </span>
          </div>
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
