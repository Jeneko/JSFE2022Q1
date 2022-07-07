document.addEventListener('DOMContentLoaded', initNoUiSlider);

function initNoUiSlider() {
  const sliderQty  = document.querySelector('.filter__qty');
  const sliderYear = document.querySelector('.filter__year');

  noUiSlider.create(sliderQty, {
    start: [20, 80],
    connect: true,
    range: {
      'min': 0,
      'max': 100
    }
  });

  noUiSlider.create(sliderYear, {
    start: [2007, 2014],
    connect: true,
    range: {
      'min': 2000,
      'max': 2022
    }
  });
}
