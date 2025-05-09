import AbstractView from '../framework/view/abstract-view.js';
import { formatDate } from '../utils/utils.js';

// Функция создания шаблона информации о путешествии
function createTripInfoTemplate({ destinations, dates, totalPrice }) {
  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getRouteTitle(destinations)}</h1>
        <p class="trip-info__dates">${getDatesText(dates)}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>
  `;
}

// Функция формирования заголовка маршрута
function getRouteTitle(destinations) {
  if (!destinations || destinations.length === 0) {
    return '';
  }

  if (destinations.length <= 3) {
    return destinations.join(' &mdash; ');
  }

  return `${destinations[0]} &mdash; ... &mdash; ${destinations[destinations.length - 1]}`;
}

// Функция формирования текста дат
function getDatesText(dates) {
  if (!dates || !dates.start || !dates.end) {
    return '';
  }

  const startDate = formatDate(dates.start, 'alt').split(' ');
  const endDate = formatDate(dates.end, 'alt').split(' ');

  const formattedStart = `${startDate[1]} ${startDate[0]}`.toUpperCase();
  const formattedEnd = `${endDate[1]} ${endDate[0]}`.toUpperCase();

  return `${formattedStart}&nbsp;&mdash;&nbsp;${formattedEnd}`;
}

// Класс представления информации о путешествии
export default class TripInfoView extends AbstractView {
  #destinations = null;
  #dates = null;
  #totalPrice = null;

  constructor({ destinations, dates, totalPrice }) {
    super();
    this.#destinations = destinations;
    this.#dates = dates;
    this.#totalPrice = totalPrice;
  }

  // Геттер для получения шаблона
  get template() {
    return createTripInfoTemplate({
      destinations: this.#destinations,
      dates: this.#dates,
      totalPrice: this.#totalPrice
    });
  }
}
