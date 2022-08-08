import {
  State, PageName, Sort, Order,
} from 'types/index';

const SALT = '_jen_k23hiahsf3';
const STATE_NAME = `state${SALT}`;

const DEFAULT_STATE: State = {
  page: PageName.garage,
  garagePagination: 1,
  garageQtyOnPage: 7,
  garageTotalCount: 0,
  winnersPagination: 1,
  winnersQtyOnPage: 10,
  winnersTotalCount: 0,
  winnersSort: Sort.wins,
  winnersOrder: Order.desc,
};

export function getState(): State {
  const stateString = localStorage.getItem(STATE_NAME);
  if (typeof stateString === 'string') {
    const state = JSON.parse(stateString);
    return state;
  }
  return DEFAULT_STATE;
}

export function saveState(state: State): void {
  localStorage.setItem(STATE_NAME, JSON.stringify(state));
}

export function updateState(key: string, value: string | number): void {
  const state = getState();
  saveState({ ...state, [key]: value });
}

export function setWinnerId(carId: number): void {
  localStorage.setItem('winnerId', String(carId));
}

export function getWinnerId(): number {
  return Number(localStorage.getItem('winnerId'));
}

export function clearWinnerId(): void {
  localStorage.removeItem('winnerId');
}
