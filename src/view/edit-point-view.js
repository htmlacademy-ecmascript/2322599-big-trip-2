import { EVENT_TYPES } from '../const.js';
import { formatDate } from '../utils/utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

function createOffersTemplate(offersList, offers) {
  if (!offersList || !offersList.offers) {
    return '';
  }

  return offersList.offers.map((offer) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox visually-hidden" id="event-offer-${offer.id}-1" type="checkbox" name="event-offer-${offer.id}" ${offers.includes(offer.id) ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${offer.id}-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  ).join('');
}

function createOfferDetailsTemplate(offersList, offers) {
  const offersMarkup = createOffersTemplate(offersList, offers);

  if (!offersMarkup) {
    return '';
  }

  return `<h3 class="event__section-title  event__section-title--offers">Offers</h3>
  <div class="event__available-offers">
  ${offersMarkup}
  </div>`;
}

function createDestinationTemplate(destination) {
  if (!destination) {
    return '';
  }

  const description = destination.description ?
    `<h3 class="event__section-title event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>` : '';

  const pictures = (destination.pictures && destination.pictures.length > 0) ?
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${destination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')}
      </div>
    </div>` : '';

  return description + pictures;
}

function createEventTypeItems(currentType) {
  return EVENT_TYPES.map(({ type, label }) =>
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="${type}" ${type === currentType ? 'checked' : ''}>
      <label class="event__type-label event__type-label--${type}" for="event-type-${type}-1">${label}</label>
    </div>`
  ).join('');
}

function createEditPointTemplate(point, destination, offersList) {
  const { dateFrom, dateTo, offers, type, basePrice } = point;

  const formattedStartDate = formatDate(dateFrom, 'date');
  const formattedEndDate = formatDate(dateTo, 'date');
  const formattedStartTime = formatDate(dateFrom, 'time');
  const formattedEndTime = formatDate(dateTo, 'time');

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${createEventTypeItems(type)}
                      </fieldset>
                    </div>
                  </div>
                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination ? destination.name : ''}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="Moscow"></option>
                      <option value="Rostov-on-Don"></option>
                      <option value="Irkutsk"></option>
                      <option value="Sochi"></option>
                      <option value="Krasnodar"></option>
                      <option value="Kaliningrad"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formattedStartDate} ${formattedStartTime}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formattedEndDate} ${formattedEndTime}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
                  </div>
                <button class="event__save-btn btn btn--blue" type="submit">Save</button>
                <button class="event__reset-btn btn" type="reset">Delete</button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    ${offersList ? createOfferDetailsTemplate(offersList, offers) : ''}
                  </section>
                  <section class="event__section event__section--destination">
                    ${destination ? createDestinationTemplate(destination) : ''}
                  </section>
                </section>
              </form>
          </li>`;
}

export default class EditPointView extends AbstractStatefulView {
  #destination = null;
  #offersList = null;
  #onButtonClick = null;
  #onFormSubmit = null;
  #pointsModel = null;

  constructor({ point, destination, offers, onButtonClick, onFormSubmit, pointsModel }) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#destination = destination;
    this.#offersList = offers;
    this.#onButtonClick = onButtonClick;
    this.#onFormSubmit = onFormSubmit;
    this.#pointsModel = pointsModel;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#destination, this.#offersList);
  }

  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#buttonClickHandler);
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeToggleHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
  }

  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    this.#onButtonClick(EditPointView.parseStateToPoint(this._state));
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #typeToggleHandler = (evt) => {
    evt.preventDefault();
    const selectedType = evt.target.value;

    const newOffersList = this.#pointsModel.getOffersByType(selectedType);

    this._setState({
      ...this._state,
      type: selectedType,
      offers: []
    });

    this.#offersList = newOffersList;

    this.updateElement({
      type: selectedType,
      offers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const selectedDestinationName = evt.target.value;

    const destinations = this.#pointsModel.destinations;
    const newDestination = destinations.find(
      (dest) => dest.name === selectedDestinationName
    );

    if (newDestination) {
      this.#destination = newDestination;
      this._setState({
        ...this._state,
        destination: newDestination.id
      });

      this.updateElement({
        destination: newDestination.id
      });
    }
  };

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    return { ...state };
  }
}
