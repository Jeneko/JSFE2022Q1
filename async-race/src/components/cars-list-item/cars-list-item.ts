import { Car, AnimationIds, RaceType } from 'types/index';
import generateCar from 'components/car/car';
import {
  startEngines, driveCars, stopEnginesAndReturnCars, disableUIWhileRace,
} from 'utils/race-functions';
import './cars-list-item.css';

async function startCar(carId: number, abortController: AbortController, animationIds: AnimationIds): Promise<void> {
  const btnCarStop = document.querySelector(`.btn-car-stop[data-id="${carId}"]`) as HTMLButtonElement;
  const btnCarStart = document.querySelector(`.btn-car-start[data-id="${carId}"]`) as HTMLButtonElement;

  disableUIWhileRace(true, RaceType.single);

  btnCarStart.disabled = true;
  const engineResponse = await startEngines([carId]);
  btnCarStop.disabled = false;

  driveCars([carId], engineResponse, abortController, animationIds, false);
}

async function stopAndReturnCar(carId: number, abortController: AbortController, animationIds: AnimationIds): Promise<void> {
  const btnCarStop = document.querySelector(`.btn-car-stop[data-id="${carId}"]`) as HTMLButtonElement;
  const btnCarStart = document.querySelector(`.btn-car-start[data-id="${carId}"]`) as HTMLButtonElement;

  abortController.abort();

  btnCarStop.disabled = true;
  await stopEnginesAndReturnCars([carId], animationIds);
  btnCarStart.disabled = false;

  disableUIWhileRace(false, RaceType.single);
}

function handleEvents(elem: HTMLElement): void {
  let abortController: AbortController;
  const animationIds: AnimationIds = new Map<number, number>();

  elem.onclick = async (e: Event) => {
    const target = e.target as HTMLButtonElement;
    const carId = Number(target.dataset.id);

    // Click on Start Car
    if (target.classList.contains('btn-car-start')) {
      abortController = new AbortController();
      startCar(carId, abortController, animationIds);
    }

    // Click on Stop Car
    if (target.classList.contains('btn-car-stop')) {
      stopAndReturnCar(carId, abortController, animationIds);
    }
  };
}

export default function carsListItem(carInfo: Car): HTMLLIElement {
  const elem = document.createElement('li');
  elem.className = 'cars-list-item';
  elem.dataset.id = String(carInfo.id);

  elem.innerHTML = `
    <div class="car-edit">
      <button class="btn-select-car" data-id="${carInfo.id}">Select</button>
      <button class="btn-remove-car" data-id="${carInfo.id}">Remove</button>
      <div class="car-name">${carInfo.name}</div>
    </div>
    <div class="track-container">
      <div class="car-control">
        <button class="btn-car-start" data-id="${carInfo.id}">A</button>
        <button class="btn-car-stop" data-id="${carInfo.id}" disabled>B</button>
      </div>
      <div class="track">${generateCar(carInfo.color, carInfo.id, carInfo.name)}</div>
      <div class="finish-flag">
        <svg width="30" height="30" viewBox="0 0 150 160" fill="${carInfo.color}" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 67.5H97.7333V21.0787H22L39 44.2893L22 67.5Z"/>
          <path d="M97.7333 11V21.0787M97.7333 149H118M97.7333 149H77.4667M97.7333 149V67.5M97.7333 67.5H22L39 44.2893L22 21.0787H97.7333M97.7333 67.5V21.0787" stroke="${carInfo.color}" stroke-width="16" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
  `;

  handleEvents(elem);

  return elem;
}
