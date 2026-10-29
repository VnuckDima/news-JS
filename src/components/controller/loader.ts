import { ILoaderOptions, HttpMethod } from '../../types';

class Loader {
    protected readonly baseLink: string;
    protected readonly options: Readonly<Record<string, string>>;

    constructor(baseLink: string, options: Record<string, string>) {
        this.baseLink = baseLink;
        this.options = Object.freeze({ ...options });
    }

    public getResp<T>(
        { endpoint, options = {} }: ILoaderOptions,
        callback: (data: T) => void = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load(HttpMethod.GET, endpoint, callback, options);
    }

    protected errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log('Sorry, but there is ' + res.status + ' error: ' + res.statusText);
            }
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Record<string, string>, endpoint: string | undefined): string {
        const urlOptions = { ...this.options, ...options } as Record<string, string>;
        const endpointStr = endpoint || '';
        let url = this.baseLink + endpointStr + '?';

        Object.keys(urlOptions).forEach((key) => {
            url += key + '=' + urlOptions[key] + '&';
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: HttpMethod | string,
        endpoint: string | undefined,
        callback: (data: T) => void,
        options: Record<string, string> = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((res) => this.errorHandler(res))
            .then((res) => res.json())
            .then((data: T) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
