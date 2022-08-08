import * as state from 'utils/state';
import { writeWinner } from 'API/api';
import getPageMenu from 'components/page-menu/page-menu';
import getGarageView from 'components/garage-view/garage-view';
import getWinnersView from 'components/winners-view/winners-view';

function switchPage(): void {
  const pages = document.querySelectorAll<HTMLElement>('.page-view');
  pages.forEach((page) => { page.hidden = true; });
  const curPage = document.querySelector(`.page-view-${state.getState().page}`) as HTMLElement;
  curPage.hidden = false;
}

async function processTheWinner(e: Event): Promise<void> {
  const customEvent = e as CustomEvent;
  const winner = customEvent.detail;

  await writeWinner(Number(winner.id), Number(winner.time));

  const winnersView = document.querySelector('.page-view-winners') as HTMLElement;
  winnersView.replaceWith(await getWinnersView());
  switchPage();
}

function handleEvents(): void {
  // Switch page
  document.addEventListener('switchPage', switchPage);

  // New Winner
  document.addEventListener('newWinner', processTheWinner);
}

export default async function startApp(): Promise<void> {
  document.body.append(getPageMenu());
  document.body.append(await getGarageView());
  document.body.append(await getWinnersView());
  switchPage();
  handleEvents();
}
