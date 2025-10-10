import { useQuery } from '@tanstack/vue-query';
import { type Ref, computed } from 'vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { Datum, SunsetResponse } from './types';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const { VITE_SUNSET_API_BASE_URL: baseUrl } = import.meta.env;

export const useSunsetQuery = (
  lat: Ref<number | null>,
  lon: Ref<number | null>,
  startDate: Ref<string | undefined>,
  endDate: Ref<string | undefined>,
) =>
  useQuery({
    enabled: computed(
      () =>
        lat.value != null && lon.value != null && startDate.value != null && endDate.value != null,
    ),
    refetchOnWindowFocus: false,
    queryKey: ['sunset', lat, lon, startDate, endDate],
    queryFn: async () => {
      const response = await fetch(
        `${baseUrl}?lat=${lat.value}&lng=${lon.value}&date_start=${startDate.value}&date_end=${endDate.value}&time_format=24`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch sunset');
      }
      return response.json();
    },
    select: (data: SunsetResponse): Record<string, Datum[]> | undefined => {
      if (data?.status === 'OK' && data.results.length !== 0) {
        return data.results
          .map<Datum>((d) => {
            const date = dayjs.tz(d.date, d.timezone).startOf('day');
            const sunrise =
              dayjs.tz(`${d.date} ${d.sunrise}`, 'YYYY-MM-DD HH:mm:ss', d.timezone).valueOf() -
              date.valueOf();
            const sunset =
              dayjs.tz(`${d.date} ${d.sunset}`, 'YYYY-MM-DD HH:mm:ss', d.timezone).valueOf() -
              date.valueOf();

            return {
              date: date.valueOf(),
              sunrise,
              sunset,
              day_length: d.day_length,
              timezone: d.timezone,
              month: date.format('YYYY-MM'),
            };
          })
          ?.reduce(
            (acc, curr) => {
              (acc[curr.month] ??= []).push(curr);
              return acc;
            },
            {} as Record<string, Datum[]>,
          );
      }
      return undefined;
    },
  });
