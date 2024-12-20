import { useQuery } from '@tanstack/vue-query';
import { computed, Ref } from 'vue';
import dayjs from 'dayjs';

const transform = (data: any): Datum[] =>
  data && data.results && data.status === 'OK'
    ? data.results.map((d) => {
        const date = dayjs(d.date).valueOf();
        return {
          date,
          dawn:
            dayjs(`${d.date} ${d.dawn}`, 'YYYY-MM-DD H:mm:ss A').valueOf() -
            date,
          dusk:
            dayjs(`${d.date} ${d.dusk}`, 'YYYY-MM-DD H:mm:ss A').valueOf() -
            date,
          sunrise:
            dayjs(`${d.date} ${d.sunrise}`, 'YYYY-MM-DD H:mm:ss A').valueOf() -
            date,
          sunset:
            dayjs(`${d.date} ${d.sunset}`, 'YYYY-MM-DD H:mm:ss A').valueOf() -
            date,
        };
      })
    : [];

export type Datum = {
  date: number;
  dawn: number;
  dusk: number;
  sunrise: number;
  sunset: number;
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
        latitude.value != null &&
        longitude.value != null &&
        startDate.value != null &&
        endDate.value != null
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
