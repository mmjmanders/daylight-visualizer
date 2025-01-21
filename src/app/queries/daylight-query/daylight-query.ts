// import { useQuery } from '@tanstack/vue-query';
// import { computed, Ref } from 'vue';
// import dayjs from 'dayjs';
//
// export const useDaylightQuery = (
//   latitude: Ref<number | null>,
//   longitude: Ref<number | null>,
//   startDate: Ref<string | null>,
//   endDate: Ref<string | null>
// ) =>
//   useQuery({
//     enabled: computed(
//       () =>
//         latitude.value != null &&
//         longitude.value != null &&
//         startDate.value != null &&
//         endDate.value != null
//     ),
//     queryKey: ['daylight', latitude, longitude, startDate, endDate],
//     queryFn: async () => {
//       const res = await fetch(
//         `https://api.sunrisesunset.io/json?lat=${latitude.value}&lng=${longitude.value}&date_start=${startDate.value}&date_end=${endDate.value}`,
//         {
//           method: 'GET',
//         }
//       );
//       return res.json();
//     },
//     select: transform,
//   });
