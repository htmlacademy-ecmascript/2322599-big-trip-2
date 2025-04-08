const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[Math.floor(Math.random() * elements.length)];

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export { getRandomInteger, getRandomArrayElement, updateItem };
