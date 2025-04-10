import { getRandomMockPoints } from '../mock/points.js';
import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';

const POINTS_COUNT = 5;

export default class PointsModel {
  #destinations = mockDestinations;
  #offers = mockOffers;
  #points = this.generateUniquePoints();

  generateUniquePoints() {
    const uniqueIds = new Set();
    const points = [];

    while (points.length < POINTS_COUNT) {
      const mockPoint = getRandomMockPoints();
      if (!uniqueIds.has(mockPoint.id)) {
        uniqueIds.add(mockPoint.id);
        points.push(mockPoint);
      }
    }

    return points;
  }

  get destinations() {
    return this.#destinations;
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }

  get offers() {
    return this.#offers;
  }

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type);
  }

  get points() {
    return this.#points;
  }
}
