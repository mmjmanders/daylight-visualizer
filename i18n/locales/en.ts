export default {
  form: {
    labels: {
      latitude: 'Latitude',
      longitude: 'Longitude',
      startDate: 'Start date',
      endDate: 'End date',
      submit: 'Submit',
      getLocation: 'Get location',
    },
    warnings: {
      latitude: 'Latitude must be between -90 and 90',
      longitude: 'Longitude must be between -180 and 180',
      endDate: {
        'is-after-start': 'End date must be same as or after start date',
        'is-at-least-6-weeks': 'End date must be at least 6 weeks later than start date',
        'is-max-one-year-range': 'Date range must not exceed 1 year',
      },
    },
  },
  chart: {
    labels: {
      daylight: 'Daylight',
      sunrise: 'Sunrise',
      sunset: 'Sunset',
    },
  },
};
