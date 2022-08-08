import * as state from 'utils/state';
import {
  Order, Sort, Winner, Car,
} from 'types/index';
import { getWinnersCars } from 'API/api';
import generateCar from 'components/car/car';
import './winners-table.css';

async function sortWinnersTable(elem: HTMLElement, sort: Sort): Promise<void> {
  const curState = state.getState();
  let sortOrder = Order.asc;

  if (curState.winnersSort === sort) {
    sortOrder = (curState.winnersOrder === Order.desc) ? Order.asc : Order.desc;
  }

  state.updateState('winnersSort', sort);
  state.updateState('winnersOrder', sortOrder);
  const winnersCars = await getWinnersCars();
  elem.replaceWith(getWinnersTable(winnersCars.winnersCarsList));
}

function handleEvents(elem: HTMLElement): void {
  elem.onclick = async (e: Event) => {
    const target = e.target as HTMLElement;

    // Sort By Wins
    if (target.classList.contains('sort-by-wins')) {
      sortWinnersTable(elem, Sort.wins);
    }

    // Sort By Wins
    if (target.classList.contains('sort-by-time')) {
      sortWinnersTable(elem, Sort.time);
    }
  };
}

export default function getWinnersTable(winnersCarsList: (Winner & Car)[]): HTMLTableElement {
  const curState = state.getState();
  const elem = document.createElement('table');
  elem.className = `winners-table order-${curState.winnersOrder.toLowerCase()}`;

  const winsSort = curState.winnersSort === Sort.wins ? 'order-mark' : '';
  const timeSort = curState.winnersSort === Sort.time ? 'order-mark' : '';

  elem.innerHTML = `
    <thead>
      <tr>
        <th class="column-pos">Number</th>
        <th class="column-view">Car</th>
        <th class="column-name">Name</th>
        <th class="sort-by-wins ${winsSort}">Wins</th>
        <th class="sort-by-time ${timeSort}">Best time (s)</th>
      </tr>
    </thead>
  `;

  let tableBody = '';
  winnersCarsList.forEach((winnerCar, idx) => {
    const number = idx + 1 + curState.winnersQtyOnPage * (curState.winnersPagination - 1);
    tableBody += `
    <tr>
      <td>${number}</td>
      <td>${generateCar(winnerCar.color, winnerCar.id, winnerCar.name)}</td>
      <td>${winnerCar.name}</td>
      <td>${winnerCar.wins}</td>
      <td>${winnerCar.time}</td>
    </tr>
    `;
  });

  elem.innerHTML += `<tbody>${tableBody}</tbody>`;

  handleEvents(elem);

  return elem;
}
