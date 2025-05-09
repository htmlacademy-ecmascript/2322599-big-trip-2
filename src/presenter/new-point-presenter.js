import { remove, render, RenderPosition } from '../framework/render.js';
import AddNewPointView from '../view/add-new-point-view.js';
import { UserAction, UpdateType } from '../const.js';

// Презентер формы добавления новой точки
export default class NewPointPresenter {
  #eventListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #pointsModel = null;
  #addNewPointComponent = null;

  constructor({ eventListContainer, pointsModel, onDataChange, onDestroy }) {
    this.#eventListContainer = eventListContainer;
    this.#pointsModel = pointsModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  // Инициализация формы
  init() {
    if (this.#addNewPointComponent !== null) {
      return;
    }

    // Шаблон новой точки
    const blankPoint = {
      basePrice: 0,
      dateFrom: new Date(),
      dateTo: new Date(),
      destination: null,
      offers: [],
      type: 'flight',
      isFavorite: false
    };

    // Создание компонента формы
    this.#addNewPointComponent = new AddNewPointView({
      point: blankPoint,
      destination: null,
      offers: this.#pointsModel.getOffersByType('flight'),
      onFormSubmit: this.#handleFormSubmit,
      onCancelClick: this.#handleCancelClick,
      pointsModel: this.#pointsModel
    });

    // Рендер и подписка на события
    render(this.#addNewPointComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  // Уничтожение формы
  destroy() {
    if (this.#addNewPointComponent === null) {
      return;
    }

    this.#handleDestroy();
    remove(this.#addNewPointComponent);
    this.#addNewPointComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  // Установка состояния "Сохранение"
  setSaving() {
    this.#addNewPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  // Обработчик отправки формы
  #handleFormSubmit = (point) => {
    const destination = this.#pointsModel.getDestinationById(point.destination);
    if (!destination || !point.dateFrom || !point.dateTo || point.basePrice <= 0) {
      return;
    }

    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
  };

  // Обработчик отмены
  #handleCancelClick = () => {
    this.destroy();
  };

  // Обработчик нажатия Esc
  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  // Установка состояния "Ошибка"
  setAborting() {
    const resetFormState = () => {
      this.#addNewPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#addNewPointComponent.shake(resetFormState);
  }
}
