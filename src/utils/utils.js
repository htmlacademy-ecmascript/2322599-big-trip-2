import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YY';
const TIME_FORMAT = 'HH:mm';
const ALT_DATE_FORMAT = 'MMM DD';
const EDIT_FORMAT = 'DD/MM/YYYY HH:mm';
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
    case 'edit':
      return dayjs(date).format(EDIT_FORMAT);
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

function parseDateForFlatpickr(date) {
  if (date instanceof Date) {
    return date;
  }

  if (typeof date === 'string' && date.includes('T')) {
    return new Date(date);
  }

  if (typeof date === 'string') {
    const [datePart, timePart] = date.split(' ');
    const [day, month, year] = datePart.split('/');
    const [hours, minutes] = timePart.split(':');

    return new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10),
      parseInt(hours, 10),
      parseInt(minutes, 10)
    );
  }

  return new Date();
}

function formatDateForFlatpickr(date) {
  const dateObj = parseDateForFlatpickr(date);

  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear().toString().slice(-2);
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export { formatDate, calculateDuration, isPointPast, isPointPresent, isPointFuture, sortByDay, sortByTime, sortByPrice, parseDateForFlatpickr, formatDateForFlatpickr };
