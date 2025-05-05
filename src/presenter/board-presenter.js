import { render, RenderPosition, remove } from '../framework/render.js';
import EventListView from '../view/event-list-view.js';
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import LoadingView from '../view/loading-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { sortByDay, sortByTime, sortByPrice } from '../utils/utils.js';
import { filter } from '../utils/filter.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #filterModel = null;
  #sortComponent = null;
  #noPointComponent = null;
  #loadingComponent = new LoadingView();
  #eventListComponent = new EventListView();
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #newPointPresenter = null;
  #addNewPointButtonComponent = null;
  #uiBlocker = null;

  constructor({ boardContainer, pointsModel, filterModel, uiBlocker, addNewPointButtonComponent }) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#uiBlocker = uiBlocker;
    this.#addNewPointButtonComponent = addNewPointButtonComponent;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#newPointPresenter = new NewPointPresenter({
      eventListContainer: this.#eventListComponent.element,
      pointsModel: this.#pointsModel,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleNewPointFormClose
    });
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...filteredPoints].sort(sortByDay);
      case SortType.TIME:
        return [...filteredPoints].sort(sortByTime);
      case SortType.PRICE:
        return [...filteredPoints].sort(sortByPrice);
    }
    return filteredPoints;
  }

  init() {
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleNewPointFormClose = () => {
    if (this.#addNewPointButtonComponent) {
      this.#addNewPointButtonComponent.element.disabled = false;
    }
  };

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();

    if (this.#addNewPointButtonComponent) {
      this.#addNewPointButtonComponent.element.disabled = true;
    }
  }

  setAddNewPointButton(buttonComponent) {
    this.#addNewPointButtonComponent = buttonComponent;
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    try {
      switch (actionType) {
        case UserAction.UPDATE_POINT:
          this.#pointPresenters.get(update.id).setSaving();
          await this.#pointsModel.updatePoint(updateType, update);
          break;
        case UserAction.ADD_POINT:
          this.#newPointPresenter.setSaving();
          await this.#pointsModel.addPoint(updateType, update);
          break;
        case UserAction.DELETE_POINT:
          this.#pointPresenters.get(update.id).setDeleting();
          await this.#pointsModel.deletePoint(updateType, update);
          break;
      }
    } catch {
      this.#pointPresenters.get(update.id)?.setAborting();
      this.#newPointPresenter?.setAborting();
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      eventListContainer: this.#eventListComponent.element,
      pointsModel: this.#pointsModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderNoPoints() {
    this.#noPointComponent = new NoPointView({
      filterType: this.#filterType
    });

    render(this.#noPointComponent, this.#eventListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #clearBoard({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard() {
    render(this.#eventListComponent, this.#boardContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    render(this.#eventListComponent, this.#boardContainer);
    this.#renderPoints();
  }
}
