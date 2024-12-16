<script setup lang="ts">
import { useGeolocationStore } from './store';
import { onMounted } from 'vue';

const store = useGeolocationStore();

const getLocation = () => {
  if (!navigator.geolocation) {
    store.error = 'Geolocation is not supported by your browser';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (currentPosition) => {
      store.coords = currentPosition.coords;
      store.locationAllowed = true;
      store.error = null;
    },
    (err) => {
      switch (err.code) {
        case err.PERMISSION_DENIED:
          store.error = 'User denied the request to use geolocation';
          break;
        case err.POSITION_UNAVAILABLE:
          store.error = 'Location information is unavailable';
          break;
        case err.TIMEOUT:
          store.error = 'Geolocation request timed out';
          break;
        default:
          store.error = 'An unknown error occurred';
          break;
      }
    }
  );
};

const checkPermissionsAndGetLocation = async () => {
  try {
    const status = await navigator.permissions.query({ name: 'geolocation' });
    if (status.state === 'denied') {
      store.error =
        'Location access is denied. Please enable it in your browser settings.';
      return;
    }
    if (status.state === 'granted' || status.state === 'prompt') {
      getLocation();
    }
  } catch (error) {
    store.error = 'An error occurred while checking location permissions.';
  }
};

onMounted(() => {
  if (!store.locationAllowed) {
    checkPermissionsAndGetLocation();
  }
});
</script>

<template>
  <h1 />
</template>
