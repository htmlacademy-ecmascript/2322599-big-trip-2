import ApiService from './framework/api-service.js';

// Перечисление методов HTTP
const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

// Класс для работы с API точек маршрута
export default class PointsApiService extends ApiService {
  // Получение точек маршрута
  get points() {
    return this._load({ url: 'points' })
      .then(ApiService.parseResponse)
      .catch(() => {
        throw new Error('Failed to load latest route information');
      });
  }

  // Получение списка направлений
  get destinations() {
    return this._load({ url: 'destinations' })
      .then(ApiService.parseResponse)
      .catch(() => {
        throw new Error('Failed to load latest route information');
      });
  }

  // Получение списка дополнительных опций
  get offers() {
    return this._load({ url: 'offers' })
      .then(ApiService.parseResponse)
      .catch(() => {
        throw new Error('Failed to load latest route information');
      });
  }

  // Обновление точки маршрута
  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  // Добавление новой точки маршрута
  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  // Удаление точки маршрута
  async deletePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  // Адаптация данных точки для сервера
  #adaptToServer(point) {
    const adaptedPoint = {
      ...point,
      'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null,
      'date_to': point.dateTo instanceof Date ? point.dateTo.toISOString() : null,
      'base_price': point.basePrice,
      'is_favorite': point.isFavorite,
    };

    // Удаление клиентских названий полей
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.basePrice;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
