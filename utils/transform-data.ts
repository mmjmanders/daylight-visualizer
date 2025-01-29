import { DateTime } from 'luxon';

export default function (data: any): Datum[] {
  return (data && data.results && data.status === 'OK')
    ? data.results.map((d: any) => {
        const date = DateTime.fromISO(d.date).toMillis();
        return {
          date,
          dawn: parseDateField(d, 'dawn', date),
          dusk: parseDateField(d, 'dusk', date),
          sunrise: parseDateField(d, 'sunrise', date),
          sunset: parseDateField(d, 'sunset', date),
          timezone: d.timezone,
        };
      })
    : [];
}
