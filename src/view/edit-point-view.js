import he from 'he';
import { EVENT_TYPES } from '../const.js';
import { formatDate, parseDateForFlatpickr, formatDateForFlatpickr } from '../utils/utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

// Создание шаблона опций (обновлено)
function createOffersTemplate(offersList, offers, isDisabled) {
  if (!offersList || !offersList.offers) {
    return '';
  }

  return offersList.offers.map((offer) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox visually-hidden"
             id="event-offer-${offer.id}-1"
             type="checkbox"
             name="event-offer-${offer.id}"
             ${offers.includes(offer.id) ? 'checked' : ''}
             ${isDisabled ? 'disabled' : ''}>
      <label class="event__offer-label" for="event-offer-${offer.id}-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
  ).join('');
}

// Создание шаблона блока с опциями (обновлено)
function createOfferDetailsTemplate(offersList, offers, isDisabled) {
  const offersMarkup = createOffersTemplate(offersList, offers, isDisabled);

  if (!offersMarkup) {
    return '';
  }

  return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${offersMarkup}
    </div>
  </section>`;
}

// Создание шаблона блока с описанием направления
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

// Создание шаблона типов событий
function createEventTypeItems(currentType) {
  return EVENT_TYPES.map(({ type, label }) =>
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="${type}" ${type === currentType ? 'checked' : ''}>
      <label class="event__type-label event__type-label--${type}" for="event-type-${type}-1">${label}</label>
    </div>`
  ).join('');
}

// Создание шаблона формы редактирования точки маршрута
function createEditPointTemplate(point, destination, offersList, destinations) {
  const { dateFrom, dateTo, offers, type, basePrice, isDisabled, isSaving, isDeleting } = point;

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
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice} ${isDisabled ? 'disabled' : ''}>
                  </div>
                <button class="event__save-btn btn btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
                <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
                <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
                  <span class="visually-hidden">Open event</span>
                </button>
                </header>
                <section class="event__details">
                  ${offersList ? createOfferDetailsTemplate(offersList, offers, isDisabled) : ''}
                  ${destination ? `
                    <section class="event__section event__section--destination">
                      ${createDestinationTemplate(destination)}
                    </section>` : ''}
                </section>
              </form>
          </li>`;
}

// Класс представления формы редактирования точки
export default class EditPointView extends AbstractStatefulView {
  #destination = null;
  #offersList = null;
  #onButtonClick = null;
  #onFormSubmit = null;
  #pointsModel = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleDeleteClick = null;

  constructor({ point, destination, offers, onButtonClick, onFormSubmit, onDeleteClick, pointsModel }) {
    super();
    this._setState(EditPointView.parsePointToState(point));
    this.#destination = destination;
    this.#offersList = offers;
    this.#onButtonClick = onButtonClick;
    this.#onFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
    this.#pointsModel = pointsModel;

    this._restoreHandlers();
  }

  // Геттер для получения шаблона
  get template() {
    return createEditPointTemplate(this._state, this.#destination, this.#offersList, this.#pointsModel.destinations);
  }

  // Удаление элемента и календарей
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

  // Сброс формы к исходным значениям
  reset(point) {
    this.updateElement(
      EditPointView.parsePointToState(point),
    );
  }

  // Восстановление обработчиков событий
  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#buttonClickHandler);
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeToggleHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);

    // Обновленный обработчик для офферсов
    const offersContainer = this.element.querySelector('.event__available-offers');
    if (offersContainer) {
      offersContainer.addEventListener('change', this.#offersChangeHandler);
    }

    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  // Обработчик изменения цены
  #priceChangeHandler = (evt) => {
    const price = parseInt(evt.target.value, 10);
    this._setState({
      ...this._state,
      basePrice: isNaN(price) ? 0 : price
    });
  };

  // Обработчик клика по кнопке удаления
  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state));
  };

  // Обработчик клика по кнопке свернуть
  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    this.#onButtonClick(EditPointView.parseStateToPoint(this._state));
  };

  // Обработчик отправки формы
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

    // Валидация данных
    if (!isValidDestination || !hasValidDates || !isValidPrice) {
      this._setState({
        ...this._state,
        dateFrom: startTimeInput.value ? this._state.dateFrom : null,
        dateTo: endTimeInput.value ? this._state.dateTo : null,
        basePrice: priceInput.value ? parseInt(priceInput.value, 10) : 0
      });
      this.shake();
      return;
    }

    this.#onFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  // Обработчик изменения типа события
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

  // Обработчик изменения направления
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

  // Обработчик изменения опций (обновлено)
  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    if (!evt.target.classList.contains('event__offer-checkbox')) {
      return;
    }

    const offerId = evt.target.name.replace('event-offer-', '');
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

  // Обработчик изменения даты начала
  #dateFromChangeHandler = ([userDate]) => {
    if (!userDate) {
      this._setState({
        ...this._state,
        dateFrom: null
      });
      return;
    }

    this._setState({
      ...this._state,
      dateFrom: userDate,
      dateTo: userDate > this._state.dateTo ? userDate : this._state.dateTo
    });

    if (this.#datepickerTo) {
      this.#datepickerTo.set('minDate', userDate);
    }
  };

  // Обработчик изменения даты окончания
  #dateToChangeHandler = ([userDate]) => {
    if (!userDate) {
      this._setState({
        ...this._state,
        dateTo: null
      });
      return;
    }

    this._setState({
      ...this._state,
      dateTo: userDate,
      dateFrom: userDate < this._state.dateFrom ? userDate : this._state.dateFrom
    });

    if (this.#datepickerFrom) {
      this.#datepickerFrom.set('maxDate', userDate);
    }
  };

  // Общий метод настройки календаря
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
      defaultDate: parseDateForFlatpickr(defaultDate),
      onChange,
      'time_24hr': true,
      allowInput: true,
      parseDate: parseDateForFlatpickr,
      formatDate: formatDateForFlatpickr,
      minDate: minDate ? parseDateForFlatpickr(minDate) : null,
      maxDate: maxDate ? parseDateForFlatpickr(maxDate) : null
    };

    if (elementId === 'event-start-time-1') {
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
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  // Преобразование состояния в точку
  static parseStateToPoint(state) {
    const point = { ...state };
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    return point;
  }
}
