import { EVENT_TYPES } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createOffersTemplate(offersList, offers) {
  if (!offersList.offers) {
    return '';
  }

  const availableOffers = [];

  offersList.offers.forEach((offer) => {
    if (offers.includes(offer.id)) {
      availableOffers.push(offer);
    }
  });

  return availableOffers.map(({ id, title, price }) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}">
      <label class="event__offer-label" for="event-offer-${id}-1">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  ).join('');
}

function createOfferDetailsTemplate(offersList, offers) {
  return `<div class="event__available-offers">
  ${createOffersTemplate(offersList, offers)}
  </div>`;
}

function createDestinationTemplate(destination) {
  if (!destination) {
    return '';
  }

  const description = `<p class="event__destination-description">${destination.description}</p>`;

  let picturesTemplate = '';
  if (destination.pictures && destination.pictures.length > 0) {
    const pictures = destination.pictures.map((picture) =>
      `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`
    );
    picturesTemplate = `<div class="event__photos-container">
                          <div class="event__photos-tape">
                            ${pictures.join('')}
                          </div>
                        </div>`;
  }

  return description + (picturesTemplate ? picturesTemplate : '');
}

function createEventTypeItems() {
  return EVENT_TYPES.map(({ type, label, checked }) =>
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="${type}" ${checked ? 'checked' : ''}>
      <label class="event__type-label event__type-label--${type}" for="event-type-${type}-1">${label}</label>
    </div>`
  ).join('');
}

const createAddNewPointTemplate = (point, destination, offersList) => {
  const { offers, type } = point;
  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${createEventTypeItems()}
                      </fieldset>
                    </div>
                  </div>
                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-${destination.id}">
                    <datalist id="destination-list-${destination.id}">
                      <option value="${destination.name}"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="21/03/25 00:00">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="21/03/25 01:00">
                  </div>
                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>

                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    ${createOfferDetailsTemplate(offersList, offers)}
             </section>
            </section>

            <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          ${createDestinationTemplate(destination)}
          </section>
      </section>
      </form>
  </li>`;
};

export default class AddNewPointView extends AbstractView {
  #point = null;
  #destination = null;
  #offersList = null;
  constructor({ point, destination, offers }) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offersList = offers;
  }

  get template() {
    return createAddNewPointTemplate(this.#point, this.#destination, this.#offersList);
  }
}
