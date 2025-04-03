import { render, replace } from '../framework/render.js';
import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import EventListView from '../view/event-list-view.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;

  #points = [];

  eventListComponent = new EventListView();

  constructor({ boardContainer, pointsModel }) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];

    this.#renderBoard();
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const offers = this.#pointsModel.getOffersByType(point.type);
    const destination = this.#pointsModel.getDestinationById(point.destination);
    const pointComponent = new PointView({
      point, offers, destination,
      onButtonClick: () => {
        replacePointToEditForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editPointComponent = new EditPointView({
      point: point,
      offers: this.#pointsModel.getOffersByType(point.type),
      destination: this.#pointsModel.getDestinationById(point.destination),
      onFormSubmit: () => {
        replaceEditFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onButtonClick: () => {
        replaceEditFormToPoint();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToEditForm() {
      replace(editPointComponent, pointComponent);
    }

    function replaceEditFormToPoint() {
      replace(pointComponent, editPointComponent);
    }
    render(pointComponent, this.eventListComponent.element);
  }

  #renderBoard() {
    render(new AddNewPointView({
      point: this.#points[1],
      offers: this.#pointsModel.getOffersByType(this.#points[1].type),
      destination: this.#pointsModel.getDestinationById(this.#points[1].destination)
    }), this.eventListComponent.element);

    render(this.eventListComponent, this.#boardContainer);

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i]);
    }
  }
}
