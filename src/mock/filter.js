import { filter } from '../utils/filter.js';

function generateFilter(points) {
  return Object.entries(filter).map(
    ([filterType, filterPoint]) => ({
      type: filterType,
      count: filterPoint(points).length,
    }),
  );
}

export { generateFilter };
