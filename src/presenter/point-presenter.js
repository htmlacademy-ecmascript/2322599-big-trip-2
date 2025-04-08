import { render, replace, remove } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';

export default class PointPresenter {
  #eventListContainer = null;
  #handleDataChange = null;

  #pointComponent = null;
  #editPointComponent = null;

  #pointsModel = null;
  #point = null;

  constructor({ eventListContainer, pointsModel, onDataChange }) {
    this.#eventListContainer = eventListContainer;
    this.#pointsModel = pointsModel;
    this.#handleDataChange = onDataChange;
  }

  init(point, offers, destination) {
    this.#point = point;
    offers = this.#pointsModel.getOffersByType(point.type);
    destination = this.#pointsModel.getDestinationById(point.destination);

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point,
      offers,
      destination,
      onButtonClick: this.#buttonClickHandler,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#editPointComponent = new EditPointView({
      point,
      offers,
      destination,
      onButtonClick: this.#formSubmitHandler,
      onFormSubmit: this.#formSubmitHandler,
    });

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#eventListContainer);
      return;
    }

    if (this.#eventListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#eventListContainer.contains(prevEditPointComponent.element)) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  #replacePointToEditForm() {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceEditFormToPoint() {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToPoint();
    }
  };

  #buttonClickHandler = () => {
    this.#replacePointToEditForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({ ...this.#point, isFavorite: !this.#point.isFavorite });
  };

  #formSubmitHandler = (point) => {
    this.#handleDataChange(point);
    this.#replaceEditFormToPoint();
  };
}
