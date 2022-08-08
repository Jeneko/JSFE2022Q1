import * as state from 'utils/state';
import { getCars } from 'API/api';

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

  return elem;
}
