import { createCard } from './card.js';

const TOTAL_QTY = 48;
const QTY_ON_PAGE_DESKTOP = 8;
const QTY_ON_PAGE_TABLET = 6;
const QTY_ON_PAGE_MOBILE = 3;

const pseudoRandomIndexes = nonRepeatedRandomIndexes();
testIndexes(pseudoRandomIndexes);

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

function testIndexes(arr) {
    console.log("Testing: ", arr);
    // test 8
    for (let i = 0; i < 6; i++) {
        let curArr = arr.slice(i * 8, i * 8 + 8);
        let set = new Set(curArr);

        if (set.size < 8) {
            console.log(`Error in ${i} set of [8]: ` + curArr);
            return;
        }
    }
    // test 6
    for (let i = 0; i < 8; i++) {
        let curArr = arr.slice(i * 6, i * 6 + 6);
        let set = new Set(curArr);

        if (set.size < 6) {
            console.log(`Error in ${i} set of [6]: ` + curArr);
            return;
        }
    }
    console.log('ARRAY IS GOOD');
}

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
    // Создаем первый набор, перемешивая массив чисел от 0 до 7. Это будет первый набор [1, 5, 3, 2, 6, 7, 0, 4]
    let lastSet = shuffle([0, 1, 2, 3, 4, 5, 6, 7]);
    // Добавляем его в итоговый массив
    let result = [...lastSet];
    
    // Остальные наборы генерируем по следующему правилу:
    for (let i = 0; i < 5; i++) {
        let curSet = [];
        // Сохраняем последние 4 элемента предыдущего набора в отдельный массив lastFour = [6, 7, 0, 4]
        let lastFour = lastSet.slice(-4);
        // Копируем первые 4 элемента предыдущего набора [1, 5, 3, 2]
        let workArr = lastSet.slice(0, 4);
        // Перемешиваем его (получаем [5, 1, 3, 2])
        workArr = shuffle(workArr);
        // Берем 2 последних элемента (удаляя их из массива). Это будут первые 2 элемента набора [3, 2]. В массиве остается 2 элемента [5, 1]
        curSet.push(...workArr.splice(-2, 2));
        // Добавляем в массив первые два элемента массива lastFour (6 и 7) (получаем массив из 4 эл-тов) [5, 1, 6, 7]
        workArr.push(...lastFour.slice(0, 2));
        // Перемешиваем его (получаем [6, 1, 5, 7])
        workArr = shuffle(workArr);
        // Берем 2 последних элемента (удаляя их из массива). Это будет 3 и 4 элемент набора [3, 2, 5, 7]. В массиве остается 2 элемента [6, 1]
        curSet.push(...workArr.splice(-2, 2));
        // Добавляем в массив последние два элемента массива lastFour (0 и 4) (получаем массив из 4 эл-тов) [6, 1, 0, 4]
        workArr.push(...lastFour.slice(-2));
        // Перемешиваем его (получаем [1, 6, 4, 0]).
        workArr = shuffle(workArr);
        // Это оставшаяся часть набора, которую добавляем к тому, что уже имеем
        curSet.push(...workArr);
        // В итоге имеем набор [3, 2, 5, 7, 1, 6, 4, 0], который добавляем в итоговый массив
        result.push(...curSet);
        // Сохраняем созданный набор в качестве последнего для использования в следующей итерации
        lastSet = curSet;
    }
    // Повторяем 5 раз, чтобы в итоге получить все 48 эл-тов (6 наборов по 8 эл-тов), удовлетворяющих условию.
    return result;

    function shuffle(arr) {
        let result = [...arr];
        for (let i = result.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }
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