import { render } from '../framework/render.js';
import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import EventListView from '../view/event-list-view.js';

export default class BoardPresenter {
  eventListComponent = new EventListView();

  constructor({ boardContainer, pointsModel }) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    render(new EditPointView({
      point: this.points[0],
      offers: this.pointsModel.getOffersByType(this.points[0].type),
      destination: this.pointsModel.getDestinationById(this.points[0].destination)
    }), this.eventListComponent.element);
    render(new AddNewPointView({
      point: this.points[1],
      offers: this.pointsModel.getOffersByType(this.points[1].type),
      destination: this.pointsModel.getDestinationById(this.points[1].destination)
    }), this.eventListComponent.element);
    render(this.eventListComponent, this.boardContainer);

    for (let i = 0; i < this.points.length; i++) {
      const point = this.points[i];
      const offers = this.pointsModel.getOffersByType(this.points[i].type);
      const destination = this.pointsModel.getDestinationById(this.points[i].destination);

      render(new PointView({ point, offers, destination }), this.eventListComponent.element);
    }
  }
}

