import { createCar } from 'API/api';
import { Car, GeneratedCar } from 'types/index';
import './race-controls.css';

const GENERATE_CARS_QTY = 100;

function handleEvents(elem: HTMLElement): void {
  elem.onclick = async (e) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;

    // Click on Generate Cars
    if (target.classList.contains('btn-generate-cars')) {
      await createCars(elem);
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
