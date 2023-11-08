import { user } from "../auth";
import { errors } from "../form/errors";
import { messages } from "../messages";
import { InternalError } from "../errors";
import type { PaginatedResponse } from "../pagination";
import { goto } from "$app/navigation";
type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';
type ResponseType = 'json' | 'blob' | 'text' | 'none' | 'paginate' | 'form-data';
type ResourceResponse<D, A = object> = A & {
    data: D;
}
type Options = {
    preserveErrors?: boolean;
    convertToFormData?: boolean;
    unauthenticatedMessage?: string;
}
type AjaxResponse<B> = {
    response: Response;
    body: B;
    error?: string;
}
type ResponseBody = Blob | string | Record<string, any> | FormData | null;
type RequestBody = Record<string, any> | FormData | undefined;
type AjaxResourceResponse<R, A> = AjaxResponse<ResourceResponse<R, A>>;
type AjaxPaginatedResponse<R, A> = AjaxResponse<PaginatedResponse<R, A>>;
type AjaxValidationErrorResponse = {
    message: string;
    errors: {
        [key: string]: string[];
    }
}
export class Ajax
{
    private url: string;
    private method: Method;
    private headers: Record<string, string> = {
        'X-Requested-With': 'XMLHttpRequest',
    }
    private options: Options;

    constructor(uri: string, method: Method, options?: Options)
    {
        this.url = `${import.meta.env.VITE_API_BASE_URL}${uri}`;
        this.method = method;
        this.options = options ? options : {};
        let token = this.getToken();
        this.setAuthorizationHeader(token, 'Bearer');
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
    public setOption(key: keyof Options, value: any): Ajax
    {
        this.options[key] = value;
        return this;
    }

    private getToken(): string
    {
        try {
            return user.get('access_token');
        } catch (error) {
            if (!(error instanceof InternalError)) throw error;
            return '';
        }
    }

    public async send(responseType: 'text', data?: RequestBody): Promise<AjaxResponse<string>>;
    public async send(responseType: 'none', data?: RequestBody): Promise<AjaxResponse<null>>;
    public async send<R, A = object>(responseType: 'json', data?: RequestBody): Promise<AjaxResourceResponse<R, A>>;
    public async send<R, A = object>(responseType: 'paginate', data?: RequestBody): Promise<AjaxPaginatedResponse<R, A>>;
    public async send(responseType: 'blob', data?: RequestBody): Promise<AjaxResponse<Blob>>;
    public async send(responseType: ResponseType, data?: RequestBody): Promise<AjaxResponse<ResponseBody>>
    {
        const ajaxResponse: AjaxResponse<ResponseBody> = {
            response: new Response,
            body: null,
        }
        try {
            const requestBody = this.handleRequestBody(data);
            const response = await fetch(this.url, {
                method: this.method,
                headers: this.headers,
                body: requestBody,
            });
            if (!response.ok) {
                if (response.status === 422) {
                    const responseErrors: AjaxValidationErrorResponse = await response.json();
                    errors.set(responseErrors.errors);
                    messages.error('Você tem um ou mais campos para serem verificados')
                } else if (response.status === 401) {
                    messages.error(this.options.unauthenticatedMessage ?? 'Você precisa se identificar para acessar esse recurso');
                    user.clean();
                    goto('/login');
                } else if (response.status === 403) {
                    messages.error('Você não tem permissão para acessar o recurso selecionado');
                    goto('/admin/perfil');
                } else {
                    const errorMessageDetail: string | undefined = (await response.json()).message;
                    messages
                        .error(`<b>ERRO ${response.status}: </b> ${response.statusText}`)
                        .error(errorMessageDetail);
                    console.error(`ERRO ${response.status}: ${response.statusText}`);
                    if (errorMessageDetail) console.error(errorMessageDetail);
                }
                ajaxResponse.error = `ERRO ${response.status}: ${response.statusText}`;
                ajaxResponse.body = null;
            } else {
                if (!this.options.preserveErrors) errors.set({});
                const responseBody = await this.handleResponseBody(response, responseType);
                ajaxResponse.body = responseBody
            }
            ajaxResponse.response = response;
            const jsonUser = response.headers.get('App-Current-User');
            if (jsonUser) {
                const currentUser: CurrentUserUpdate = JSON.parse(jsonUser);
                user.update(currentUser);
            }
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
        if (this.options.convertToFormData) {
            if (!(data instanceof FormData) && data) {
                body = new FormData;
                for (const key in data) {
                    if (Array.isArray(data[key])) {
                        for (const value of data[key]) {
                            body.append(`${key}[]`, value);
                        }
                    } else {
                        body.append(key, data[key] ?? '');
                    }
                }
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