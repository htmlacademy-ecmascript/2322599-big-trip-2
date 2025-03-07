import FiltersView from './view/filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import { render } from './render.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({ boardContainer: eventsContainer });

render(new FiltersView(), filtersContainer);

boardPresenter.init();
