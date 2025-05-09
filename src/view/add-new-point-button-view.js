import AbstractView from '../framework/view/abstract-view.js';

// Функция создания шаблона кнопки добавления новой точки
function createNewPointButtonTemplate() {
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow"
  type="button">New event</button>`;
}

// Класс представления кнопки добавления новой точки
export default class AddNewPointButtonView extends AbstractView {
  #handleClick = null; // Обработчик клика

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    // Добавление обработчика клика на элемент
    this.element.addEventListener('click', this.#clickHandler);
  }

  // Геттер для получения шаблона
  get template() {
    return createNewPointButtonTemplate();
  }

  // Обработчик клика по кнопке
  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
