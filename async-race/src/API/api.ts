import * as state from 'utils/state';
import {
  Car, Cars, Winner, WinnersCars, EngineResponse, ResponseStatus, Endpoints, EngineStatus,
} from 'types/index';

const SOURCE = 'http://localhost:3000';

// ======================
//        GARAGE
// ======================

export async function getCars(): Promise<Cars> {
  const { garagePagination, garageQtyOnPage } = state.getState();
  const url = `${SOURCE}/${Endpoints.garage}?_page=${garagePagination}&_limit=${garageQtyOnPage}`;
  const response = await fetch(url);
  const result = await response.json() as Array<Car>;

  return {
    carsList: result,
    totalCount: Number(response.headers.get('X-Total-Count')),
  };
}

export async function getAllCars(): Promise<Car[]> {
  const url = `${SOURCE}/${Endpoints.garage}`;
  const response = await fetch(url);
  const allCars = await response.json() as Array<Car>;

  return allCars;
}

export async function getCar(id: number): Promise<Car> {
  const url = `${SOURCE}/${Endpoints.garage}/${id}`;
  const response = await fetch(url);
  const car = await response.json() as Car;

  return car;
}

export async function createCar(name: string, color: string): Promise<Car> {
  const url = `${SOURCE}/${Endpoints.garage}`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      color,
    }),
  };
  const response = await fetch(url, options);
  const createdCar = await response.json() as Car;

  return createdCar;
}

export async function deleteCar(id: number): Promise<ResponseStatus> {
  const url = `${SOURCE}/${Endpoints.garage}/${id}`;
  const options = { method: 'DELETE' };
  const result = await fetch(url, options);

  if (result.status === ResponseStatus.ok) {
    const winners = await getAllWinnersCars();
    if (winners.find((el) => el.id === id)) {
      await deleteWinner(id);
    }
  }

  return result.status;
}

export async function updateCar(id: number, name: string, color: string): Promise<ResponseStatus> {
  const url = `${SOURCE}/${Endpoints.garage}/${id}`;
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      color,
    }),
  };
  const result = await fetch(url, options);

  return result.status;
}

export async function controlEngine(id: number, status: EngineStatus): Promise<EngineResponse> {
  const url = `${SOURCE}/${Endpoints.engine}?id=${id}&status=${status}`;
  const options = { method: 'PATCH' };
  const response = await fetch(url, options);
  const engineResponse = await response.json() as EngineResponse;

  return engineResponse;
}

export async function switchEngineToDrive(id: number, signal: AbortSignal): Promise<Response> {
  const url = `${SOURCE}/${Endpoints.engine}?id=${id}&status=drive`;
  const options = {
    method: 'PATCH',
    signal,
  };

  return fetch(url, options);
}

// ======================
//       WINNERS
// ======================

export async function getWinnersCars(): Promise<WinnersCars> {
  const {
    winnersPagination, winnersQtyOnPage, winnersSort, winnersOrder,
  } = state.getState();

  const url = `${SOURCE}/${Endpoints.winners}?_page=${winnersPagination}&_limit=${winnersQtyOnPage}&_sort=${winnersSort}&_order=${winnersOrder}`;
  const response = await fetch(url);
  const winners = await response.json() as Winner[];

  // Supplement winners with cars info
  const carsList = await getAllCars();
  const carsById = carsArrayToCarsObject(carsList);
  const winnersFullInfo = winners.map((el) => Object.assign(el, carsById[el.id]));

  return {
    winnersCarsList: winnersFullInfo,
    totalCount: Number(response.headers.get('X-Total-Count')),
  };
}

export async function getAllWinnersCars(): Promise<Winner[]> {
  const url = `${SOURCE}/${Endpoints.winners}/`;
  const response = await fetch(url);
  const winners = await response.json() as Winner[];

  return winners;
}

export async function getWinner(id: number): Promise<Winner> {
  const url = `${SOURCE}/${Endpoints.winners}/${id}`;
  const response = await fetch(url);
  const winner = await response.json() as Winner;

  return winner;
}

export async function createWinner(id: number, wins: number, time: number): Promise<Response> {
  const url = `${SOURCE}/${Endpoints.winners}`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id,
      wins,
      time,
    }),
  };
  const response = await fetch(url, options);

  return response;
}

export async function writeWinner(id: number, time: number): Promise<void> {
  const winners = await getAllWinnersCars();
  const curWinner = winners.find((el) => Number(el.id) === Number(id));

  if (curWinner) {
    const bestTime = curWinner.time > time ? time : curWinner.time;
    await updateWinner(id, curWinner.wins + 1, bestTime);
    return;
  }

  await createWinner(id, 1, time);
}

export async function deleteWinner(id: number): Promise<ResponseStatus> {
  const url = `${SOURCE}/${Endpoints.winners}/${id}`;
  const options = { method: 'DELETE' };
  const response = await fetch(url, options);

  return response.status;
}

export async function updateWinner(id: number, wins: number, time: number): Promise<Response> {
  const url = `${SOURCE}/${Endpoints.winners}/${id}`;
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      wins,
      time,
    }),
  };
  const response = await fetch(url, options);

  return response;
}

// ======================
//       HELPERS
// ======================

function carsArrayToCarsObject(array: Car[]): { [key: string]: Car } {
  return Object.fromEntries(array.map((el) => [el.id, el]));
}
