import { render } from './framework/render.js';
import FiltersView from './view/filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

const filters = [
  { type: 'everything' }
];

const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter({
  boardContainer: eventsContainer,
  pointsModel,
});

render(new FiltersView({
  filters,
  currentFilterType: 'everything',
  onFilterTypeChange: () => { }
}), filtersContainer);

boardPresenter.init();
