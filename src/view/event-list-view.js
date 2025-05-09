import AbstractView from '../framework/view/abstract-view.js';

// Функция создания шаблона списка событий
function createEventListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

// Класс представления списка событий
export default class EventListView extends AbstractView {
  // Геттер для получения шаблона
  get template() {
    return createEventListTemplate();
  }
}