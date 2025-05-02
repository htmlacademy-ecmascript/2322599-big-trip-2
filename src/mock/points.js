import { getRandomArrayElement } from '../utils/common.js';

const mockPoints = [
  {
    id: 1,
    basePrice: 1100,
    dateFrom: '2025-04-11T12:00:56.845Z',
    dateTo: '2025-04-11T13:00:56.845Z',
    destination: 111,
    isFavorite: true,
    offers: [],
    type: 'taxi'
  },

  {
    id: 2,
    basePrice: 1200,
    dateFrom: '2025-04-15T14:00:56.845Z',
    dateTo: '2025-04-15T20:00:56.845Z',
    destination: 222,
    isFavorite: false,
    offers: [21, 22, 23],
    type: 'flight'
  },

  {
    id: 3,
    basePrice: 1300,
    dateFrom: '2025-02-04T22:00:56.845Z',
    dateTo: '2025-02-05T12:00:56.845Z',
    destination: 333,
    isFavorite: true,
    offers: [31, 32],
    type: 'bus'
  },

  {
    id: 4,
    basePrice: 1400,
    dateFrom: '2025-04-11T20:00:56.845Z',
    dateTo: '2025-04-12T15:00:56.845Z',
    destination: 444,
    isFavorite: false,
    offers: [41, 42],
    type: 'train'
  },

  {
    id: 5,
    basePrice: 1500,
    dateFrom: '2025-04-29T16:00:56.845Z',
    dateTo: '2025-04-29T18:00:56.845Z',
    destination: 555,
    isFavorite: true,
    offers: [51, 52, 53],
    type: 'check-in'
  },

  {
    id: 6,
    basePrice: 1600,
    dateFrom: '2025-05-10T10:00:56.845Z',
    dateTo: '2025-05-10T18:00:56.845Z',
    destination: 666,
    isFavorite: false,
    offers: [61, 62],
    type: 'ship'
  },

  {
    id: 7,
    basePrice: 800,
    dateFrom: '2025-04-20T08:00:56.845Z',
    dateTo: '2025-04-20T12:00:56.845Z',
    destination: 777,
    isFavorite: true,
    offers: [71, 72],
    type: 'drive'
  },

  {
    id: 8,
    basePrice: 500,
    dateFrom: '2025-03-15T09:00:56.845Z',
    dateTo: '2025-03-15T14:00:56.845Z',
    destination: 888,
    isFavorite: false,
    offers: [81, 82, 83],
    type: 'sightseeing'
  },

  {
    id: 9,
    basePrice: 900,
    dateFrom: '2025-06-01T19:00:56.845Z',
    dateTo: '2025-06-01T22:00:56.845Z',
    destination: 999,
    isFavorite: true,
    offers: [91, 92],
    type: 'restaurant'
  }
];

const getRandomMockPoints = () => getRandomArrayElement(mockPoints);

export { getRandomMockPoints };
