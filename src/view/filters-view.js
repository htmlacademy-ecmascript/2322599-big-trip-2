import AbstractView from '../framework/view/abstract-view.js';

// Функция создания шаблона для одного элемента фильтра
function createFilterItemTemplate(filter, currentFilterType) {
  const { type, count } = filter;

  return (
    `<div class="trip-filters__filter">
        <input
          id="filter-${type}"
          class="trip-filters__filter-input visually-hidden"
          type="radio"
          name="trip-filter"
          value="${type}"
          ${type === currentFilterType ? 'checked' : ''}
          ${count === 0 ? 'disabled' : ''}
        />
        <label
          class="trip-filters__filter-label ${count === 0 ? 'trip-filters__filter-label--disabled' : ''}"
          for="filter-${type}"
        >
          ${type}
        </label>
      </div>`
  );
}

// Функция создания шаблона для всех фильтров
function createFiltersTemplate(filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

// Класс представления фильтров
export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilterType = null;
  #handleFilterTypeChange = null;

  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  // Геттер для получения шаблона
  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilterType);
  }

  // Обработчик изменения типа фильтра
  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
