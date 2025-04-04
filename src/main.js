import { render } from './framework/render.js';
import FiltersView from './view/filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import SortView from './view/sort-view.js';
import { generateFilter } from './mock/filter.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({
  boardContainer: eventsContainer,
  pointsModel,
});

const filters = generateFilter(pointsModel.points);

render(new FiltersView({ filters }), filtersContainer);
render(new SortView(), eventsContainer);

boardPresenter.init();
