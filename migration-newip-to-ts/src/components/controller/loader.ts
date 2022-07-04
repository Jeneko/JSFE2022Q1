import { NewsResponse, StatusCodes, ILoader, Query, UrlOptions, Endpoints } from 'types/index';

class Loader implements ILoader {
    baseLink: string;
    options: UrlOptions;

    constructor(baseLink: string, options: UrlOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: Query,
        callback: (data: NewsResponse) => void = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === StatusCodes.unauthorized || res.status === StatusCodes.notFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: UrlOptions, endpoint: Endpoints) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof UrlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: Endpoints, callback: (data: NewsResponse) => void, options: UrlOptions = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
