import { DateTime } from 'luxon';

export default function (day: any, field: string, date: number): number {
  return DateTime.fromFormat(`${day.date} ${day[field]}`, 'yyyy-MM-dd h:mm:ss a').setZone(day.timezone).toMillis() - date;
}
