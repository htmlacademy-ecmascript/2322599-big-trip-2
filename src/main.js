import FilterPresenter from './presenter/filter-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import AddNewPointButtonView from './view/add-new-point-button-view.js';
import { render } from './framework/render.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic katrinn01234sa2j';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const initApp = () => {
  const filtersContainer = document.querySelector('.trip-controls__filters');
  const eventsContainer = document.querySelector('.trip-events');
  const tripMainContainer = document.querySelector('.trip-main');

  const pointsModel = new PointsModel({
    pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
  });

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
