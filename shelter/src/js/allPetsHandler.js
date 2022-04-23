import { createCard } from './card.js';

const TOTAL_QTY = 48;
const QTY_ON_PAGE_DESKTOP = 8;
const QTY_ON_PAGE_TABLET = 6;
const QTY_ON_PAGE_MOBILE = 3;

const pseudoRandomIndexes = nonRepeatedRandomIndexes();

const allPetsList = document.querySelector('.all-pets__list');
const firstButton = document.querySelector('.all-pets .button-round-first');
const nextButton = document.querySelector('.all-pets .button-round-next');
const currentButton = document.querySelector('.all-pets .button-round-current');
const prevButton = document.querySelector('.all-pets .button-round-prev');
const lastButton = document.querySelector('.all-pets .button-round-last');

let allPetsData;
let curPage = 1;
let curQty = 8;
let curView = 'desktop';
let prevView = 'desktop';
let needToUpdate = false;

initAllPetsList('./assets/json/pets.json');

function initAllPetsList(src) {
    fetch(src)
        .then(res => res.json())
        .then(json => {
            allPetsData = json;
            updateCurView();
            updateCurQty();
            animate('fadeout', fillContainerWithCards);
        });
}

function animate(animationName, cb) {
    allPetsList.classList.remove('showing');
    allPetsList.classList.add('hiding');
    allPetsList.addEventListener('animationend', animationHandler);
    
    function animationHandler(e) {
        if (e.animationName == animationName) {
            cb();
            allPetsList.classList.remove('hiding');
            allPetsList.classList.add('showing');
            allPetsList.removeEventListener('animationend', animationHandler);
        }
    }
}

function fillContainerWithCards() {
    const begin = (curPage - 1) * curQty;
    const limit = begin + curQty;

    allPetsList.innerHTML = '';

    for (let i = begin; i < limit; i++) {
        allPetsList.append(createCard(allPetsData[pseudoRandomIndexes[i]]));
    }
}

function getLastPageNumber() {
    return Math.round(TOTAL_QTY / curQty);
}

function nonRepeatedRandomIndexes() {
    const result = [];
    let lastTwo = [];

    for (let i = 0; i < 6; i++) {
        const set = new Set();

        while (set.size < 8) {
            let randomIndex = Math.floor(Math.random() * 8);

            if (set.size >= 4 || !lastTwo.includes(randomIndex)) {
                set.add(randomIndex);
            }
        }

        result.push(...set);
        lastTwo = result.slice(result.length - 2);
    }

    return result;
}

function updateButtonsState() {
    currentButton.textContent = curPage;

    if (curPage > 1) {
        firstButton.classList.remove('disabled');
        prevButton.classList.remove('disabled');
    } else {
        firstButton.classList.add('disabled');
        prevButton.classList.add('disabled');
    }

    if (curPage >= getLastPageNumber()) {
        lastButton.classList.add('disabled');
        nextButton.classList.add('disabled');
    } else {
        lastButton.classList.remove('disabled');
        nextButton.classList.remove('disabled');
    }
}

function updateCurView() {
    let allPetsListWidth = allPetsList.getBoundingClientRect().width;

    if (allPetsListWidth >= 1200) {
        curView = 'desktop';
    }

    if (allPetsListWidth < 1200 && allPetsListWidth > 300) {
        curView = 'tablet';
    }

    if (allPetsListWidth <= 300) {
        curView = 'mobile';
    }

    if (curView != prevView) {
        prevView = curView;
        needToUpdate = true;
    } else {
        needToUpdate = false;
    }
}

function updateCurQty() {
    switch (curView) {
        case 'desktop':
            curQty = QTY_ON_PAGE_DESKTOP;
            break;
        case 'tablet':
            curQty = QTY_ON_PAGE_TABLET;
            break;
        case 'mobile':
            curQty = QTY_ON_PAGE_MOBILE;
            break;
    }
}

function checkCurPage() {
    if (curPage * curQty > TOTAL_QTY) {
        curPage = getLastPageNumber();
    }
}

function allPetsHandler() {
    firstButton.addEventListener('click', () => {
        curPage = 1;
        animate('fadeout', fillContainerWithCards);
        updateButtonsState();
    });

    prevButton.addEventListener('click', () => {
        curPage--;
        animate('fadeout', fillContainerWithCards);
        updateButtonsState();
    });

    nextButton.addEventListener('click', () => {
        curPage++;
        animate('fadeout', fillContainerWithCards);
        updateButtonsState();
    });

    lastButton.addEventListener('click', () => {
        curPage = getLastPageNumber();
        animate('fadeout', fillContainerWithCards);
        updateButtonsState();
    });

    window.addEventListener('resize', () => {
        updateCurView();
        updateCurQty();
        if (needToUpdate) {
            needToUpdate = false;
            checkCurPage();
            fillContainerWithCards();
            updateButtonsState();
        }
    });
}

export { allPetsHandler }