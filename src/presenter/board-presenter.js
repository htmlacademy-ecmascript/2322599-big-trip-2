import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import SortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';
import EventListView from '../view/event-list-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  boardComponent = new SortView();
  eventListComponent = new EventListView();

  constructor({ boardContainer, pointsModel }) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    render(this.boardComponent, this.boardContainer);
    render(new EditPointView(), this.boardComponent.getElement());
    render(new AddNewPointView(), this.boardComponent.getElement());
    render(this.eventListComponent, this.boardComponent.getElement());

    for (const point of this.points) {
      const offers = this.pointsModel.getOffersByType(point.type);
      const destination = this.pointsModel.getDestinationById(point.id);

      const pointView = new PointView(point, offers, destination);
      render(pointView, this.eventListComponent.getElement());
    }
  }
}
