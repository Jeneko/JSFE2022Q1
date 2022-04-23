import { createCard } from './card.js';

let sliderData;
let contentToCopy;
let isTransiting = false;

const slides = document.querySelector('.pets__slides');
const slidesWrapper = document.querySelector('.pets__slides-wrapper');
const slidesPrev = document.querySelector('.pets__slides-prev');
const slidesCurrent = document.querySelector('.pets__slides-current');
const slidesNext = document.querySelector('.pets__slides-next');
const nextBtn = document.querySelector('.pets__slider-next');
const prevBtn = document.querySelector('.pets__slider-prev');

initCarousel('./assets/json/pets.json');

function initCarousel(src) {
    fetch(src)
        .then(res => res.json())
        .then(json => {
            sliderData = json;
            animate('fadeout');
        });
}

function animate(animationName) {
    slidesCurrent.classList.remove('showing');
    slidesCurrent.classList.add('hiding');
    slidesCurrent.addEventListener('animationend', animationHandler);
    
    function animationHandler(e) {
        if (e.animationName == animationName) {
            fillContainerWithCards(slidesCurrent, sliderData, 3);
            fillContainerWithCards(slidesPrev, filterCurrentData(sliderData), 3);
            fillContainerWithCards(slidesNext, filterCurrentData(sliderData), 3);
            slidesCurrent.classList.remove('hiding');
            slidesCurrent.classList.add('showing');
            slidesCurrent.removeEventListener('animationend', animationHandler);
        }
    }
}

function fillContainerWithCards(container, petsData, qty) {
    const nonRepeatedRandomElements = getNonRepeatedRandomElements(petsData, qty);

    container.innerHTML = "";

    for (let el of nonRepeatedRandomElements) {
        container.append(createCard(el));
    }
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getNonRepeatedRandomElements(arr, qty) {
    const set = new Set();

    if (qty > arr.length - 1) throw new RangeError('Array\'s length must be greater or equal to qty');

    while (set.size < qty) {
        set.add(getRandomElement(arr));
    }

    return Array.from(set);

}

function replaceContent(from, to) {
    const clone = from.cloneNode(true);
    to.innerHTML = '';
    to.append(...clone.children);
}

function filterCurrentData(data) {
    const currentDataIds = [];

    for (let el of slidesCurrent.children) {
        currentDataIds.push(Number(el.dataset.id));
    }

    return data.filter(el => !currentDataIds.includes(el.id));
}

function carouselHandler() {
    nextBtn.addEventListener('click', () => {
        if (isTransiting) return;

        slidesWrapper.classList.add('sliding-right');
        contentToCopy = slidesNext;
    });

    prevBtn.addEventListener('click', () => {
        if (isTransiting) return;

        slidesWrapper.classList.add('sliding-left');
        contentToCopy = slidesPrev;
    });

    slidesWrapper.addEventListener('transitionstart', (e) => {
        if (e.target !== slidesWrapper) return;
        
        isTransiting = true;
        slides.classList.toggle('pets__slides-active');
    });

    slidesWrapper.addEventListener('transitionend', (e) => {
        if (e.target !== slidesWrapper) return;
        
        isTransiting = false;
        slides.classList.toggle('pets__slides-active');
        
        replaceContent(contentToCopy, slidesCurrent);

        slidesWrapper.classList.remove('sliding-right');
        slidesWrapper.classList.remove('sliding-left');

        fillContainerWithCards(slidesPrev, filterCurrentData(sliderData), 3);
        fillContainerWithCards(slidesNext, filterCurrentData(sliderData), 3);
    });
}

export { carouselHandler }