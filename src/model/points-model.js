import Observable from '../framework/observable.js';
import { getRandomMockPoints } from '../mock/points.js';
import { mockDestinations } from '../mock/destinations.js';
import { mockOffers } from '../mock/offers.js';

const POINTS_COUNT = 5;

export default class PointsModel extends Observable {
  #pointsApiService = null;
  #destinations = mockDestinations;
  #offers = mockOffers;
  #points = this.generateUniquePoints();

  constructor({ pointsApiService }) {
    super();
    this.#pointsApiService = pointsApiService;

    this.#pointsApiService.points.then((points) => {
      console.log(points);
    });
  }

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

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
