import AbstractView from '../framework/view/abstract-view.js';

// Функция создания шаблона для состояния загрузки
function createLoadingTemplate() {
  return '<p class="trip-events__msg">Loading...</p>';
}

// Класс представления состояния загрузки
export default class LoadingView extends AbstractView {
  get template() {
    return createLoadingTemplate();
  }
}
