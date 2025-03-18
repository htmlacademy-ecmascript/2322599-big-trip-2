import { createElement } from '../render.js';
import { formatDate } from '../utils.js';

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;


function createPointTemplate(point, destination, offers) {
  const { dateFrom, dateTo, basePrice, type } = point;

  const formattedStartDate = formatDate(dateFrom, 'alt');
  const formattedStartTime = formatDate(dateFrom, 'time');
  const formattedEndTime = formatDate(dateTo, 'time');
  const duration = Math.ceil((new Date(dateTo) - new Date(dateFrom)) / (MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE));

  const offersList = (offers || []).map((offer) =>
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`
  ).join('');

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${new Date(dateFrom).toISOString()}">${formattedStartDate}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type.charAt(0).toUpperCase() + type.slice(1)} ${destination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                  <time class="event__start-time" datetime="${new Date(dateFrom).toISOString()}">${formattedStartTime}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${new Date(dateTo).toISOString()}">${formattedEndTime}</time>
                  </p>
                  <p class="event__duration">${Math.floor(duration / MINUTES_IN_HOUR)}H ${duration % MINUTES_IN_HOUR}M</p>
                </div>
                <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${offersList}
                </ul>
                <button class="event__favorite-btn" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
}

export default class PointView {
  constructor(point, destination, offers) {
    this.point = point;
    this.destination = destination;
    this.offers = offers;
    this.element = null;
  }

  getTemplate() {
    return createPointTemplate(this.point, this.destination, this.offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
