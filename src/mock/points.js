import { getRandomArrayElement } from '../utils.js';

const mockPoints = [
  {
    id: 1,
    basePrice: 1100,
    dateFrom: '2025-01-10T12:00',
    dateTo: '2025-01-10T13:00',
    destination: '111',
    isFavorite: true,
    offers: [],
    type: 'taxi'
  },

  {
    id: 2,
    basePrice: 1100,
    dateFrom: '2025-01-10T14:00',
    dateTo: '2025-01-10T20:00',
    destination: '222',
    isFavorite: false,
    offers: [21, 22, 23],
    type: 'flight'
  },

  {
    id: 3,
    basePrice: 1100,
    dateFrom: '2025-01-10T22:00',
    dateTo: '2025-01-11T12:00',
    destination: '333',
    isFavorite: true,
    offers: [31, 32],
    type: 'bus'
  },

  {
    id: 4,
    basePrice: 1100,
    dateFrom: '2025-01-11T20:00',
    dateTo: '2025-01-12T15:00',
    destination: '444',
    isFavorite: false,
    offers: [41, 42],
    type: 'train'
  },

  {
    id: 5,
    basePrice: 1100,
    dateFrom: '2025-01-12T16:00',
    dateTo: '2025-01-12T17:00',
    destination: '555',
    isFavorite: true,
    offers: [51, 52, 53],
    type: 'check-in'
  },
];

const getRandomMockPoints = getRandomArrayElement(mockPoints);

export { getRandomMockPoints };
