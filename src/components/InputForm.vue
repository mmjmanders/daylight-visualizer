<script setup lang="ts">
import { useForm } from 'vee-validate';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { object, string } from 'yup';
import { faLocationCrosshairs, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useI18n } from 'vue-i18n';
import {
  type ChartData,
  type Datum,
  useGeolocationQuery,
  useReverseGeolocationQuery,
  useSunsetQuery,
} from '@/queries';
import { offset, useFloating } from '@floating-ui/vue';
import { toTypedSchema } from '@vee-validate/yup';

dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);

const { locale } = useI18n();

const chartData = defineModel<ChartData>('chartData');
const emit = defineEmits<{
  chartTypeChange: [type: 'polar' | 'line'];
}>();

const { meta, defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(
    object({
      address: string()
        .required('is-required')
        .test('is-required', 'is-required', (value) => value?.trim()?.length !== 0),
      startDate: string().required('is-required'),
      endDate: string().required('is-required'),
      chartType: string().required(),
    }).test('valid-dates', (values, ctx) => {
      const { startDate, endDate } = values as { startDate: string; endDate: string };
      const start = dayjs(startDate, 'YYYY-MM-DD', true);
      const end = dayjs(endDate, 'YYYY-MM-DD', true);
      if (!start.isValid() || !end.isValid()) {
        return true;
      } else if (start.isAfter(end)) {
        return ctx.createError({ path: 'startDate', message: 'start-before-end' });
      } else if (end.diff(start, 'month', true) < 1) {
        return ctx.createError({ path: 'endDate', message: 'min-range' });
      } else if (end.diff(start, 'year', true) >= 1) {
        return ctx.createError({ path: 'endDate', message: 'max-range' });
      } else {
        return true;
      }
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

const defaultEndDate = dayjs();
const defaultStartDate = defaultEndDate.subtract(1, 'month');

const [addressModel, addressModelAttrs] = defineField('address');
const [startDateModel, startDateModelAttrs] = defineField('startDate');
const [endDateModel, endDateModelAttrs] = defineField('endDate');
const [chartTypeModel, chartTypeModelAttrs] = defineField('chartType');
startDateModel.value = defaultStartDate.format('YYYY-MM-DD');
endDateModel.value = defaultEndDate.format('YYYY-MM-DD');
chartTypeModel.value = 'polar';

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
    chartData.value = {
      chartType: chartTypeModel.value as 'polar' | 'line',
      data: data as Datum[],
    };
  }
});

watch(chartTypeModel, (newType) => {
  emit('chartTypeChange', newType as 'polar' | 'line');
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

const isNarrowDisplay = ref<boolean>(false);
const updateIsNarrowDisplay = () => {
  isNarrowDisplay.value = !matchMedia('(min-width: 992px)').matches;
};

watch(
  isNarrowDisplay,
  (narrow) => {
    if (narrow === true) {
      chartTypeModel.value = 'polar';
    }
  },
  { immediate: true },
);

onMounted(() => {
  updateIsNarrowDisplay();
  addEventListener('resize', updateIsNarrowDisplay);
});

onUnmounted(() => {
  removeEventListener('resize', updateIsNarrowDisplay);
});
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
        <div class="col-12 col-md-4 col-lg-3">
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
        <div class="col-12 col-md-4 col-lg-3">
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
        <div class="d-none d-lg-block col-lg-2">
          <label for="chartType" class="form-label">{{ $t('form.labels.chartType') }}</label>
          <fieldset :disabled="isNarrowDisplay">
            <select
              v-bind="chartTypeModelAttrs"
              v-model="chartTypeModel"
              id="chartType"
              class="form-select"
            >
              <option value="polar">{{ $t('form.labels.polar') }}</option>
              <option value="line">{{ $t('form.labels.line') }}</option>
            </select>
          </fieldset>
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
