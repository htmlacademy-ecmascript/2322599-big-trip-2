import { render, replace, remove } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import { UserAction, UpdateType } from '../const.js';
import { isDatesEqual } from '../utils/utils.js';

// Режимы отображения точки маршрута
const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

// Презентер точки маршрута
export default class PointPresenter {
  #eventListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #editPointComponent = null;

  #pointsModel = null;
  #point = null;
  #mode = Mode.DEFAULT;

  constructor({ eventListContainer, pointsModel, onDataChange, onModeChange }) {
    this.#eventListContainer = eventListContainer;
    this.#pointsModel = pointsModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  // Инициализация презентера точки
  init(point, offers, destination) {
    this.#point = point;
    offers = this.#pointsModel.getOffersByType(point.type);
    destination = this.#pointsModel.getDestinationById(point.destination);

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    // Создание компонента точки маршрута
    this.#pointComponent = new PointView({
      point,
      offers,
      destination,
      onButtonClick: () => this.#replacePointToEditForm(),
      onFavoriteClick: this.#handleFavoriteClick,
    });

    // Создание компонента формы редактирования
    this.#editPointComponent = new EditPointView({
      point,
      offers: this.#pointsModel.getOffersByType(point.type),
      destination: this.#pointsModel.getDestinationById(point.destination),
      pointsModel: this.#pointsModel,
      onButtonClick: () => this.#replaceEditFormToPoint(),
      onFormSubmit: this.#formSubmitHandler,
      onDeleteClick: this.#handleDeleteClick
    });

    // Первый рендер или обновление существующих компонентов
    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#eventListContainer);
      return;
    }

    // Обновление компонента в зависимости от текущего режима
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevEditPointComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  // Уничтожение презентера
  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  // Сброс представления к режиму по умолчанию
  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  }

  // Установка состояния "Сохранение"
  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  // Установка состояния "Удаление"
  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  // Переключение в режим редактирования
  #replacePointToEditForm() {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  // Переключение в режим просмотра
  #replaceEditFormToPoint() {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  // Обработчик нажатия Esc
  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  };

  // Обработчик клика по избранному
  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      { ...this.#point, isFavorite: !this.#point.isFavorite },
    );
  };

  // Обработчик отправки формы
  #formSubmitHandler = (update) => {
    const destinations = this.#pointsModel.destinations;
    const destination = destinations.find((dest) => dest.id === update.destination);

    // Валидация данных
    if (!destination || !update.dateFrom || !update.dateTo || update.basePrice <= 0) {
      return;
    }

    // Определение типа обновления (минор или патч)
    const isMinorUpdate =
      !isDatesEqual(this.#point.dateFrom, update.dateFrom) ||
      !isDatesEqual(this.#point.dateTo, update.dateTo) ||
      this.#point.type !== update.type ||
      this.#point.destination !== update.destination;

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
  };

  // Обработчик удаления точки
  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };

  // Установка состояния "Ошибка"
  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#editPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editPointComponent.shake(resetFormState);
  }
}