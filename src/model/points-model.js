import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

// Модель для работы с точками маршрута
export default class PointsModel extends Observable {
  #pointsApiService = null;
  #destinations = [];
  #offers = [];
  #points = [];

  constructor({ pointsApiService }) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  // Геттер для получения данных направлений
  get destinations() {
    return this.#destinations;
  }

  // Получение направления по ID
  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }

  // Геттер для получения данных дополнительных опций
  get offers() {
    return this.#offers;
  }

  // Получение дополнительных опций по типу
  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type);
  }

  // Геттер для получения точек
  get points() {
    return this.#points;
  }

  // Инициализация модели
  async init() {
    try {
      const pointsPromise = this.#pointsApiService.points;
      const destinationsPromise = this.#pointsApiService.destinations;
      const offersPromise = this.#pointsApiService.offers;

      const [points, destinations, offers] = await Promise.all([
        pointsPromise,
        destinationsPromise,
        offersPromise
      ]);

      this.#points = points.map(this.#adaptToClient);
      this.#destinations = destinations;
      this.#offers = offers;
      this._notify(UpdateType.INIT);
    } catch (err) {

      this.#points = [];
      this.#destinations = [];
      this.#offers = [];
      this._notify(UpdateType.ERROR);
    }
  }

  // Обновление точки маршрута
  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  // Добавление новой точки маршрута
  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error('Can\'t add point');
    }
  }

  // Удаление точки маршрута
  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete point');
    }
  }

  // Адаптация данных точки для клиента
  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      basePrice: point['base_price'],
      isFavorite: point['is_favorite'],
    };

    // Удаление серверных названий полей
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['base_price'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
