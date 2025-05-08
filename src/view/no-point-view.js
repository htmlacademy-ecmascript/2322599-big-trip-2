import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../const.js';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

function createNoPointTemplate(filterType, message) {
  const noPointsTextValue = message || NoPointsTextType[filterType] || NoPointsTextType[FilterType.EVERYTHING];
  return `<p class="trip-events__msg">
  ${noPointsTextValue}
  </p>`;
}

export default class NoPointView extends AbstractView {
  #filterType = null;
  #message = null;

  constructor({ filterType = null, message = null }) {
    super();
    this.#filterType = filterType;
    this.#message = message;
  }

  get template() {
    return createNoPointTemplate(this.#filterType, this.#message);
  }
}
