import Observable from '../framework/observable.js';
import { FilterType } from '../const.js';

// Модель фильтрации точек маршрута
export default class FilterModel extends Observable {
  #filter = FilterType.EVERYTHING;

  // Геттер для получения текущего фильтра
  get filter() {
    return this.#filter;
  }

  // Установка нового фильтра с уведомлением подписчиков
  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
