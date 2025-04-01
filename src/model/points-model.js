import { getRandomMockPoints } from '../mock/points.js';
import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';

const POINTS_COUNT = 5;

export default class PointsModel {
  #destinations = mockDestinations;
  #offers = mockOffers;
  #points = Array.from({ length: POINTS_COUNT }, getRandomMockPoints);

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
