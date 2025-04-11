import { getRandomArrayElement } from '../utils/common.js';

const mockPoints = [
  {
    id: 1,
    basePrice: 1100,
    dateFrom: '2025-04-11T12:00',
    dateTo: '2025-04-11T13:00',
    destination: 111,
    isFavorite: true,
    offers: [],
    type: 'taxi'
  },

  {
    id: 2,
    basePrice: 1200,
    dateFrom: '2025-04-15T14:00',
    dateTo: '2025-04-15T20:00',
    destination: 222,
    isFavorite: false,
    offers: [21, 22, 23],
    type: 'flight'
  },

  {
    id: 3,
    basePrice: 1300,
    dateFrom: '2025-02-04T22:00',
    dateTo: '2025-02-05T12:00',
    destination: 333,
    isFavorite: true,
    offers: [31, 32],
    type: 'bus'
  },

  {
    id: 4,
    basePrice: 1400,
    dateFrom: '2025-04-11T20:00',
    dateTo: '2025-04-12T15:00',
    destination: 444,
    isFavorite: false,
    offers: [41, 42],
    type: 'train'
  },

  {
    id: 5,
    basePrice: 1500,
    dateFrom: '2025-04-04T16:00',
    dateTo: '2025-04-04T18:00',
    destination: 555,
    isFavorite: true,
    offers: [51, 52, 53],
    type: 'check-in'
  },
];

const getRandomMockPoints = () => getRandomArrayElement(mockPoints);

export { getRandomMockPoints };
