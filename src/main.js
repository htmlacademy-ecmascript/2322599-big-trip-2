import FilterPresenter from './presenter/filter-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import AddNewPointButtonView from './view/add-new-point-button-view.js';
import { render } from './framework/render.js';

const initApp = () => {
  const filtersContainer = document.querySelector('.trip-controls__filters');
  const eventsContainer = document.querySelector('.trip-events');
  const tripMainContainer = document.querySelector('.trip-main');
  const pointsModel = new PointsModel();
  const filterModel = new FilterModel();

  const boardPresenter = new BoardPresenter({
    boardContainer: eventsContainer,
    pointsModel,
    filterModel
  });

  const filterPresenter = new FilterPresenter({
    filterContainer: filtersContainer,
    filterModel,
    pointsModel
  });

  const addNewPointButtonComponent = new AddNewPointButtonView({
    onClick: () => boardPresenter.createPoint()
  });

  boardPresenter.setAddNewPointButton(addNewPointButtonComponent);

  render(addNewPointButtonComponent, tripMainContainer);
  filterPresenter.init();
  boardPresenter.init();
};

initApp();
