import { useQuery } from '@tanstack/vue-query';
import { computed, Ref } from 'vue';

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
  });
};
