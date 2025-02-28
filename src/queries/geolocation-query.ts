import { useQuery } from '@tanstack/vue-query';
import type { Ref } from 'vue';
import { computed } from 'vue';

const { VITE_GEOAPIFY_GEOLOCATION_API_BASE_URL: baseUrl, VITE_GEOAPIFY_API_KEY: apiKey } =
  import.meta.env;

export const useGeolocationQuery = (text: Ref<string | undefined>) =>
  useQuery({
    enabled: computed(() => text.value != null),
    refetchOnWindowFocus: false,
    queryKey: ['geolocation', text],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}?text=${text.value}&format=json&apiKey=${apiKey}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch geolocation');
      }
      return response.json();
    },
    select: (data: any) => {
      if (
        data?.results?.length !== 0 &&
        data.results[0].lat != null &&
        data.results[0].lon != null
      ) {
        return { lat: data.results[0].lat, lon: data.results[0].lon };
      }
      return null;
    },
  });
