import fetch        from 'isomorphic-fetch';
import queryString  from 'query-string';
import FormData     from 'form-data';

export default class ApiClient {
    constructor({ prefix = 'api/v1' } = {}) {
        this.prefix = prefix;
    }

    get(requestUrl, payload = {}, params = {}, jwt = '') {
        return this.request({
            url: requestUrl,
            method: 'get',
            body: payload,
            params,
            jwt
        });
    }

    put(requestUrl, payload = {}, jwt = '') {
        return this.request({
            url: requestUrl,
            method: 'put',
            body: payload,
            jwt
        });
    }

    post(requestUrl, payload = {}, jwt = '') {
        return this.request({
            url: requestUrl,
            method: 'post',
            body: payload,
            jwt
        });
    }

    delete(requestUrl, jwt = '') {
        return this.request({
            url: requestUrl,
            method: 'delete',
            jwt
        });
    }

    async request({ url, method, params = {}, body, jwt }) {
        const urlWithQuery = `${url}?${queryString.stringify(params)}`;
        const init = body instanceof FormData
            ? this._makeFormDataRequest(method, body, jwt)
            : this._makeJsonRequest(method, body, jwt);

        try {
            const res = await fetch(`${this.prefix}/${urlWithQuery}`, init);

            if (res.status >= 400) {
                throw new Error('Bad response from server');
            }

            const data = await res.json();

            return data;
        } catch (error) {
            console.error(error);

            return {
                Status: 0,
                Message: error.message,
                Error: {}
            };
        }
    }

    _makeJsonRequest(method, body, jwt) {
        const init = {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        };

        if (jwt) {
            init.headers.Authorization = jwt;
        }

        if (method !== 'get' && method !== 'head') {
            init.body = JSON.stringify(body);
        }

        return init;
    }

    _makeFormDataRequest(method, body, jwt) {
        const init = {
            method,
            body,
            headers: {
                'Accept': 'application/json'
            }
        };

        if (jwt) {
            init.headers.Authorization = jwt;
        }

        return init;
    }
}
