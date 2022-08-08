import { Car } from 'types/index';
import getCarListItem from 'components/cars-list-item/cars-list-item';
import './cars-list.css';

export default function getCarsList(carsList: Car[]): HTMLOListElement {
  const elem = document.createElement('ol');
  elem.className = 'cars-list';

  carsList.forEach((car: Car) => { elem.append(getCarListItem(car)); });

  return elem;
}
