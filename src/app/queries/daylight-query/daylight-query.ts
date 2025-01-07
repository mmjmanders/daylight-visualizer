import { useQuery } from '@tanstack/vue-query';
import { computed, Ref } from 'vue';
import dayjs from 'dayjs';

const parseField: (day: any, field: string, date: number) => number = (
  day,
  field,
  date
) =>
  dayjs(`${day.date} ${day[field]}`, 'YYYY-MM-DD H:mm:ss A').valueOf() - date;

const transform = (data: any): Datum[] =>
  data && data.results && data.status === 'OK'
    ? data.results.map((d) => {
        const date = dayjs(d.date).valueOf();
        return {
          date,
          dawn: parseField(d, 'dawn', date),
          dusk: parseField(d, 'dusk', date),
          sunrise: parseField(d, 'sunrise', date),
          sunset: parseField(d, 'sunset', date),
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
) =>
  useQuery({
    enabled: computed(
      () =>
        latitude.value != null &&
        longitude.value != null &&
        startDate.value != null &&
        endDate.value != null
    ),
    queryKey: ['daylight', latitude, longitude, startDate, endDate],
    queryFn: async () => {
      const res = await fetch(
        `https://api.sunrisesunset.io/json?lat=${latitude.value}&lng=${longitude.value}&date_start=${startDate.value}&date_end=${endDate.value}`,
        {
          method: 'GET',
        }
      );
      return res.json();
    },
    select: transform,
  });
