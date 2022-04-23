function createAndShowPopup(source, id) {

    fetch(source)
        .then(response => response.json())
        .then(json => {
            const popupData = json.find(el => el.id == id);
            const popup = document.createElement('article');

            popup.className = 'popup';
            popup.innerHTML = `
            <div class="popup__container">
                <div class="popup__wrapper">
                    <div class="popup__img">
                        <img src="${popupData.img}" alt="${popupData.name}">
                    </div>
                    <div class="popup__text">
                        <div class="popup__title-wrapper">
                            <h2 class="popup__title">${popupData.name}</h2>
                            <div class="popup__subtitle">${popupData.type} - ${popupData.breed}</div>
                        </div>
                        <div class="popup__description">${popupData.description}</div>
                        <ul class="popup__metics">
                            <li class="popup__metric popup__age"><b>Age:</b> ${popupData.age}</li>
                            <li class="popup__metric popup__inoculations"><b>Inoculations:</b> ${popupData.inoculations.join(', ')}</li>
                            <li class="popup__metric popup__diseases"><b>Diseases:</b> ${popupData.diseases.join(', ')}</li>
                            <li class="popup__metric parasites"><b>Parasites:</b> ${popupData.parasites.join(', ')}</li>
                        </ul>
                    </div><button class="button-round-close popup__button-round-close" title="Close"></button>
                </div>
            </div>
            <div class="backdrop backdrop--darkTheme"></div>
            `;

            document.documentElement.prepend(popup);
        });
}

function closePopup() {
    document.querySelector('.popup').remove();
    document.body.classList.remove('overflow-hidden');
    document.body.style.marginRight = '';
    document.querySelector('.header').style.right = '';
}

function popupHandler() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.popup__button-round-close') || e.target.classList.contains('popup__container')) {
            closePopup();
        }
    });

    document.addEventListener('click', (e) => {
        const popupInitializer = e.target.closest('[data-show-popup]');
        if (popupInitializer) {
            let prevWidth = document.body.getBoundingClientRect().width;
            document.body.classList.add('overflow-hidden');
            let curWidth = document.body.getBoundingClientRect().width;
            let diffWidth = curWidth - prevWidth;
            document.body.style.marginRight = curWidth - prevWidth + 'px';
            document.querySelector('.header').style.right = diffWidth + 'px';
            createAndShowPopup('./assets/json/pets.json', popupInitializer.dataset.id);
        }
    });
}

export { popupHandler }