<script setup lang="ts">
import { number, object, string } from 'yup';
import { faLocationCrosshairs, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { DateTime } from 'luxon';
import { autoUpdate, offset, useFloating } from '@floating-ui/vue';

const { meta, defineField, handleSubmit, errors, setFieldValue } = useForm({
  validationSchema: toTypedSchema(
    object({
      latitude: number().required().min(-90).max(90),
      longitude: number().required().min(-180).max(180),
      startDate: string().required(),
      endDate: string().required()
        .test('is-after-start', 'is-after-start', (val, context) => {
          const start = DateTime.fromISO(context.parent.startDate);
          const end = DateTime.fromISO(val);
          return end >= start;
        })
        .test('is-at-least-6-weeks', 'is-at-least-6-weeks', (val, context) => {
          const start = DateTime.fromISO(context.parent.startDate);
          const end = DateTime.fromISO(val);
          return end.diff(start, 'weeks').weeks >= 6;
        })
        .test('is-max-one-year-range', 'is-max-one-year-range', (val, context) => {
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
const defaultStartDate
  = today.minus({ weeks: 6 });
setFieldValue('startDate', defaultStartDate.toISODate());
setFieldValue('endDate', today.toISODate());

const latitudeRef = ref<number | null>(null);
const longitudeRef = ref<number | null>(null);
const startDateTimestamp = ref<string | null>(null);
const endDateTimestamp = ref<string | null>(null);
const { data, status } = await useAsyncData('daylight', () => $fetch(
  'https://api.sunrisesunset.io/json',
  {
    method: 'GET',
    params: {
      lat: latitudeRef.value,
      lng: longitudeRef.value,
      date_start: startDateTimestamp.value,
      date_end: endDateTimestamp.value,
    },
  },
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

const latitudeInput = ref<HTMLElement | null>(null);
const latitudeTooltip = ref<HTMLElement | null>(null);
const { floatingStyles: latitudeTooltipStyles } = useFloating(latitudeInput, latitudeTooltip, {
  placement: 'top',
  whileElementsMounted: autoUpdate,
  middleware: [offset({ mainAxis: 10 })],
});

const longitudeInput = ref<HTMLElement | null>(null);
const longitudeTooltip = ref<HTMLElement | null>(null);
const { floatingStyles: longitudeTooltipStyles } = useFloating(longitudeInput, longitudeTooltip, {
  placement: 'top',
  whileElementsMounted: autoUpdate,
  middleware: [offset({ mainAxis: 10 })],
});

const endDateInput = ref<HTMLElement | null>(null);
const endDateTooltip = ref<HTMLElement | null>(null);
const { floatingStyles: endDateTooltipStyles } = useFloating(endDateInput, endDateTooltip, {
  placement: 'top',
  whileElementsMounted: autoUpdate,
  middleware: [offset({ mainAxis: 10 })],
});

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
      class="container d-flex flex-column gap-3"
      novalidate
      @submit.prevent="onSubmit"
    >
      <div class="row gap-3">
        <div class="col-12 col-md-4">
          <label
            for="latitude"
            class="form-label"
          >{{ $t('form.labels.latitude') }}</label>
          <input
            id="latitude"
            v-bind="latitudeAttrs"
            ref="latitudeInput"
            v-model="latitude"
            class="form-control"
            :class="{ 'is-invalid': errors.latitude }"
            type="number"
          >
          <span
            v-if="errors.latitude"
            ref="latitudeTooltip"
            class="error-tooltip"
            :style="latitudeTooltipStyles"
          >
            {{ $t('form.warnings.latitude') }}
          </span>
        </div>
        <div class="col-12 col-md-4">
          <label
            for="longitude"
            class="form-label"
          >{{ $t('form.labels.longitude') }}</label>
          <input
            id="longitude"
            ref="longitudeInput"
            v-model="longitude"
            class="form-control"
            :class="{ 'is-invalid': errors.longitude }"
            type="number"
            v-bind="longitudeAttrs"
          >
          <span
            v-if="errors.longitude"
            ref="longitudeTooltip"
            class="error-tooltip"
            :style="longitudeTooltipStyles"
          >
            {{ $t('form.warnings.longitude') }}
          </span>
        </div>
        <div class="col-auto d-flex flex-column justify-content-end">
          <button
            class="btn btn-primary"
            type="button"
            :disabled="gettingLocation || status === 'pending'"
            @click="getLocation()"
          >
            <FontAwesome
              v-if="gettingLocation"
              :icon="faSpinner"
              spin
            />
            <FontAwesome
              v-else
              :icon="faLocationCrosshairs"
            />
            <span>&nbsp;{{ $t('form.labels.getLocation') }}</span>
          </button>
        </div>
      </div>

      <div class="row gap-3">
        <div class="col-12 col-md-4">
          <label
            for="startDate"
            class="form-label"
          >{{ $t('form.labels.startDate') }}</label>
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
          >{{ $t('form.labels.endDate') }}</label>
          <input
            id="endDate"
            v-bind="endDateAttrs"
            ref="endDateInput"
            v-model="endDate"
            class="form-control"
            :class="{ 'is-invalid': errors.endDate }"
            type="date"
          >
          <span
            v-if="errors.endDate"
            ref="endDateTooltip"
            class="error-tooltip"
            :style="endDateTooltipStyles"
          >
            {{ $t(`form.warnings.endDate.${errors.endDate}`) }}
          </span>
        </div>
        <div class="col-auto d-flex flex-column justify-content-end">
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="!meta.valid || status === 'pending'"
          >
            {{ $t('form.labels.submit') }}&nbsp;<FontAwesome
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
