import { render, replace } from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';

export default class PointPresenter {
  #eventListContainer = null;

  #pointComponent = null;
  #editPointComponent = null;

  #pointsModel = null;

  constructor({ eventListContainer, pointsModel }) {
    this.#eventListContainer = eventListContainer;
    this.#pointsModel = pointsModel;
  }

  init(point) {
    const offers = this.#pointsModel.getOffersByType(point.type);
    const destination = this.#pointsModel.getDestinationById(point.destination);

    this.#pointComponent = new PointView({
      point,
      offers,
      destination,
      onButtonClick: this.#buttonClickHandler,
    });

    this.#editPointComponent = new EditPointView({
      point,
      offers,
      destination,
      onButtonClick: this.#formSubmitHandler,
      onFormSubmit: this.#formSubmitHandler,
    });

    render(this.#pointComponent, this.#eventListContainer);
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

  #formSubmitHandler = () => {
    this.#replaceEditFormToPoint();
  };
}
