import { Car } from 'types/index';
import { deleteCar, getCar } from 'API/api';
import getCarListItem from 'components/cars-list-item/cars-list-item';
import './cars-list.css';

function handleEvents(elem: HTMLElement): void {
  elem.onclick = async (e) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const carId = Number(target.dataset.id);

    // Click on Remove Btn
    if (target.classList.contains('btn-remove-car')) {
      await deleteCar(carId);
      elem.dispatchEvent(new Event('updateCarsList', { bubbles: true }));
    }

    // Click on Select Btn
    if (target.classList.contains('btn-select-car')) {
      const allRemoveButtons = document.querySelectorAll<HTMLButtonElement>('.btn-remove-car');
      allRemoveButtons.forEach((btn) => { btn.disabled = false; });

      const curRemoveButton = document.querySelector(`.btn-remove-car[data-id="${carId}"]`) as HTMLButtonElement;
      curRemoveButton.disabled = true;

      const car = await getCar(carId);
      elem.dispatchEvent(new CustomEvent('fillUpdateCarForm', { bubbles: true, detail: car }));
    }
  };
}

export default function getCarsList(carsList: Car[]): HTMLOListElement {
  const elem = document.createElement('ol');
  elem.className = 'cars-list';

  carsList.forEach((car: Car) => { elem.append(getCarListItem(car)); });

  handleEvents(elem);

  return elem;
}
