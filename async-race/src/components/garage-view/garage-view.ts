import * as state from 'utils/state';
import { PageName } from 'types/index';
import { getCars } from 'API/api';
import getCarsList from 'components/cars-list/cars-list';
import getCreateCarForm from 'components/create-car-form/create-car-form';
import getPagination from 'components/pagination/pagination';

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

function handleEvents(): void {
  // Update Cars List
  document.addEventListener('updateCarsList', updateGarageView);

  // Update Pagination
  document.addEventListener('garageUpdatePagination', updateGarageView);
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
  elem.append(getCarsList(cars.carsList));
  elem.append(getPagination(cars.totalCount, PageName.garage));

  handleEvents();

  return elem;
}
