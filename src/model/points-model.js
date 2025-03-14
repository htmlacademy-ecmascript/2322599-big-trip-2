import { getRandomMockPoints } from '../mock/points.js';
import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';

const POINTS_COUNT = 4;

export default class PointsModel {
  destinations = mockDestinations;
  points = Array.from({ length: POINTS_COUNT }, getRandomMockPoints);
  offers = mockOffers;

  getPoints() {
    return this.points;
  }

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
    const offers = this.offers.find((offer) => offer.type === type);
    return offers ? offers.offers : [];
  }
}
