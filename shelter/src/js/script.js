import { burgerMenuHandler } from './burgerMenuHandler.js';
import { carouselHandler } from './carouselHandler.js';
import { popupHandler } from './popup.js';

window.onload = () => {
    burgerMenuHandler();
    carouselHandler();
    popupHandler();
}