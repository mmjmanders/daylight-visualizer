import { useQuery } from '@tanstack/vue-query'
import type { Ref } from 'vue'
import { computed } from 'vue'
import { DateTime } from 'luxon'

const { VITE_SUNSET_API_BASE_URL: baseUrl } = import.meta.env

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
      )
      if (!response.ok) {
        throw new Error('Failed to fetch sunset')
      }
      return response.json()
    },
    select: (data: any) => {
      if (data?.status === 'OK' && data.results?.length !== 0) {
        return data.results.map(
          (d: {
            date: string
            timezone: string
            sunrise: string
            sunset: string
            day_length: string
          }) => {
            const date = DateTime.fromISO(d.date, { zone: d.timezone }).toMillis()
            const sunrise =
              DateTime.fromFormat(d.sunrise, 'HH:mm:ss', { zone: d.timezone }).toMillis() - date
            const sunset =
              DateTime.fromFormat(d.sunset, 'HH:mm:ss', { zone: d.timezone }).toMillis() - date
            return {
              date,
              sunrise,
              sunset,
              day_length: d.day_length,
              timezone: d.timezone,
            }
          },
        )
      }
      return null
    },
  })
