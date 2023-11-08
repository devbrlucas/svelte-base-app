import { user } from "../auth";
import { errors } from "../form/errors";
import { messages } from "../messages";
import { InternalError } from "../errors";
import { goto } from "$app/navigation";
export class Ajax {
    url;
    method;
    headers = {
        'X-Requested-With': 'XMLHttpRequest',
    };
    options;
    constructor(uri, method, options) {
        this.url = `${import.meta.env.VITE_API_BASE_URL}${uri}`;
        this.method = method;
        this.options = options ? options : {};
        let token = this.getToken();
        this.setAuthorizationHeader(token, 'Bearer');
        this.initLoadIcon();
    }
    static get(uri, options) {
        return new Ajax(uri, 'GET', options);
    }
    static post(uri, options) {
        return new Ajax(uri, 'POST', options);
    }
    static put(uri, options) {
        return new Ajax(uri, 'PUT', options);
    }
    static patch(uri, options) {
        return new Ajax(uri, 'PATCH', options);
    }
    static delete(uri, options) {
        return new Ajax(uri, 'DELETE', options);
    }
    static head(uri, options) {
        return new Ajax(uri, 'HEAD', options);
    }
    setHeader(key, value) {
        this.headers[key] = value;
        return this;
    }
    setAuthorizationHeader(value, type = 'Bearer') {
        return this.setHeader('Authorization', `${type} ${value}`);
    }
    setOption(key, value) {
        this.options[key] = value;
        return this;
    }
    getToken() {
        try {
            return user.get('access_token');
        }
        catch (error) {
            if (!(error instanceof InternalError))
                throw error;
            return '';
        }
    }
    async send(responseType, data) {
        const ajaxResponse = {
            response: new Response,
            body: null,
        };
        try {
            const requestBody = this.handleRequestBody(data);
            const response = await fetch(this.url, {
                method: this.method,
                headers: this.headers,
                body: requestBody,
            });
            if (!response.ok) {
                if (response.status === 422) {
                    const responseErrors = await response.json();
                    errors.set(responseErrors.errors);
                    messages.error('Você tem um ou mais campos para serem verificados');
                }
                else if (response.status === 401) {
                    messages.error(this.options.unauthenticatedMessage ?? 'Você precisa se identificar para acessar esse recurso');
                    user.clean();
                    goto('/login');
                }
                else if (response.status === 403) {
                    messages.error('Você não tem permissão para acessar o recurso selecionado');
                    goto('/admin/perfil');
                }
                else {
                    const errorMessageDetail = (await response.json()).message;
                    messages
                        .error(`<b>ERRO ${response.status}: </b> ${response.statusText}`)
                        .error(errorMessageDetail);
                    console.error(`ERRO ${response.status}: ${response.statusText}`);
                    if (errorMessageDetail)
                        console.error(errorMessageDetail);
                }
                ajaxResponse.error = `ERRO ${response.status}: ${response.statusText}`;
                ajaxResponse.body = null;
            }
            else {
                if (!this.options.preserveErrors)
                    errors.set({});
                const responseBody = await this.handleResponseBody(response, responseType);
                ajaxResponse.body = responseBody;
            }
            ajaxResponse.response = response;
            const jsonUser = response.headers.get('App-Current-User');
            if (jsonUser) {
                const currentUser = JSON.parse(jsonUser);
                user.update(currentUser);
            }
        }
        catch (error) {
            messages.error(String(error));
            ajaxResponse.error = String(error);
        }
        finally {
            this.stopLoadingIcon();
        }
        return ajaxResponse;
    }
    initLoadIcon() {
        const div = document.createElement('div');
        div.setAttribute('aria-hidden', 'true');
        div.setAttribute('id', 'loading-icon');
        document
            .body
            .appendChild(div);
    }
    stopLoadingIcon() {
        document
            .querySelector('#loading-icon')
            ?.remove();
    }
    handleRequestBody(data) {
        let body = undefined;
        if (this.options.convertToFormData) {
            if (!(data instanceof FormData) && data) {
                body = new FormData;
                for (const key in data) {
                    if (Array.isArray(data[key])) {
                        for (const value of data[key]) {
                            body.append(`${key}[]`, value);
                        }
                    }
                    else {
                        body.append(key, data[key] ?? '');
                    }
                }
            }
        }
        else if (data && !(data instanceof FormData)) {
            this.headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }
        return body;
    }
    async handleResponseBody(response, responseType) {
        let responseBody;
        switch (responseType) {
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
