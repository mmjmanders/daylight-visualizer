import dayjs from 'dayjs';

export const parseField: (day: any, field: string, date: number) => number = (
  day,
  field,
  date,
) =>
  dayjs(`${day.date} ${day[field]}`, 'YYYY-MM-DD H:mm:ss A').valueOf() - date;
