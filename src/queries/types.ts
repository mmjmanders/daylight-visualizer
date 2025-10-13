// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ChartData extends Map<string, Datum[]> {}

export type Datum = {
  date: number;
  sunrise: number;
  sunset: number;
  day_length: string;
  timezone: string;
};

export const DATE_FORMAT_SHORT = 'YYYY-MM' as const;
export const DATE_FORMAT_LONG = 'YYYY-MM-DD' as const;
export const DATE_FORMAT_FULL = 'YYYY-MM-DD HH:mm:ss' as const;
