import { useQuery } from '@tanstack/vue-query';
import { type Ref, computed } from 'vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DATE_FORMAT_FULL, DATE_FORMAT_SHORT, type ChartData, type Datum } from './types';

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
    select: (data: any): ChartData | undefined => {
      if (data?.status === 'OK' && data.results && data.results.length) {
        return data.results
          .map(
            (d: {
              date: string;
              timezone: string;
              sunrise: string;
              sunset: string;
              day_length: string;
            }) => {
              const date = dayjs.tz(d.date, d.timezone).startOf('day').valueOf();
              const sunrise =
                dayjs.tz(`${d.date} ${d.sunrise}`, DATE_FORMAT_FULL, d.timezone).valueOf() - date;
              const sunset =
                dayjs.tz(`${d.date} ${d.sunset}`, DATE_FORMAT_FULL, d.timezone).valueOf() - date;

              return {
                month: dayjs(d.date).format(DATE_FORMAT_SHORT),
                date,
                sunrise,
                sunset,
                day_length: d.day_length,
                timezone: d.timezone,
              };
            },
          )
          .reduce((previousValue: Map<string, Datum[]>, currentvalue: any) => {
            const { month, ...datum } = currentvalue;
            return previousValue.set(month, [...(previousValue.get(month) ?? []), datum]);
          }, new Map<string, Datum[]>());
      }
      return undefined;
    },
  });
