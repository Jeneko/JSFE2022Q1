export function createCard(cardData) {
    const card = document.createElement('article');
    const cardImg = document.createElement('img');
    const cardHeading = document.createElement('h3');
    const cardBtn = document.createElement('a');

    card.classList.add('pet-card');
    cardImg.classList.add('pet-card__pet-img');
    cardHeading.classList.add('pet-card__pet-name');
    cardBtn.className = 'button-secondary pet-card__pet-link';

    card.dataset.id = cardData.id;
    cardImg.src = cardData.img;
    cardHeading.textContent = cardData.name;
    cardBtn.href = '##';
    cardBtn.textContent = 'Learn more';

    card.append(cardImg, cardHeading, cardBtn);

    return card;
}