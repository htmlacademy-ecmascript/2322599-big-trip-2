import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YY';
const TIME_FORMAT = 'HH:mm';
const ALT_DATE_FORMAT = 'MMM DD';
const EDIT_FORMAT = 'DD/MM/YY HH:mm';
const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 1440;

function formatDate(date, formatType = 'default') {
  if (!date) {
    return '';
  }

  const dateObj = dayjs(date);

  switch (formatType) {
    case 'alt':
      return dateObj.format(ALT_DATE_FORMAT).toUpperCase();
    case 'date':
      return dateObj.format(DATE_FORMAT);
    case 'time':
      return dateObj.format(TIME_FORMAT);
    case 'edit':
      return dateObj.format(EDIT_FORMAT);
    default:
      return dateObj.format();
  }
}

const calculateDuration = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);

  const durationInMinutes = end.diff(start, 'minute');

  const days = Math.floor(durationInMinutes / MINUTES_IN_DAY);
  const remainingMinutes = durationInMinutes % MINUTES_IN_DAY;
  const hours = Math.floor(remainingMinutes / MINUTES_IN_HOUR);
  const minutes = remainingMinutes % MINUTES_IN_HOUR;

  return { days, hours, minutes };
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
  if (!date) {
    return null;
  }

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

    const fullYear = 2000 + parseInt(year, 10);

    return new Date(
      fullYear,
      parseInt(month, 10) - 1,
      parseInt(day, 10),
      parseInt(hours, 10),
      parseInt(minutes, 10)
    );
  }

  return null;
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

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'minute');
}

export { formatDate, calculateDuration, isPointPast, isPointPresent, isPointFuture, sortByDay, sortByTime, sortByPrice, parseDateForFlatpickr, formatDateForFlatpickr, isDatesEqual };
