import { IRangeSlider } from 'types';
import noUiSlider, { target, API as INoUiApi } from 'nouislider/dist/nouislider';
import 'nouislider/dist/nouislider.min.css';

export class RangeSlider implements IRangeSlider {
  api: INoUiApi;

  constructor(
    root: HTMLElement,
    inputMin: HTMLInputElement,
    inputMax: HTMLInputElement,
    state: [number, number],
    start: [number, number],
    range: { min: number, max: number }
  ) {
    const formatForSlider = {
      from: function (val: string | number) { return Number(val); },
      to: function (val: string | number) { return Math.round(Number(val)); }
    };

    noUiSlider.create(root, {
      start,
      tooltips: true,
      step: 1,
      format: formatForSlider,
      connect: true,
      range
    });

    this.api = ((root as target).noUiSlider as INoUiApi);
    this.api.set(state);
    this.api.on('update', (values, handle) => {
      if (handle === 0) {
        inputMin.value = String(values[0]);
        state[0] = +values[0];
        inputMin.dispatchEvent(new InputEvent('input', { bubbles: true }));
      }
      if (handle === 1) {
        inputMax.value = String(values[1]);
        state[1] = +values[1];
        inputMax.dispatchEvent(new InputEvent('input', { bubbles: true }));
      }
    });
  }
}
