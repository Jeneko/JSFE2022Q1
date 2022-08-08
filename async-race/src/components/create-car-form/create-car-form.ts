import { createCar } from 'API/api';
import './create-car-form.css';

export default function getCreateCarForm(): HTMLFormElement {
  const form = document.createElement('form');
  form.className = 'create-car-form';
  form.name = 'create-car-form';

  form.innerHTML = `
    <input type="text" name="name" placeholder="Enter car name...">
    <input type="color" name="color" value="#ffffff" title="Choose car color">
    <button class="btn-create-car">Create</button>
  `;

  form.onsubmit = async (e) => {
    e.preventDefault();

    const btn = form.querySelector('.btn-create-car') as HTMLInputElement;
    const name = form.querySelector('[name="name"]') as HTMLInputElement;
    const color = form.querySelector('[name="color"]') as HTMLInputElement;

    btn.disabled = true;
    await createCar(name.value, color.value);

    name.value = '';
    color.value = '#ffffff';
    btn.disabled = false;

    form.dispatchEvent(new Event('updateCarsList', { bubbles: true }));
  };

  return form;
}
