import * as state from 'utils/state';
import getGarageView from 'components/garage-view/garage-view';
import getWinnersView from 'components/winners-view/winners-view';

function switchPage(): void {
  const pages = document.querySelectorAll<HTMLElement>('.page-view');
  pages.forEach((page) => { page.hidden = true; });
  const curPage = document.querySelector(`.page-view-${state.getState().page}`) as HTMLElement;
  curPage.hidden = false;
}

export default async function startApp(): Promise<void> {
  document.body.append(await getGarageView());
  document.body.append(await getWinnersView());
  switchPage();
}
