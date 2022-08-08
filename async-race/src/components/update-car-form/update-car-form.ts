import { Car } from 'types/index';
import { updateCar } from 'API/api';
import './update-car-form.css';

export default function getUpdateCarForm(car?: Car): HTMLFormElement {
  const form = document.createElement('form');
  form.className = 'update-car-form';
  form.name = 'update-car-form';

  if (car) {
    form.innerHTML = `
      <input type="text" name="name" value="${car.name}">
      <input type="color" name="color" value="${car.color}" title="Choose car color">
      <input type="hidden" name="id" value="${car.id}">
      <button class="btn-update-car">Update</button>
    `;
  } else {
    form.innerHTML = `
      <input type="text" name="name" value="">
      <input type="color" name="color" value="#ffffff" title="Choose car color">
      <button class="btn-update-car" disabled>Update</button>
    `;
  }

  form.onsubmit = async (e) => {
    e.preventDefault();
    const id = form.querySelector('[name="id"]') as HTMLInputElement;
    const btn = form.querySelector('.btn-update-car') as HTMLInputElement;
    const name = form.querySelector('[name="name"]') as HTMLInputElement;
    const color = form.querySelector('[name="color"]') as HTMLInputElement;

    btn.disabled = true;
    await updateCar(Number(id.value), name.value, color.value);

    name.value = '';
    color.value = '#ffffff';
    form.dispatchEvent(new Event('updateCarsList', { bubbles: true }));
  };

  return form;
}
