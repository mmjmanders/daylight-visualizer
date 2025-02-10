import { DateTime } from 'luxon';

export default function (data: any): Datum[] {
  return (data && data.results && data.status === 'OK')
    ? data.results.map((d: any) => {
        const date = DateTime.fromISO(d.date, { zone: d.timezone }).toMillis();
        return {
          date,
          sunrise: parseDateField(d, 'sunrise', date),
          sunset: parseDateField(d, 'sunset', date),
          timezone: d.timezone,
          day_length: d.day_length,
        };
      })
    : [];
}
