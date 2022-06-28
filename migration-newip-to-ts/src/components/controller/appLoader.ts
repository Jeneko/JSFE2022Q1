import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '0f0f19a5feca4a06b58dacd60aafec86', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
