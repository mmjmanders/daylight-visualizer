import { useQuery } from '@tanstack/vue-query';
import { computed, Ref } from 'vue';
import dayjs from 'dayjs'

const transform = (data: any): Datum[] =>
  data && data.results && data.status === 'OK' ? data.results.map((d) => ({
    date: dayjs(d.date).valueOf(),
    first: d.first_light,
    last: d.last_light,
    dawn: d.dawn,
    dusk: d.dusk,
    sunrise: d.sunrise,
    sunset: d.sunset,
  })) : [];

export type Datum = {
  date: number;
  first: string;
  last: string;
  dawn: string;
  dusk: string;
  sunrise: string;
  sunset: string;
};

export const useDaylightQuery = (
  latitude: Ref<number | null>,
  longitude: Ref<number | null>,
  startDate: Ref<string | null>,
  endDate: Ref<string | null>
) => {
  const queryKey = ['daylight', latitude, longitude, startDate, endDate];
  return useQuery({
    enabled: computed(
      () =>
        !!latitude.value &&
        !!longitude.value &&
        !!startDate.value &&
        !!endDate.value
    ),
    queryKey,
    queryFn: async () => {
      const res = await fetch(
        `https://api.sunrisesunset.io/json?lat=${latitude.value}&lng=${longitude.value}&date_start=${startDate.value}&date_end=${endDate.value}`
      );
      return res.json();
    },
    select: transform,
  });
};
