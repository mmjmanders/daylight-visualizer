export default {
  form: {
    labels: {
      latitude: 'Breedtegraad',
      longitude: 'Lengtegraad',
      startDate: 'Startdatum',
      endDate: 'Einddatum',
      submit: 'Versturen',
      getLocation: 'Locatie bepalen',
    },
    warnings: {
      latitude: 'Breedtegraad moet tussen -90 en 90 liggen',
      longitude: 'Lengtegraad moet tussen -180 en 180 liggen',
      endDate: {
        'is-after-start': 'Einddatum moet hetzelfde als of na startdatum zijn',
        'is-at-least-6-weeks': 'Einddatum moet minstens 6 weken later zijn dan startdatum',
        'is-max-one-year-range': 'Periode mag niet langer zijn dan 1 jaar',
      },
    },
  },
  chart: {
    labels: {
      daylight: 'Daglicht',
      sunrise: 'Zonsopkomst',
      sunset: 'Zonsondergang',
    },
  },
};
