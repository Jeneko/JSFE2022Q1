import * as state from 'utils/state';
import { getWinnersCars } from 'API/api';

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

  return elem;
}
