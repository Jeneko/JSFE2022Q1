import './race-controls.css';

export default function getRaceControls(): HTMLElement {
  const elem = document.createElement('div');
  elem.className = 'race-controls';

  elem.innerHTML = `
    <button class="btn-race-all">Race</button>
    <button class="btn-reset-all" disabled>Reset</button>
    <button class="btn-generate-cars">Generate Cars</button>
  `;

  return elem;
}
