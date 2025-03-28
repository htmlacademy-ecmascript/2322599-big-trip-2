import FiltersView from './view/filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import { render } from './render.js';
import PointsModel from './model/points-model.js';
import SortView from './view/sort-view.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({
  boardContainer: eventsContainer,
  pointsModel,
});

render(new FiltersView(), filtersContainer);
render(new SortView(), eventsContainer);

boardPresenter.init();
