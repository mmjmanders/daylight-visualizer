import { useQuery } from '@tanstack/vue-query';
import type { Ref } from 'vue';
import { computed } from 'vue';

const { VITE_GEOAPIFY_REVERSE_GEOLOCATION_API_BASE_URL: baseUrl, VITE_GEOAPIFY_API_KEY: apiKey } =
  import.meta.env;

export const useReverseGeolocationQuery = (
  lang: Ref<string>,
  lat: Ref<number | null>,
  lon: Ref<number | null>,
) =>
  useQuery({
    enabled: computed(() => lang.value != null && lat.value != null && lon.value != null),
    refetchOnWindowFocus: false,
    queryKey: ['reverseGeolocation', lang, lat, lon],
    queryFn: async () => {
      const response = await fetch(
        `${baseUrl}?lang=${lang.value}&lat=${lat.value}&lon=${lon.value}&format=json&apiKey=${apiKey}`,
        {
          method: 'GET',
        },
      );
      if (!response.ok) {
        throw new Error('Failed to fetch reverse geolocation');
      }
      return response.json();
    },
    select: (data: any) => {
      if (data?.results?.length !== 0 && data.results[0].formatted != null) {
        return { address: data.results[0].formatted };
      }
      return null;
    },
  });
