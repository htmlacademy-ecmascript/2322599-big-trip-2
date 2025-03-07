import AddNewPointView from '../view/add-new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import SortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';
import EventListView from '../view/event-list-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  boardComponent = new SortView();
  eventListComponent = new EventListView();

  constructor({ boardContainer }) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer);
    render(new EditPointView(), this.boardComponent.getElement());
    render(new AddNewPointView(), this.boardComponent.getElement());
    render(this.eventListComponent, this.boardComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.eventListComponent.getElement());
    }
  }
}
