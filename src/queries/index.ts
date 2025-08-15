export * from './geolocation-query';
export * from './reverse-geolocation-query';

export type Datum = {
  date: number;
  sunrise: number;
  sunset: number;
  timezone: string;
};
