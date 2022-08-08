import * as state from 'utils/state';
import { createCar } from 'API/api';
import {
  Car, GeneratedCar, AnimationIds, RaceType,
} from 'types/index';
import {
  startEngines, driveCars, stopEnginesAndReturnCars, disableUIWhileRace,
} from 'utils/race-functions';
import './race-controls.css';

const GENERATE_CARS_QTY = 100;

async function startAllCars(carsIds: number[], abortController: AbortController, animationIds: AnimationIds): Promise<void> {
  const raceBtn = document.querySelector('.btn-race-all') as HTMLButtonElement;
  const resetBtn = document.querySelector('.btn-reset-all') as HTMLButtonElement;

  disableUIWhileRace(true, RaceType.all);

  raceBtn.disabled = true;
  const engineResponses = await startEngines(carsIds);
  resetBtn.disabled = false;

  state.clearWinnerId(); // Clear up the last winner if any

  await driveCars(carsIds, engineResponses, abortController, animationIds, true);
}

async function stopAndReturnCars(carsIds :number[], abortController: AbortController, animationIds: AnimationIds): Promise<void> {
  const raceBtn = document.querySelector('.btn-race-all') as HTMLButtonElement;
  const resetBtn = document.querySelector('.btn-reset-all') as HTMLButtonElement;

  abortController.abort();

  resetBtn.disabled = true;
  await stopEnginesAndReturnCars(carsIds, animationIds);
  raceBtn.disabled = false;

  disableUIWhileRace(false, RaceType.all);
}

function handleEvents(elem: HTMLElement): void {
  let abortController: AbortController;
  const animationIds: AnimationIds = new Map<number, number>();

  elem.onclick = async (e) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;

    // Click on Generate Cars
    if (target.classList.contains('btn-generate-cars')) {
      await createCars(elem);
    }

    // Click on Race
    if (target.classList.contains('btn-race-all')) {
      abortController = new AbortController();
      const carsIds = getCarsIdsFromCurrentPage();
      startAllCars(carsIds, abortController, animationIds);
    }

    // Click on Reset
    if (target.classList.contains('btn-reset-all')) {
      const carsIds = getCarsIdsFromCurrentPage();
      stopAndReturnCars(carsIds, abortController, animationIds);
    }
  };
}

export default function getRaceControls(): HTMLElement {
  const elem = document.createElement('div');
  elem.className = 'race-controls';

  elem.innerHTML = `
    <button class="btn-race-all">Race</button>
    <button class="btn-reset-all" disabled>Reset</button>
    <button class="btn-generate-cars">Generate Cars</button>
  `;

  handleEvents(elem);

  return elem;
}

function getCarsIdsFromCurrentPage(): number[] {
  const carsIds: number[] = [];
  const curCars = document.querySelectorAll<HTMLElement>('.cars-list-item');
  curCars.forEach((el) => carsIds.push(Number(el.dataset.id)));

  return carsIds;
}

async function createCars(elem: HTMLElement): Promise<void> {
  const promiseArr: Promise<Car>[] = [];

  for (let i = 0; i < GENERATE_CARS_QTY; i += 1) {
    const car = generateCar();
    promiseArr.push(createCar(car.name, car.color));
  }

  await Promise.all(promiseArr);
  elem.dispatchEvent(new Event('updateCarsList', { bubbles: true }));
}

function generateCar(): GeneratedCar {
  const car = {
    name: generateName(),
    color: generateColor(),
  };

  return car;
}

function generateName(): string {
  const brands = ['Mercedess', 'BMW', 'Opel', 'Volkswagen', 'Audi', 'Volvo', 'Ford', 'Toyota', 'Suzuki', 'Mazda', 'Lexus', 'Nissan', 'Saab', 'Fiat', 'Mitsubishi', 'Renault', 'Peugeot'];
  const models = ['z350', 'Astra', '4matic', 'Focus', 'Mustang', 'Corsa', 'Golf', 'rx7', 'Swift', 'ES 350', 'Q7', 'Arcana', 'Polo', 'Prius'];

  return `${getRandomElementOfArray(brands)} ${getRandomElementOfArray(models)}`;
}

function generateColor(): string {
  const min = 0;
  const max = 255;
  let red = (min + Math.floor(Math.random() * max + 1)).toString(16);
  let green = (min + Math.floor(Math.random() * max + 1)).toString(16);
  let blue = (min + Math.floor(Math.random() * max + 1)).toString(16);

  red = red.length < 2 ? `0${red}` : red;
  green = green.length < 2 ? `0${green}` : green;
  blue = blue.length < 2 ? `0${blue}` : blue;

  return `#${red}${green}${blue}`;
}

function getRandomElementOfArray<T>(array: Array<T>): T {
  const min = 0;
  const max = array.length;
  const random = min + Math.floor(Math.random() * max);

  return array[random];
}
