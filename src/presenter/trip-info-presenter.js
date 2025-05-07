import TripInfoView from '../view/trip-info-view.js';
import { render, remove } from '../framework/render.js';

export default class TripInfoPresenter {
  #tripMainContainer = null;
  #pointsModel = null;
  #tripInfoComponent = null;

  constructor({ tripMainContainer, pointsModel }) {
    this.#tripMainContainer = tripMainContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#renderTripInfo();
  }

  #getDestinations() {
    const points = this.#pointsModel.points;
    const destinations = [];

    points.forEach((point) => {
      const destination = this.#pointsModel.getDestinationById(point.destination);
      if (destination) {
        destinations.push(destination.name);
      }
    });

    return destinations;
  }

  #getDates() {
    const points = this.#pointsModel.points;
    if (points.length === 0) {
      return { start: null, end: null };
    }

    return {
      start: points[0].dateFrom,
      end: points[points.length - 1].dateTo
    };
  }

  #calculateTotalPrice() {
    const points = this.#pointsModel.points;
    let totalPrice = 0;

    points.forEach((point) => {
      totalPrice += point.basePrice;
      const offers = this.#pointsModel.getOffersByType(point.type);
      if (offers && offers.offers) {
        offers.offers.forEach((offer) => {
          if (point.offers.includes(offer.id)) {
            totalPrice += offer.price;
          }
        });
      }
    });

    return totalPrice;
  }

  #renderTripInfo() {
    const points = this.#pointsModel.points;
    if (points.length === 0) {
      if (this.#tripInfoComponent) {
        remove(this.#tripInfoComponent);
        this.#tripInfoComponent = null;
      }
      return;
    }

    const prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView({
      destinations: this.#getDestinations(),
      dates: this.#getDates(),
      totalPrice: this.#calculateTotalPrice()
    });

    if (prevTripInfoComponent) {
      remove(prevTripInfoComponent);
    }

    render(this.#tripInfoComponent, this.#tripMainContainer, 'afterbegin');
  }

  #handleModelEvent = () => {
    this.#renderTripInfo();
  };
}
