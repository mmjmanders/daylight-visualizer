// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ChartData extends Map<string, Datum[]> {}

export type Datum = {
  date: number;
  sunrise: number;
  sunset: number;
  day_length: string;
  timezone: string;
};
