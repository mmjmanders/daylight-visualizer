export type Datum = {
  date: number;
  sunrise: number;
  sunset: number;
  day_length: string;
  timezone: string;
};

export type ChartData = {
  chartType: 'polar' | 'line';
  data: Datum[];
};
