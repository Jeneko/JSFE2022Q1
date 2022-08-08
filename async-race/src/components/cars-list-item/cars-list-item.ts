import { Car } from 'types/index';
import generateCar from 'components/car/car';
import './cars-list-item.css';

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

  return elem;
}
