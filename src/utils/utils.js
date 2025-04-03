import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YY';
const TIME_FORMAT = 'HH:mm';
const ALT_DATE_FORMAT = 'MMM DD';
const MINUTES_IN_HOUR = 60;

function formatDate(date, formatType = 'default') {
  if (!date) {
    return '';
  }

  switch (formatType) {
    case 'alt':
      return dayjs(date).format(ALT_DATE_FORMAT).toUpperCase();
    case 'date':
      return dayjs(date).format(DATE_FORMAT);
    case 'time':
      return dayjs(date).format(TIME_FORMAT);
    default:
      return dayjs(date).format();
  }
}

const calculateDuration = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);

  const durationInMinutes = end.diff(start, 'minute');

  const hours = Math.floor(durationInMinutes / MINUTES_IN_HOUR);
  const minutes = durationInMinutes % MINUTES_IN_HOUR;

  return { hours, minutes };
};

export { formatDate, calculateDuration };
