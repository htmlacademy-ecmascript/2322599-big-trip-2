import he from 'he';
import { EVENT_TYPES } from '../const.js';
import { formatDate, parseDateForFlatpickr, formatDateForFlatpickr } from '../utils/utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Создание шаблона дополнительных опций
function createOffersTemplate(selectedOffers, offers, isDisabled) {
  if (!offers || !offers.offers) {
    return '';
  }

  return offers.offers.map((offer) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox visually-hidden"
             id="event-offer-${offer.id}-1"
             type="checkbox"
             name="event-offer-${offer.id}"
             ${selectedOffers.includes(offer.id) ? 'checked' : ''}
             ${isDisabled ? 'disabled' : ''}>
      <label class="event__offer-label" for="event-offer-${offer.id}-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  ).join('');
}

// Создание шаблона блока с опциями
function createOfferDetailsTemplate(selectedOffers, offers, isDisabled) {
  const offersMarkup = createOffersTemplate(selectedOffers, offers, isDisabled);
  return offersMarkup ? `
    <section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersMarkup}
      </div>
    </section>` : '';
}

// Создание шаблона блока с описанием направления
function createDestinationTemplate(destination) {
  if (!destination) {
    return '';
  }

  return `
    ${destination.description ? `
      <h3 class="event__section-title event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>` : ''}
    ${destination.pictures?.length ? `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${destination.pictures.map((pic) =>
    `<img class="event__photo" src="${pic.src}" alt="${pic.description}">`).join('')}
        </div>
      </div>` : ''}
  `;
}

// Создание шаблона типов событий
function createEventTypeItems(currentType) {
  return EVENT_TYPES.map(({ type, label }) => `
    <div class="event__type-item">
      <input id="event-type-${type}-1"
             class="event__type-input visually-hidden"
             type="radio"
             name="event-type"
             value="${type}"
             ${type === currentType ? 'checked' : ''}>
      <label class="event__type-label event__type-label--${type}"
             for="event-type-${type}-1">${label}</label>
    </div>
  `).join('');
}

// Создание шаблона формы добавления новой точки
function createAddNewPointTemplate(state, destination, offers, destinations) {
  const { dateFrom, dateTo, selectedOffers, type, basePrice, isDisabled, isSaving } = state;

  const formattedStartDate = dateFrom ? formatDate(dateFrom, 'date') : '';
  const formattedEndDate = dateTo ? formatDate(dateTo, 'date') : '';
  const formattedStartTime = dateFrom ? formatDate(dateFrom, 'time') : '';
  const formattedEndTime = dateTo ? formatDate(dateTo, 'time') : '';

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle visually-hidden"
                   id="event-type-toggle-1"
                   type="checkbox"
                   ${isDisabled ? 'disabled' : ''}>

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createEventTypeItems(type)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group event__field-group--destination">
            <label class="event__label event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input event__input--destination"
                   id="event-destination-1"
                   type="text"
                   name="event-destination"
                   value="${destination ? he.encode(destination.name) : ''}"
                   list="destination-list-1"
                   required
                   ${isDisabled ? 'disabled' : ''}>
            <datalist id="destination-list-1">
              ${destinations.map((dest) =>
    `<option value="${he.encode(dest.name)}"></option>`).join('')}
            </datalist>
          </div>

          <div class="event__field-group event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input event__input--time"
                   id="event-start-time-1"
                   type="text"
                   name="event-start-time"
                   value="${formattedStartDate} ${formattedStartTime}"
                   ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input event__input--time"
                   id="event-end-time-1"
                   type="text"
                   name="event-end-time"
                   value="${formattedEndDate} ${formattedEndTime}"
                   ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input event__input--price"
                   id="event-price-1"
                   type="number"
                   name="event-price"
                   value="${basePrice}"
                   min="1"
                   ${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn btn btn--blue"
                  type="submit"
                  ${isDisabled ? 'disabled' : ''}>
            ${isSaving ? 'Saving...' : 'Save'}
          </button>
          <button class="event__reset-btn"
                  type="reset"
                  ${isDisabled ? 'disabled' : ''}>
            Cancel
          </button>
        </header>

        <section class="event__details">
          ${createOfferDetailsTemplate(selectedOffers, offers, isDisabled)}
          ${destination ? `
            <section class="event__section event__section--destination">
              ${createDestinationTemplate(destination)}
            </section>` : ''}
        </section>
      </form>
    </li>
  `;
}

// Класс представления формы добавления новой точки
export default class AddNewPointView extends AbstractStatefulView {
  #destination = null;
  #offers = null;
  #onFormSubmit = null;
  #onCancelClick = null;
  #pointsModel = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ point, destination, offers, onFormSubmit, onCancelClick, pointsModel }) {
    super();
    this._setState(AddNewPointView.parsePointToState(point));
    this.#destination = destination;
    this.#offers = offers;
    this.#onFormSubmit = onFormSubmit;
    this.#onCancelClick = onCancelClick;
    this.#pointsModel = pointsModel;

    this._restoreHandlers();
  }

  // Геттер для получения шаблона
  get template() {
    return createAddNewPointTemplate(this._state, this.#destination, this.#offers, this.#pointsModel.destinations);
  }

  // Удаление элемента и календарей
  removeElement() {
    super.removeElement();
    this.#datepickerFrom?.destroy();
    this.#datepickerTo?.destroy();
  }

  // Восстановление обработчиков событий
  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeToggleHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#cancelClickHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);

    const offerCheckboxes = this.element.querySelectorAll('.event__offer-checkbox');
    offerCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', this.#offerChangeHandler);
    });

    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  // Обработчик изменения опций
  #offerChangeHandler = (evt) => {
    const offerId = evt.target.name.replace('event-offer-', '');
    const newSelectedOffers = [...this._state.selectedOffers];

    if (evt.target.checked) {
      newSelectedOffers.push(offerId);
    } else {
      const index = newSelectedOffers.indexOf(offerId);
      if (index !== -1) {
        newSelectedOffers.splice(index, 1);
      }
    }

    this._setState({
      selectedOffers: newSelectedOffers
    });
  };

  // Обработчик изменения цены
  #priceChangeHandler = (evt) => {
    this._setState({
      basePrice: parseInt(evt.target.value, 10) || 0
    });
  };

  // Обработчик клика по кнопке отмены
  #cancelClickHandler = (evt) => {
    evt.preventDefault();
    this.#onCancelClick();
  };

  // Обработчик отправки формы
  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    const isValid = this.#validateForm();
    if (!isValid) {
      this.shake();
      return;
    }

    this.#onFormSubmit(AddNewPointView.parseStateToPoint(this._state));
  };

  #validateForm() {
    const destinationInput = this.element.querySelector('.event__input--destination');
    const priceInput = this.element.querySelector('.event__input--price');
    const startTimeInput = this.element.querySelector('#event-start-time-1');
    const endTimeInput = this.element.querySelector('#event-end-time-1');

    const isValidDestination = this.#pointsModel.destinations.some(
      (dest) => dest.name === destinationInput.value
    );

    const hasValidDates = startTimeInput.value && endTimeInput.value;
    const isValidPrice = priceInput.value && parseInt(priceInput.value, 10) > 0;

    return isValidDestination && hasValidDates && isValidPrice;
  }

  // Обработчик изменения типа события
  #typeToggleHandler = (evt) => {
    if (!evt.target.closest('input')) {
      return;
    }

    const selectedType = evt.target.value;
    const newOffers = this.#pointsModel.getOffersByType(selectedType);

    this.#offers = newOffers;
    this._setState({
      type: selectedType,
      selectedOffers: []
    });
  };

  // Обработчик изменения направления
  #destinationChangeHandler = (evt) => {
    const selectedDestinationName = evt.target.value;
    const newDestination = this.#pointsModel.destinations.find(
      (dest) => dest.name === selectedDestinationName
    );

    if (newDestination) {
      this.#destination = newDestination;
      this._setState({
        destination: newDestination.id
      });
    }
  };

  // Обработчик изменения даты начала
  #dateFromChangeHandler = ([userDate]) => {
    if (!userDate) {
      return;
    }

    this._setState({
      dateFrom: userDate,
      dateTo: userDate > this._state.dateTo ? userDate : this._state.dateTo
    });

    this.#datepickerTo?.set('minDate', userDate);
  };

  // Обработчик изменения даты окончания
  #dateToChangeHandler = ([userDate]) => {
    if (!userDate) {
      return;
    }

    this._setState({
      dateTo: userDate,
      dateFrom: userDate < this._state.dateFrom ? userDate : this._state.dateFrom
    });

    this.#datepickerFrom?.set('maxDate', userDate);
  };

  // Общий метод настройки календаря
  #setDatepickerCommon(elementId, defaultDate, onChange, minDate = null, maxDate = null) {
    const input = this.element.querySelector(`#${elementId}`);
    if (!input) {
      return;
    }

    const isStartDate = elementId === 'event-start-time-1';
    const picker = isStartDate ? this.#datepickerFrom : this.#datepickerTo;

    picker?.destroy();

    const options = {
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      defaultDate: parseDateForFlatpickr(defaultDate),
      onChange,
      'time_24hr': true,
      allowInput: true,
      parseDate: parseDateForFlatpickr,
      formatDate: formatDateForFlatpickr,
      minDate: minDate ? parseDateForFlatpickr(minDate) : null,
      maxDate: maxDate ? parseDateForFlatpickr(maxDate) : null
    };

    if (isStartDate) {
      this.#datepickerFrom = flatpickr(input, options);
    } else {
      this.#datepickerTo = flatpickr(input, options);
    }
  }

  // Настройка календаря для даты начала
  #setDatepickerFrom() {
    this.#setDatepickerCommon(
      'event-start-time-1',
      this._state.dateFrom,
      this.#dateFromChangeHandler,
      null,
      this._state.dateTo
    );
  }

  // Настройка календаря для даты окончания
  #setDatepickerTo() {
    this.#setDatepickerCommon(
      'event-end-time-1',
      this._state.dateTo,
      this.#dateToChangeHandler,
      this._state.dateFrom,
      null
    );
  }

  // Преобразование точки в состояние
  static parsePointToState(point) {
    return {
      ...point,
      dateFrom: null,
      dateTo: null,
      selectedOffers: point.offers || [],
      isDisabled: false,
      isSaving: false
    };
  }

  // Преобразование состояния в точку
  static parseStateToPoint(state) {
    const point = {
      ...state,
      offers: state.selectedOffers
    };
    delete point.selectedOffers;
    delete point.isDisabled;
    delete point.isSaving;
    return point;
  }
}
