import * as state from 'utils/state';
import {
  AnimationIds, EngineResponse, EngineStatus, ResponseStatus, RaceType,
} from 'types/index';
import { controlEngine, switchEngineToDrive } from 'API/api';

export function startAnimation(carId: number, engineResponse: EngineResponse, animationIds: AnimationIds): void {
  const car = document.querySelector(`.car[data-id="${carId}"]`) as HTMLElement;
  const duration = engineResponse.distance / engineResponse.velocity; // ms
  const distance = (document.querySelector('.track') as HTMLElement).clientWidth - car.clientWidth; // px
  const speed = distance / duration; // px/ms

  car.classList.add('car-racing');

  const startTime = Date.now();

  animationIds.set(carId, requestAnimationFrame(function animate(): void {
    const diff = Date.now() - startTime; // ms
    let delta = diff * speed; // px

    if (delta > distance) { // Prevent car from going beyond the end of the distance
      delta = distance;
      car.style.left = `${delta}px`;
    }

    car.style.left = `${delta}px`;
    animationIds.set(carId, requestAnimationFrame(animate));
  }));
}

export function disableUIWhileRace(disabled: boolean, type: RaceType): void {
  const elems: HTMLButtonElement[] = [];
  elems.push(document.querySelector('.btn-create-car') as HTMLButtonElement);
  elems.push(document.querySelector('.btn-generate-cars') as HTMLButtonElement);
  elems.push(...document.querySelectorAll<HTMLButtonElement>('.btn-select-car'));
  elems.push(...document.querySelectorAll<HTMLButtonElement>('.btn-remove-car'));
  elems.push(...document.querySelectorAll<HTMLButtonElement>('.garage-pagination .btn-pagination'));

  if (type === RaceType.single) {
    elems.push(document.querySelector('.btn-race-all') as HTMLButtonElement);
  }

  if (type === RaceType.all) {
    elems.push(...document.querySelectorAll<HTMLButtonElement>('.btn-car-start'));
  }

  if (disabled) {
    elems.forEach((btn) => { btn.classList.add('ui-disabled-by-race'); });
    return;
  }

  if (type === RaceType.single) {
    const activeCars = document.querySelectorAll('.car-racing');
    if (activeCars.length) return;
  }

  elems.forEach((btn) => { btn.classList.remove('ui-disabled-by-race'); });
}

export function returnCar(carId: number): void {
  const car = document.querySelector(`.car[data-id="${carId}"]`) as HTMLElement;
  const startButton = document.querySelector(`.btn-car-start[data-id="${carId}"]`) as HTMLButtonElement;
  const stopButton = document.querySelector(`.btn-car-stop[data-id="${carId}"]`) as HTMLButtonElement;

  car.style.left = '0';
  stopButton.disabled = true;
  startButton.disabled = false;
  car.classList.remove('car-racing');
}

export async function startEngine(carId: number): Promise<EngineResponse> {
  return controlEngine(carId, EngineStatus.started);
}

export async function startEngines(carsIds: number[]): Promise<EngineResponse[]> {
  const promiseArr: Promise<EngineResponse>[] = [];
  carsIds.forEach((carId) => {
    promiseArr.push(startEngine(carId));
  });

  return Promise.all(promiseArr);
}

export async function stopEngine(carId: number): Promise<EngineResponse> {
  return controlEngine(carId, EngineStatus.stopped);
}

export async function stopEnginesAndReturnCars(carsIds: number[], animationIds: AnimationIds): Promise<EngineResponse[]> {
  const promiseArr: Promise<EngineResponse>[] = [];
  carsIds.forEach((carId) => {
    const curPromise = stopEngine(carId);
    curPromise.then(() => {
      cancelAnimationFrame(animationIds.get(carId) as number);
      returnCar(carId);
    });
    promiseArr.push(curPromise);
  });

  return Promise.all(promiseArr);
}

export async function driveCars(carsIds: number[], engineResponses: EngineResponse[], abortController: AbortController, animationIds: AnimationIds, announceWinner: boolean): Promise<void> {
  carsIds.forEach((carId, idx) => {
    const raceTime = ((engineResponses[idx].distance / engineResponses[idx].velocity) / 1000).toFixed(2);

    startAnimation(carId, engineResponses[idx], animationIds);
    switchEngineToDrive(carId, abortController.signal)
      .then((result) => {
        cancelAnimationFrame(animationIds.get(carId) as number);
        if (result.status === ResponseStatus.ok && isFirst() && announceWinner) {
          // TODO: process winner
          state.setWinnerId(carId);
          console.log('WE HAVE THE WINNER!', carId, raceTime);
        }
      })
      .catch(() => {});
  });
}

function isFirst(): boolean {
  return Boolean(!state.getWinnerId());
}
