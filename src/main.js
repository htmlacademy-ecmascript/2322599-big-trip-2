import FilterPresenter from './presenter/filter-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import AddNewPointButtonView from './view/add-new-point-button-view.js';
import { render } from './framework/render.js';
import PointsApiService from './points-api-service.js';
import UiBlocker from './framework/ui-blocker/ui-blocker.js';

const AUTHORIZATION = 'Basic katrinn01234sa2j';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

// Инициализация приложения
const initApp = async () => {
  const filtersContainer = document.querySelector('.trip-controls__filters');
  const eventsContainer = document.querySelector('.trip-events');
  const tripMainContainer = document.querySelector('.trip-main');

  // Инициализация сервисов и моделей
  const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);
  const pointsModel = new PointsModel({ pointsApiService });
  const filterModel = new FilterModel();

  // Инициализация блокировщика UI
  const uiBlocker = new UiBlocker({
    lowerLimit: 350,
    upperLimit: 1000
  });

  // Инициализация презентеров
  const boardPresenter = new BoardPresenter({
    boardContainer: eventsContainer,
    pointsModel,
    filterModel,
    uiBlocker
  });

  const filterPresenter = new FilterPresenter({
    filterContainer: filtersContainer,
    filterModel,
    pointsModel
  });

  const tripInfoPresenter = new TripInfoPresenter({
    tripMainContainer,
    pointsModel
  });

  // Кнопка добавления новой точки
  const addNewPointButtonComponent = new AddNewPointButtonView({
    onClick: () => boardPresenter.createPoint()
  });

  boardPresenter.setAddNewPointButton(addNewPointButtonComponent);

  // Блокировка UI и инициализация
  uiBlocker.block();
  filterPresenter.init();
  boardPresenter.init();
  tripInfoPresenter.init();

  try {
    await pointsModel.init();
    render(addNewPointButtonComponent, tripMainContainer);
  } catch {
    uiBlocker.unblock();
    return;
  }
  uiBlocker.unblock();
};

initApp();
