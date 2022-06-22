import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '0f0f19a5feca4a06b58dacd60aafec86', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
