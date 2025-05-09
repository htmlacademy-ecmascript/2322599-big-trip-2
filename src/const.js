// Типы событий
const EVENT_TYPES = [
  { type: 'taxi', label: 'Taxi' },
  { type: 'bus', label: 'Bus' },
  { type: 'train', label: 'Train' },
  { type: 'ship', label: 'Ship' },
  { type: 'drive', label: 'Drive' },
  { type: 'flight', label: 'Flight' },
  { type: 'check-in', label: 'Check-in' },
  { type: 'sightseeing', label: 'Sightseeing' },
  { type: 'restaurant', label: 'Restaurant' },
];

// Типы фильтров
const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

// Типы сортировки
const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

// Действия пользователя
const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

// Типы обновлений
const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR'
};

export { EVENT_TYPES, FilterType, SortType, UserAction, UpdateType };
