import * as state from 'utils/state';
import { PageName } from 'types/index';
import { getCars } from 'API/api';
import getCarsList from 'components/cars-list/cars-list';
import getCreateCarForm from 'components/create-car-form/create-car-form';
import getUpdateCarForm from 'components/update-car-form/update-car-form';
import getRaceControls from 'components/race-controls/race-controls';
import getPagination from 'components/pagination/pagination';
import getWinnerMessage from 'components/winner-message/winner-message';

async function updateGarageView(): Promise<void> {
  const curState = state.getState();
  const cars = await getCars();

  // Update Total Count
  const totalCountSpan = document.querySelector('.garage-total-count') as HTMLElement;
  totalCountSpan.innerText = `(${cars.totalCount})`;

  // Update Current Page Number
  const curPageNumber = document.querySelector('.garage-current-page-number') as HTMLElement;
  curPageNumber.innerText = `Page: #${curState.garagePagination}`;

  // Update Car List
  const carsListElem = document.querySelector('.cars-list') as HTMLElement;
  carsListElem.replaceWith(getCarsList(cars.carsList));

  // Update Pagination
  const paginationElem = document.querySelector('.garage-pagination') as HTMLElement;
  paginationElem.replaceWith(getPagination(cars.totalCount, PageName.garage));
}

function fillUpdateCarForm(e: Event): void {
  const car = (e as CustomEvent).detail;
  const updateCarForm = getUpdateCarForm(car);
  const updateCarFormElem = document.querySelector('.update-car-form') as HTMLElement;

  updateCarFormElem.replaceWith(updateCarForm);
}

function showWinnersInfo(e: Event): void {
  const winner = (e as CustomEvent).detail;
  const garageView = document.querySelector('.page-view-garage') as HTMLElement;
  garageView.prepend(getWinnerMessage(winner.id, winner.name, winner.color, winner.time));
}

function handleEvents(): void {
  // Fill Update Car Form
  document.addEventListener('fillUpdateCarForm', fillUpdateCarForm);

  // Update Cars List
  document.addEventListener('updateCarsList', updateGarageView);

  // Update Pagination
  document.addEventListener('garageUpdatePagination', updateGarageView);

  // New winner
  document.addEventListener('newWinner', showWinnersInfo);
}

export default async function getGarageView(): Promise<HTMLElement> {
  const curState = state.getState();
  const cars = await getCars();

  const elem = document.createElement('div');
  elem.className = 'page-view page-view-garage';
  elem.hidden = true;

  elem.innerHTML = `
    <h2>Garage <span class="garage-total-count">(${cars.totalCount})</span></h2>
    <div class="current-page-number garage-current-page-number">Page: #${curState.garagePagination}</div>
  `;

  elem.append(getCreateCarForm());
  elem.append(getUpdateCarForm());
  elem.append(getRaceControls());
  elem.append(getCarsList(cars.carsList));
  elem.append(getPagination(cars.totalCount, PageName.garage));

  handleEvents();

  return elem;
}
