import { getRandomMockPoints } from '../mock/points.js';
import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';

const POINTS_COUNT = 5;

export default class PointsModel {
  destinations = mockDestinations;
  offers = mockOffers;
  points = Array.from({ length: POINTS_COUNT }, getRandomMockPoints);

  getDestinations() {
    return this.destinations;
  }

  getDestinationById(id) {
    return this.destinations.find((destination) => destination.id === id);
  }

  getOffers() {
    return this.offers;
  }

  getOffersByType(type) {
    return this.offers.find((offer) => offer.type === type);
  }

  getPoints() {
    return this.points;
  }
}
