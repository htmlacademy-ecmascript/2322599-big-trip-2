import he from 'he';
import { EVENT_TYPES } from '../const.js';
import { formatDate, parseDateForFlatpickr, formatDateForFlatpickr } from '../utils/utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

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

function createAddNewPointTemplate(point, destination, offersList, destinations) {
  const { dateFrom, dateTo, offers, type, basePrice, isDisabled, isSaving } = point;

  const formattedStartDate = dateFrom ? formatDate(dateFrom, 'date') : '';
  const formattedEndDate = dateTo ? formatDate(dateTo, 'date') : '';
  const formattedStartTime = dateFrom ? formatDate(dateFrom, 'time') : '';
  const formattedEndTime = dateTo ? formatDate(dateTo, 'time') : '';

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

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
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination ? he.encode(destination.name) : ''}" list="destination-list-1" required ${isDisabled ? 'disabled' : ''}>
                    <datalist id="destination-list-1">
                      ${destinations.map((dest) => `<option value="${he.encode(dest.name)}"></option>`).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formattedStartDate} ${formattedStartTime}" ${isDisabled ? 'disabled' : ''}>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formattedEndDate} ${formattedEndTime}" ${isDisabled ? 'disabled' : ''}>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price"
                           id="event-price-1"
                           type="number"
                           name="event-price"
                           value="${basePrice}"
                           ${isDisabled ? 'disabled' : ''}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
                  <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>Cancel</button>
                </header>

                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    ${offersList ? createOfferDetailsTemplate(offersList, offers) : ''}
                  </section>
                  <section class="event__section  event__section--destination">
                    ${destination ? createDestinationTemplate(destination) : ''}
                  </section>
                </section>
              </form>
          </li>`;
}

export default class AddNewPointView extends AbstractStatefulView {
  #destination = null;
  #offersList = null;
  #onFormSubmit = null;
  #onCancelClick = null;
  #pointsModel = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ point, destination, offers, onFormSubmit, onCancelClick, pointsModel }) {
    super();
    const initialState = {
      ...AddNewPointView.parsePointToState(point),
      dateFrom: null,
      dateTo: null
    };
    this._setState(initialState);
    this.#destination = destination;
    this.#offersList = offers;
    this.#onFormSubmit = onFormSubmit;
    this.#onCancelClick = onCancelClick;
    this.#pointsModel = pointsModel;

    this._restoreHandlers();
  }

  get template() {
    return createAddNewPointTemplate(this._state, this.#destination, this.#offersList, this.#pointsModel.destinations);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeToggleHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#cancelClickHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offersChangeHandler);

    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  #priceChangeHandler = (evt) => {
    const price = parseInt(evt.target.value, 10);
    this._setState({
      ...this._state,
      basePrice: isNaN(price) ? 0 : price
    });
  };

  #cancelClickHandler = (evt) => {
    evt.preventDefault();
    this.#onCancelClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    const destinationInput = this.element.querySelector('.event__input--destination');
    const priceInput = this.element.querySelector('.event__input--price');
    const startTimeInput = this.element.querySelector('#event-start-time-1');
    const endTimeInput = this.element.querySelector('#event-end-time-1');

    const datalistOptions = Array.from(this.element.querySelector('#destination-list-1').options);
    const isValidDestination = datalistOptions.some((option) => option.value === destinationInput.value);
    const hasValidDates = startTimeInput.value && endTimeInput.value;
    const price = parseInt(priceInput.value, 10);
    const isValidPrice = !isNaN(price) && price > 0;

    if (!isValidDestination || !hasValidDates || !isValidPrice) {
      this.shake();
      return;
    }

    this.#onFormSubmit(AddNewPointView.parseStateToPoint(this._state));
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

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    if (!evt.target.classList.contains('event__offer-checkbox')) {
      return;
    }

    const offerId = Number(evt.target.name.split('-').pop());
    const offers = [...this._state.offers];

    if (evt.target.checked) {
      offers.push(offerId);
    } else {
      const index = offers.indexOf(offerId);
      if (index !== -1) {
        offers.splice(index, 1);
      }
    }

    this._setState({
      ...this._state,
      offers
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      ...this._state,
      dateFrom: userDate || null,
      dateTo: userDate && userDate > this._state.dateTo ? userDate : this._state.dateTo
    });

    if (this.#datepickerTo) {
      this.#datepickerTo.set('minDate', userDate || null);
    }
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      ...this._state,
      dateTo: userDate || null,
      dateFrom: userDate && userDate < this._state.dateFrom ? userDate : this._state.dateFrom
    });

    if (this.#datepickerFrom) {
      this.#datepickerFrom.set('maxDate', userDate || null);
    }
  };

  #setDatepickerCommon(elementId, defaultDate, onChange, minDate = null, maxDate = null) {
    const input = this.element.querySelector(`#${elementId}`);
    if (!input) {
      return;
    }

    if (elementId === 'event-start-time-1') {
      this.#datepickerFrom?.destroy();
      this.#datepickerFrom = null;
    } else {
      this.#datepickerTo?.destroy();
      this.#datepickerTo = null;
    }

    const options = {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      ...(defaultDate ? { defaultDate: parseDateForFlatpickr(defaultDate) } : {}),
      onChange,
      'time_24hr': true,
      allowInput: true,
      parseDate: parseDateForFlatpickr,
      formatDate: formatDateForFlatpickr,
      minDate: minDate ? parseDateForFlatpickr(minDate) : null,
      maxDate: maxDate ? parseDateForFlatpickr(maxDate) : null,
      allowEmpty: true
    };

    if (elementId === 'event-start-time-1') {
      this.#datepickerFrom = flatpickr(input, options);
    } else {
      this.#datepickerTo = flatpickr(input, options);
    }
  }

  #setDatepickerFrom() {
    this.#setDatepickerCommon(
      'event-start-time-1',
      this._state.dateFrom,
      this.#dateFromChangeHandler,
      null,
      this._state.dateTo
    );
  }

  #setDatepickerTo() {
    this.#setDatepickerCommon(
      'event-end-time-1',
      this._state.dateTo,
      this.#dateToChangeHandler,
      this._state.dateFrom,
      null
    );
  }

  static parsePointToState(point) {
    return {
      ...point,
      isDisabled: false,
      isSaving: false,
    };
  }

  static parseStateToPoint(state) {
    const point = { ...state };
    delete point.isDisabled;
    delete point.isSaving;
    return point;
  }
}
