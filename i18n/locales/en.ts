export default {
  form: {
    labels: {
      address: 'Address',
      findLocation: 'Find location',
      latitude: 'Latitude',
      longitude: 'Longitude',
      startDate: 'Start date',
      endDate: 'End date',
      submit: 'Submit',
      getLocation: 'Get location',
    },
    warnings: {
      latitude: {
        'is-required': 'Latitude is required',
        'range': 'Latitude must be between -90 and 90',
      },
      longitude: {
        'is-required': 'Longitude is required',
        'range': 'Longitude must be between -180 and 180',
      },
      startDate: {
        'is-required': 'Start date is required',
      },
      endDate: {
        'is-after-start': 'End date must be after start date',
        'is-at-least-6-weeks': 'End date must be at least 6 weeks later than start date',
        'is-max-one-year-range': 'Date range must not exceed 1 year',
        'is-required': 'End date is required',
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
