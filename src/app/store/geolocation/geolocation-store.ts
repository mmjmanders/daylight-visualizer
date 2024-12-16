import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGeolocationStore = defineStore('geolocation', () => {
  const coords = ref<GeolocationCoordinates | null>(null);
  return { coords };
});
