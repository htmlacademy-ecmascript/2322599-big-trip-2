import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YY';
const TIME_FORMAT = 'HH:mm';
const ALT_DATE_FORMAT = 'MMM DD';

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

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[Math.floor(Math.random() * elements.length)];

export { getRandomInteger, getRandomArrayElement, formatDate };
