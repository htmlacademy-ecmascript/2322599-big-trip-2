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

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function sortByDay(pointA, pointB) {
  const dateA = pointA.dateFrom;
  const dateB = pointB.dateFrom;
  const weight = getWeightForNullDate(dateA, dateB);

  return weight;
}

const getDuration = (point) => {
  const { startTime, endTime } = point;

  if (!startTime || !endTime) {
    return null; // Или можно вернуть { hours: 0, minutes: 0 }
  }

  return calculateDuration(startTime, endTime);
};

const sortByTime = (pointA, pointB) => {
  const durationA = getDuration(pointA);
  const durationB = getDuration(pointB);

  if (durationA === null && durationB === null) {
    return 0;
  }
  if (durationA === null) {
    return 1;
  }
  if (durationB === null) {
    return -1;
  }

  if (durationA.hours !== durationB.hours) {
    return durationA.hours - durationB.hours;
  }

  return durationA.minutes - durationB.minutes;
};

function sortByPrice(pointA, pointB) {
  const priceA = pointA.basePrice;
  const priceB = pointB.basePrice;

  return priceA - priceB;
}
export { formatDate, calculateDuration, isPointPast, isPointPresent, isPointFuture, sortByDay, sortByTime, sortByPrice };
