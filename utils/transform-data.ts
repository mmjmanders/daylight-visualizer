import dayjs from 'dayjs';

export const transformData = (data: any): Datum[] =>
  data && data.results && data.status === 'OK'
    ? data.results.map((d: any) => {
        const date = dayjs(d.date).valueOf();
        return {
          date,
          dawn: parseField(d, 'dawn', date),
          dusk: parseField(d, 'dusk', date),
          sunrise: parseField(d, 'sunrise', date),
          sunset: parseField(d, 'sunset', date),
        };
      })
    : [];
