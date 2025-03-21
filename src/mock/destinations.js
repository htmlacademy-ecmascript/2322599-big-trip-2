import { getRandomInteger, getRandomArrayElement } from '../utils.js';
import { DESCRIPTIONS_DESTINATION, NAME_DESTINATION, MAX_COUNT } from '../const.js';

const mockDestinations = [
  {
    id: 111,
    description: getRandomArrayElement(DESCRIPTIONS_DESTINATION),
    name: getRandomArrayElement(NAME_DESTINATION),
    pictures: []
  },

  {
    id: 222,
    description: getRandomArrayElement(DESCRIPTIONS_DESTINATION),
    name: getRandomArrayElement(NAME_DESTINATION),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_COUNT)}`,
        description: getRandomArrayElement(DESCRIPTIONS_DESTINATION),
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_COUNT)}`,
        description: getRandomArrayElement(DESCRIPTIONS_DESTINATION),
      }
    ]
  },

  {
    id: 333,
    description: getRandomArrayElement(DESCRIPTIONS_DESTINATION),
    name: getRandomArrayElement(NAME_DESTINATION),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_COUNT)}`,
        description: getRandomArrayElement(DESCRIPTIONS_DESTINATION),
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_COUNT)}`,
        description: getRandomArrayElement(DESCRIPTIONS_DESTINATION),
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_COUNT)}`,
        description: getRandomArrayElement(DESCRIPTIONS_DESTINATION),
      }
    ]
  },

  {
    id: 444,
    description: getRandomArrayElement(DESCRIPTIONS_DESTINATION),
    name: getRandomArrayElement(NAME_DESTINATION),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_COUNT)}`,
        description: getRandomArrayElement(DESCRIPTIONS_DESTINATION),
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_COUNT)}`,
        description: getRandomArrayElement(DESCRIPTIONS_DESTINATION),
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_COUNT)}`,
        description: getRandomArrayElement(DESCRIPTIONS_DESTINATION),
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_COUNT)}`,
        description: getRandomArrayElement(DESCRIPTIONS_DESTINATION),
      }
    ]
  },

  {
    id: 555,
    description: getRandomArrayElement(DESCRIPTIONS_DESTINATION),
    name: getRandomArrayElement(NAME_DESTINATION),
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger(0, MAX_COUNT)}`,
        description: getRandomArrayElement(DESCRIPTIONS_DESTINATION),
      }
    ]
  },
];

export { mockDestinations };
