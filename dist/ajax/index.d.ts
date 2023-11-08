import type { PaginatedResponse } from "../pagination";
type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';
type ResourceResponse<D, A = object> = A & {
    data: D;
};
type Options = {
    preserveErrors?: boolean;
    convertToFormData?: boolean;
    unauthenticatedMessage?: string;
};
type AjaxResponse<B> = {
    response: Response;
    body: B;
    error?: string;
};
type RequestBody = Record<string, any> | FormData | undefined;
type AjaxResourceResponse<R, A> = AjaxResponse<ResourceResponse<R, A>>;
type AjaxPaginatedResponse<R, A> = AjaxResponse<PaginatedResponse<R, A>>;
export declare class Ajax {
    private url;
    private method;
    private headers;
    private options;
    constructor(uri: string, method: Method, options?: Options);
    static get(uri: string, options?: Options): Ajax;
    static post(uri: string, options?: Options): Ajax;
    static put(uri: string, options?: Options): Ajax;
    static patch(uri: string, options?: Options): Ajax;
    static delete(uri: string, options?: Options): Ajax;
    static head(uri: string, options?: Options): Ajax;
    setHeader(key: string, value: string): Ajax;
    setAuthorizationHeader(value: string | undefined | null, type?: 'Bearer'): Ajax;
    setOption(key: 'unauthenticatedMessage', value: string): Ajax;
    setOption(key: 'preserveErrors', value: boolean): Ajax;
    setOption(key: 'convertToFormData', value: boolean): Ajax;
    private getToken;
    send(responseType: 'text', data?: RequestBody): Promise<AjaxResponse<string>>;
    send(responseType: 'none', data?: RequestBody): Promise<AjaxResponse<null>>;
    send<R, A = object>(responseType: 'json', data?: RequestBody): Promise<AjaxResourceResponse<R, A>>;
    send<R, A = object>(responseType: 'paginate', data?: RequestBody): Promise<AjaxPaginatedResponse<R, A>>;
    send(responseType: 'blob', data?: RequestBody): Promise<AjaxResponse<Blob>>;
    private initLoadIcon;
    private stopLoadingIcon;
    private handleRequestBody;
    private handleResponseBody;
}
export {};
