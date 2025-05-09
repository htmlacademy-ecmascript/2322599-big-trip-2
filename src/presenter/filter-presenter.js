import { render, replace, remove } from '../framework/render.js';
import FiltersView from '../view/filters-view.js';
import { FilterType, UpdateType } from '../const.js';
import { filter } from '../utils/filter.js';

// Презентер фильтров
export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;

  #filtersComponent = null;

  constructor({ filterContainer, filterModel, pointsModel }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    // Подписка на изменения моделей
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  // Получение списка фильтров с количеством точек
  get filters() {
    const points = this.#pointsModel.points;
    return Object.values(FilterType).map((type) => ({
      type,
      count: filter[type](points).length
    }));
  }

  // Инициализация презентера
  init() {
    const filters = this.filters;
    const prevFiltersComponent = this.#filtersComponent;

    // Создание нового компонента фильтров
    this.#filtersComponent = new FiltersView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    // Первый рендер или обновление существующего
    if (prevFiltersComponent === null) {
      render(this.#filtersComponent, this.#filterContainer);
      return;
    }

    replace(this.#filtersComponent, prevFiltersComponent);
    remove(prevFiltersComponent);
  }

  // Обработчик событий модели (перерисовка при изменениях)
  #handleModelEvent = () => {
    this.init();
  };

  // Обработчик изменения типа фильтра
  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
