import { QuerySort } from "./enums";

/**
 *The interface interface of a token response object
 */
export interface ITokenResponseObj {
    /**
     * The token
     * @format string
     * @example eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
     */
    token: string;
}

/**
 * The interface of a HTTP response object
 */
export interface HttpResponse<T> {
    /**
     * The data object of the response
     */
    data: T;
    /**
     * The error as a boolean, nothing if the request was successful
     * @format boolean
     */
    error?: boolean;
    /**
     * The error message
     * @format Array<string>
     */
    errors?: string[];
    /**
     * The meta data of the response
     */
    meta?: ITokenResponseObj & IPagination;
}

/**
 * The interface of a of the query params
 */
export interface IQueryParams {
    /**
     * The page number
     * @format int32
     * @example 1
     */
    page?: number;
    /**
     * The limit of the number of items to return
     * @format int32
     * @example 10
     */
    limit?: number;
    /**
     * The sort order
     * @example asc
     * @example desc
     * @format string
     */
    sort?: QuerySort;
    /**
     * The field to sort by
     * @example createdAt
     * @example updatedAt
     * @format string
     */
    orderBy?: string;
    /**
     * The search query
     * @format string
     */
    search?: string;
}

export interface IAskBaseQuestion {
    sessionId: string
    question: string
}

/**
 * The interface of a pagination object
 */
export interface IPagination {
    /**
     * The page number
     * @format int32
     * @example 1
     */
    page: number;
    /**
     * The limit of the number of items to return
     * @format int32
     * @example 10
     */
    limit: number;
    /**
     * The total number of items
     * @format int32
     * @example 40
     */
    total: number;
    /**
     * The total number of pages
     * @format int32
     * @example 4
     */
    pages: number;
    /**
     * The previous page number, null if there is no previous page
     * @format int32
     * @example 1
     * @example null
     */
    prevPage?: number | null;
    /**
     * The next page number, null if there is no next page
     * @format int32
     * @example 3
     * @example null
     */
    nextPage?: number | null;
}

/**
 * The interface of a paginated data object
 */
export interface IPaginationData<T> {
    /**
     * The pagination object
     */
    pagination: IPagination;
    /**
     * The data array
     */
    data: T[];
}