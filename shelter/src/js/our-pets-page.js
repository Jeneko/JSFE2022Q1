import { burgerMenuHandler } from './burgerMenuHandler.js';
import { popupHandler } from './popup.js';
import { allPetsHandler } from './allPetsHandler.js';

window.onload = () => {
    burgerMenuHandler();
    popupHandler();
    allPetsHandler();
}