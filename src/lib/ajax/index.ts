import { user } from "../auth";
import { formUtils } from "../form";
import { messages } from "../messages";
import type { PaginatedResponse } from "../pagination";
import { goto } from "$app/navigation";
import { navigating } from "$app/stores";
import { get } from "svelte/store";
import { error, type NumericRange } from "@sveltejs/kit";
import { createFormDataFromObject } from "../utils";
type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';
type ResponseType = 'json' | 'blob' | 'text' | 'none' | 'paginate' | 'form-data' | 'basic-json';
type ResourceResponse<D, A = object> = A & {
    data: D;
}
type Options = {
    preserveErrors?: boolean;
    convertToFormData?: boolean;
    unauthenticatedMessage?: string;
    dontUseBaseURL?: boolean;
    disableRedirects?: boolean;
    abortSignal?: AbortSignal;
}
type AjaxResponse<B> = {
    response: Response;
    body: B;
    error?: string;
    detailed_error?: string;
    throwHttpError: () => void;
}
type ResponseBody = Blob | string | Record<string, any> | FormData | null;
type RequestBody = Record<string, any> | FormData | undefined;
export type AjaxResourceResponse<R, A> = AjaxResponse<ResourceResponse<R, A>>;
type AjaxPaginatedResponse<R, A> = AjaxResponse<PaginatedResponse<R, A>>;
type AjaxValidationErrorResponse = {
    message: string;
    errors: {
        [key: string]: string[];
    }
}
export class Ajax
{
    private uri: string;
    private method: Method;
    private headers: Record<string, string> = {
        'X-Requested-With': 'XMLHttpRequest',
    }
    private options: Options;
    private isNavigating: boolean;

    constructor(uri: string, method: Method, options?: Options)
    {
        this.uri = uri;
        this.method = method;
        this.options = options ? options : {};
        let token: string = '';
        token = user.get('access_token');
        this.setAuthorizationHeader(token, 'Bearer');
        this.isNavigating = get(navigating) !== null;
        this.initLoadIcon();
    }

    public static get(uri: string, options?: Options): Ajax
    {
        return new Ajax(uri, 'GET', options);
    }

    public static post(uri: string, options?: Options): Ajax
    {
        return new Ajax(uri, 'POST', options);
    }

    public static put(uri: string, options?: Options): Ajax
    {
        return new Ajax(uri, 'PUT', options);
    }

    public static patch(uri: string, options?: Options): Ajax
    {
        return new Ajax(uri, 'PATCH', options);
    }

    public static delete(uri: string, options?: Options): Ajax
    {
        return new Ajax(uri, 'DELETE', options);
    }

    public static head(uri: string, options?: Options): Ajax
    {
        return new Ajax(uri, 'HEAD', options);
    }

    public setHeader(key: string, value: string): Ajax
    {
        this.headers[key] = value;
        return this;
    }

    public setAuthorizationHeader(value: string | undefined | null, type: 'Bearer' = 'Bearer'): Ajax
    {
        return this.setHeader('Authorization', `${type} ${value}`);
    }

    public setOption(key: 'unauthenticatedMessage', value: string): Ajax
    public setOption(key: 'preserveErrors', value: boolean): Ajax
    public setOption(key: 'convertToFormData', value: boolean): Ajax
    public setOption(key: 'dontUseBaseURL', value: boolean): Ajax
    public setOption(key: 'disableRedirects', value: boolean): Ajax
    public setOption(key: 'abortSignal', value: AbortSignal): Ajax
    public setOption(key: keyof Options, value: any): Ajax
    {
        this.options[key] = value;
        return this;
    }

    public async send(responseType: 'text', data?: RequestBody): Promise<AjaxResponse<string>>;
    public async send(responseType: 'none', data?: RequestBody): Promise<AjaxResponse<null>>;
    public async send<R, A = object>(responseType: 'json', data?: RequestBody): Promise<AjaxResourceResponse<R, A>>;
    public async send<R>(responseType: 'basic-json', data?: RequestBody): Promise<AjaxResponse<R>>;
    public async send<R, A = object>(responseType: 'paginate', data?: RequestBody): Promise<AjaxPaginatedResponse<R, A>>;
    public async send(responseType: 'blob', data?: RequestBody): Promise<AjaxResponse<Blob>>;
    public async send(responseType: ResponseType, data?: RequestBody): Promise<AjaxResponse<ResponseBody>>
    {
        const ajaxResponse: AjaxResponse<ResponseBody> = {
            response: new Response,
            body: null,
            throwHttpError()
            {
                const statusCode = ajaxResponse.response.status;
                if ((statusCode >= 400 && statusCode <= 599) || ajaxResponse.error) {
                    error(
                        statusCode >= 400 && statusCode <= 599 ? statusCode : 500,
                        {
                            message: ajaxResponse.response.statusText,
                            detailed_message: ajaxResponse.detailed_error,
                        },
                    );
                }
            },
        }
        try {
            const requestBody = this.handleRequestBody(data);
            const url = this.options.dontUseBaseURL ? this.uri : `${import.meta.env.VITE_API_BASE_URL}${this.uri}`;
            const response = await fetch(url, {
                method: this.method,
                headers: this.headers,
                body: requestBody,
                signal: this.options.abortSignal,
            });
            if (!this.options.preserveErrors) formUtils.cleanErrors();
            if (!response.ok) {
                if (response.status === 422) {
                    const responseErrors: AjaxValidationErrorResponse = await response.json();
                    formUtils.setErrors(responseErrors.errors);
                    formUtils.message();
                } else if (response.status === 401) {
                    messages.error(this.options.unauthenticatedMessage ?? 'Você precisa se identificar para acessar esse recurso');
                    user.clean();
                    if (!this.options.disableRedirects) goto('/login');
                } else if (response.status === 403) {
                    const errorResponse: {message: string} = await response.json();
                    const forbiddenMessage = errorResponse.message ? errorResponse.message : 'Você não tem permissão para acessar o recurso selecionado';
                    if (this.isNavigating && !this.options.disableRedirects) {
                        ajaxResponse.detailed_error = forbiddenMessage;
                    } else {
                        messages.error(forbiddenMessage);
                    }
                } else {
                    const errorMessageDetail: string | undefined = (await response.json()).message;
                    if (!this.isNavigating) messages.error(errorMessageDetail);
                    console.error(`ERRO ${response.status}: ${response.statusText}`);
                    ajaxResponse.detailed_error = errorMessageDetail;
                    if (errorMessageDetail) console.error(errorMessageDetail);
                }
                ajaxResponse.error = `ERRO ${response.status}: ${response.statusText}`;
                ajaxResponse.body = null;
            } else {
                try {
                    if (response.headers.get('App-Current-User')) {
                        let currentUserHeader: string = '';
                        try {
                            currentUserHeader = atob(response.headers.get('App-Current-User') ?? '');
                        } catch (error) {
                            if (error instanceof DOMException && error.name === 'InvalidCharacterError') {
                                currentUserHeader = response.headers.get('App-Current-User') ?? '';
                            } else throw error;
                        }
                        const jsonCurrentUser = JSON.parse(currentUserHeader);
                        user.update(jsonCurrentUser);
                    }
                } catch (error) {
                    Promise.reject(error);
                }
                const responseBody = await this.handleResponseBody(response, responseType);
                ajaxResponse.body = responseBody
            }
            ajaxResponse.response = response;
        } catch (error) {
            messages.error(String(error));
            ajaxResponse.error = String(error);
        } finally {
            this.stopLoadingIcon();
        }
        return ajaxResponse;
    }

    private initLoadIcon(): void
    {
        const div = document.createElement('div');
        div.setAttribute('aria-hidden', 'true');
        div.setAttribute('id', 'loading-icon');
        document
            .body
            .appendChild(div);
    }

    private stopLoadingIcon(): void
    {
        document
            .querySelector('#loading-icon')
            ?.remove();
    }

    private handleRequestBody(data?: RequestBody): undefined | string | FormData
    {
        let body: undefined | string | FormData = undefined;
        if (this.method === 'GET') {
            if (data) {
                const query = new URLSearchParams;
                if (!(data instanceof FormData)) data = createFormDataFromObject(data);
                if (data instanceof FormData) {
                    for (const key of data.keys()) {
                        const item = data.get(key);
                        query.append(key, String(item ?? ''));
                    }
                }
                const queryString = query.toString();
                if (queryString) this.uri += `?${queryString}`;
            }
        } else if (this.options.convertToFormData) {
            if (!(data instanceof FormData) && data) {
                body = createFormDataFromObject(data);
            }
        } else if (data && !(data instanceof FormData)) {
            this.headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }
        return body;
    }

    private async handleResponseBody(response: Response, responseType: ResponseType): Promise<ResponseBody>
    {
        let responseBody: ResponseBody;
        switch (responseType)
        {
            case 'blob':
                responseBody = await response.blob();
                break;
            case 'form-data':
                responseBody = await response.formData();
                break;
            case 'json':
            case 'paginate':
            case 'basic-json':
                responseBody = await response.json();
                break;
            case 'text':
                responseBody = await response.text();
                break;
            default:
                responseBody = null;
        }
        return responseBody;
    }
}