import * as state from 'utils/state';
import { PageName } from 'types/index';
import { getWinnersCars } from 'API/api';
import getWinnersTable from 'components/winners-table/winners-table';
import getPagination from 'components/pagination/pagination';

async function updateWinnersView(): Promise<void> {
  const curState = state.getState();
  const winnersCars = await getWinnersCars();

  // Update Current Page Number
  const curPageNumber = document.querySelector('.winners-current-page-number') as HTMLElement;
  curPageNumber.innerText = `Page: #${curState.winnersPagination}`;

  // Update Car List
  const carsListElem = document.querySelector('.winners-table') as HTMLElement;
  carsListElem.replaceWith(getWinnersTable(winnersCars.winnersCarsList));

  // Update Pagination
  const paginationElem = document.querySelector('.winners-pagination') as HTMLElement;
  paginationElem.replaceWith(getPagination(winnersCars.totalCount, PageName.winners));
}

function handleEvents(): void {
  // Update Pagination
  document.addEventListener('winnersUpdatePagination', updateWinnersView);
}

export default async function getWinnersView(): Promise<HTMLElement> {
  const curState = state.getState();
  const winnersCars = await getWinnersCars();

  const elem = document.createElement('div');
  elem.className = 'page-view page-view-winners';
  elem.hidden = true;

  elem.innerHTML = `
    <h2>Winners <span class="winners-total-count">(${winnersCars.totalCount})</span></h2>
    <div class="current-page-number winners-current-page-number">Page: #${curState.winnersPagination}</div>
  `;

  elem.append(getWinnersTable(winnersCars.winnersCarsList));
  elem.append(getPagination(winnersCars.totalCount, PageName.winners));

  handleEvents();

  return elem;
}
