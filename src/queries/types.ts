type SunsetResult = {
  date: string;
  timezone: string;
  sunrise: string;
  sunset: string;
  day_length: string;
};

export type SunsetResponse = {
  status: string;
  results: SunsetResult[];
};

export type Datum = {
  date: number;
  sunrise: number;
  sunset: number;
  day_length: string;
  timezone: string;
  month: string;
};
