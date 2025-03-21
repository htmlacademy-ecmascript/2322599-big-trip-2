const MAX_COUNT = 100;

const DESCRIPTIONS_DESTINATION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const NAME_DESTINATION = ['Moscow', 'Rostov-on-Don', 'Irkutsk', 'Sochi', 'Krasnodar', 'Kaliningrad'];

const EVENT_TYPES = [
  { type: 'taxi', label: 'Taxi' },
  { type: 'bus', label: 'Bus' },
  { type: 'train', label: 'Train' },
  { type: 'ship', label: 'Ship' },
  { type: 'drive', label: 'Drive' },
  { type: 'flight', label: 'Flight', checked: true },
  { type: 'check-in', label: 'Check-in' },
  { type: 'sightseeing', label: 'Sightseeing' },
];

export { DESCRIPTIONS_DESTINATION, NAME_DESTINATION, MAX_COUNT, EVENT_TYPES };
