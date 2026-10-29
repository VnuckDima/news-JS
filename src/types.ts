export interface ISource {
    readonly id: string;
    readonly name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface IArticleSource {
    readonly id: string | null;
    readonly name: string;
}

export interface IArticle {
    readonly source: IArticleSource;
    readonly author: string | null;
    readonly title: string;
    readonly description: string | null;
    readonly url: string;
    readonly urlToImage: string | null;
    readonly publishedAt: string;
    readonly content: string | null;
}

export interface ISourcesResponse {
    readonly status: string;
    readonly sources: ReadonlyArray<ISource>;
}

export interface IArticlesResponse {
    readonly status: string;
    readonly totalResults: number;
    readonly articles: ReadonlyArray<IArticle>;
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export enum Endpoint {
    SOURCES = 'sources',
    EVERYTHING = 'everything',
}

export interface ILoaderOptions {
    endpoint: Endpoint | string;
    options?: Record<string, string>;
}

export type PartialArticle = Partial<IArticle>;
export type PickedSource = Pick<ISource, 'id' | 'name'>;
export type SourceId = ISource['id'];
