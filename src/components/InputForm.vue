<script setup lang="ts">
import { useForm } from 'vee-validate';
import { computed, ref, watch } from 'vue';
import { object, string } from 'yup';
import { faLocationCrosshairs, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { DateTime } from 'luxon';
import { useI18n } from 'vue-i18n';
import {
  type Datum,
  useGeolocationQuery,
  useReverseGeolocationQuery,
  useSunsetQuery,
} from '@/queries';
import { offset, useFloating } from '@floating-ui/vue';
import { toTypedSchema } from '@vee-validate/yup';

const { locale } = useI18n();

const chartData = defineModel<Datum[]>('chartData');
const { meta, defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(
    object({
      address: string()
        .required('is-required')
        .test('is-required', 'is-required', (value) => value?.trim()?.length !== 0),
      startDate: string()
        .required('is-required')
        .test('start-before-end', 'start-before-end', (value, context) => {
          const startDate = DateTime.fromISO(value);
          const endDate = DateTime.fromISO(context.parent.endDate);
          return startDate <= endDate;
        }),
      endDate: string()
        .required('is-required')
        .test('min-range', 'min-range', (value, context) => {
          const startDate = DateTime.fromISO(context.parent.startDate);
          const endDate = DateTime.fromISO(value);
          return endDate.diff(startDate, 'months').months >= 1;
        })
        .test('max-range', 'max-range', (value, context) => {
          const startDate = DateTime.fromISO(context.parent.startDate);
          const endDate = DateTime.fromISO(value);
          return endDate.diff(startDate, 'years').years < 1;
        }),
    }),
  ),
});

const addressInputRef = ref<HTMLInputElement | null>(null);
const addressTooltipRef = ref<HTMLDivElement | null>(null);
const { floatingStyles: addressTooltipStyles } = useFloating(addressInputRef, addressTooltipRef, {
  placement: 'top',
  middleware: [offset(10)],
});
const startDateInputRef = ref<HTMLInputElement | null>(null);
const startDateTooltipRef = ref<HTMLDivElement | null>(null);
const { floatingStyles: startDateTooltipStyles } = useFloating(
  startDateInputRef,
  startDateTooltipRef,
  {
    placement: 'top',
    middleware: [offset(10)],
  },
);
const endDateInputRef = ref<HTMLInputElement | null>(null);
const endDateTooltipRef = ref<HTMLDivElement | null>(null);
const { floatingStyles: endDateTooltipStyles } = useFloating(endDateInputRef, endDateTooltipRef, {
  placement: 'top',
  middleware: [offset(10)],
});

const defaultEndDate = DateTime.now();
const defaultStartDate = defaultEndDate.minus({ months: 1 });

const [addressModel, addressModelAttrs] = defineField('address');
const [startDateModel, startDateModelAttrs] = defineField('startDate');
const [endDateModel, endDateModelAttrs] = defineField('endDate');
startDateModel.value = defaultStartDate.toISODate();
endDateModel.value = defaultEndDate.toISODate();

const reverseGeocodingLatitudeRef = ref<number | null>(null);
const reverseGeocodingLongitudeRef = ref<number | null>(null);
const lang = ref(locale.value);
const { data: reverseGeocodingData, isFetching: isLoadingReverseGeocodingData } =
  useReverseGeolocationQuery(lang, reverseGeocodingLatitudeRef, reverseGeocodingLongitudeRef);

watch(reverseGeocodingData, (data) => {
  if (data != null) {
    addressModel.value = data.address;
  }
});

const isUsingLocationApi = ref(false);
const useLocationApi = () => {
  if (navigator.geolocation) {
    isUsingLocationApi.value = true;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        isUsingLocationApi.value = false;
        reverseGeocodingLatitudeRef.value = position.coords.latitude;
        reverseGeocodingLongitudeRef.value = position.coords.longitude;
      },
      (error) => {
        console.error('Error using Location API:', error.message);
        isUsingLocationApi.value = false;
      },
    );
  }
};

const addressRef = ref<string | undefined>(undefined);
const { data: geocodingData, isFetching: isLoadingGeocodingData } = useGeolocationQuery(addressRef);

const latitudeRef = ref<number | null>(null);
const longitudeRef = ref<number | null>(null);
const startDateRef = ref<string | undefined>(undefined);
const endDateRef = ref<string | undefined>(undefined);

const { data: sunsetData, isFetching: isLoadingSunsetData } = useSunsetQuery(
  latitudeRef,
  longitudeRef,
  startDateRef,
  endDateRef,
);

watch(geocodingData, (data) => {
  if (data != null) {
    latitudeRef.value = data.lat;
    longitudeRef.value = data.lon;
  }
});

watch(sunsetData, (data) => {
  if (data?.length !== 0) {
    chartData.value = data;
  }
});

const onSubmit = handleSubmit(() => {
  addressRef.value = addressModel.value;
  startDateRef.value = startDateModel.value;
  endDateRef.value = endDateModel.value;
});

const isLoadingData = computed(
  () =>
    isUsingLocationApi.value ||
    isLoadingReverseGeocodingData.value ||
    isLoadingGeocodingData.value ||
    isLoadingSunsetData.value,
);
</script>

<template>
  <div>
    <form @submit.prevent="onSubmit()" class="d-flex flex-column gap-2">
      <div class="row row-gap-2">
        <div class="col-12 col-md-8">
          <label for="address" class="form-label">{{ $t('form.labels.address') }}</label>
          <input
            v-bind="addressModelAttrs"
            v-model="addressModel"
            id="address"
            ref="addressInputRef"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.address }"
          />
          <span
            v-if="errors.address"
            ref="addressTooltipRef"
            class="popover bg-danger px-2 py-1 rounded-2 text-white"
            :style="addressTooltipStyles"
            >{{ $t(`form.errors.address.${errors.address}`) }}</span
          >
        </div>
        <div class="col-auto d-flex flex-column justify-content-end">
          <button
            type="button"
            class="btn btn-primary"
            :class="{ disabled: isLoadingData }"
            :disabled="isLoadingData"
            @click="useLocationApi()"
          >
            <FontAwesomeIcon
              v-if="isUsingLocationApi || isLoadingReverseGeocodingData"
              :icon="faSpinner"
              spin
            />
            <FontAwesomeIcon v-else :icon="faLocationCrosshairs" />
            <span>&nbsp;{{ $t('form.labels.getLocation') }}</span>
          </button>
        </div>
      </div>
      <div class="row row-gap-2">
        <div class="col-12 col-md-4">
          <label for="startDate" class="form-label">{{ $t('form.labels.startDate') }}</label>
          <input
            v-bind="startDateModelAttrs"
            v-model="startDateModel"
            id="startDate"
            ref="startDateInputRef"
            type="date"
            class="form-control"
            :class="{ 'is-invalid': errors.startDate }"
          />
          <span
            v-if="errors.startDate"
            ref="startDateTooltipRef"
            class="popover bg-danger px-2 py-1 rounded-2 text-white"
            :style="startDateTooltipStyles"
            >{{ $t(`form.errors.startDate.${errors.startDate}`) }}</span
          >
        </div>
        <div class="col-12 col-md-4">
          <label for="endDate" class="form-label">{{ $t('form.labels.endDate') }}</label>
          <input
            v-bind="endDateModelAttrs"
            v-model="endDateModel"
            id="endDate"
            ref="endDateInputRef"
            type="date"
            class="form-control"
            :class="{ 'is-invalid': errors.endDate }"
          />
          <span
            v-if="errors.endDate"
            ref="endDateTooltipRef"
            class="popover bg-danger px-2 py-1 rounded-2 text-white"
            :style="endDateTooltipStyles"
            >{{ $t(`form.errors.endDate.${errors.endDate}`) }}</span
          >
        </div>
        <div class="col-auto d-flex flex-column justify-content-end">
          <button
            type="submit"
            class="btn btn-primary"
            :class="{ disabled: !meta.valid || isLoadingData }"
            :disabled="!meta.valid || isLoadingData"
          >
            {{ $t('form.labels.submit') }}
            <template v-if="isLoadingGeocodingData || isLoadingSunsetData">
              <span>&nbsp;</span>
              <FontAwesomeIcon :icon="faSpinner" spin />
            </template>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
