import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGeolocationStore = defineStore('geolocation', () => {
  const coords = ref<GeolocationCoordinates | null>(null);
  const locationAllowed = ref(false);
  const error = ref<string | null>(null);
  return { coords, error, locationAllowed };
});
