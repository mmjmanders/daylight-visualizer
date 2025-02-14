export default {
  form: {
    labels: {
      address: 'Adres',
      findLocation: 'Zoek locatie',
      latitude: 'Breedtegraad',
      longitude: 'Lengtegraad',
      startDate: 'Startdatum',
      endDate: 'Einddatum',
      submit: 'Versturen',
      getLocation: 'Locatie bepalen',
    },
    warnings: {
      latitude: {
        'is-required': 'Breedtegraad is verplicht',
        'range': 'Breedtegraad moet tussen -90 en 90 liggen',
      },
      longitude: {
        'is-required': 'Lengtegraad is verplicht',
        'range': 'Lengtegraad moet tussen -180 en 180 liggen',
      },
      startDate: {
        'is-required': 'Startdatum is verplicht',
      },
      endDate: {
        'is-after-start': 'Einddatum moet na startdatum liggen',
        'is-at-least-6-weeks': 'Einddatum moet minstens 6 weken later zijn dan startdatum',
        'is-max-one-year-range': 'Periode mag niet langer zijn dan 1 jaar',
        'is-required': 'Einddatum is verplicht',
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
