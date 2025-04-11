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

function isPointPast(dateFrom) {
  return dateFrom && dayjs(dateFrom).isBefore(dayjs(), 'minute');
}

function isPointPresent(dateFrom) {
  return dateFrom && dayjs(dateFrom).isSame(dayjs(), 'day') && dayjs(dateFrom).isAfter(dayjs().startOf('day'));
}

function isPointFuture(dateFrom) {
  return dateFrom && dayjs(dateFrom).isAfter(dayjs(), 'minute');
}

function sortByDay(taskA, taskB) {
  return new Date(taskA.dateFrom) - new Date(taskB.dateFrom);
}

function sortByTime(taskA, taskB) {
  const durationA = new Date(taskA.dateTo) - new Date(taskA.dateFrom);
  const durationB = new Date(taskB.dateTo) - new Date(taskB.dateFrom);

  return durationB - durationA;
}

function sortByPrice(taskA, taskB) {
  return taskB.basePrice - taskA.basePrice;
}

export { formatDate, calculateDuration, isPointPast, isPointPresent, isPointFuture, sortByDay, sortByTime, sortByPrice };
