import { HttpRequest, HttpResponse} from '../models'
import { extractHeaders } from "../functions/util";

export class XhrRequest {
    xhr: XMLHttpRequest;

    constructor(private request: HttpRequest, private onComplete: Function, private onRequestError: Function, private badRequest: Function) {
        let xhr = new XMLHttpRequest();
        xhr.open(request.method, request.fullPath);
        Object.keys(request.headers).forEach(t => xhr.setRequestHeader(t, request.headers[t]));

        if (!request.headers['Accept'])
            xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');

        if (!request.headers['Content-Type']) {
            const contentType = request.getContentType();
            if (contentType !== null) {
                xhr.setRequestHeader('Content-Type', contentType);
            }
        }

        xhr.addEventListener('load', this.onLoad);
        xhr.addEventListener('error', this.onError);
        xhr.send(request.serializeBody());

        this.xhr = xhr;
    }

    onLoad = () => {
        let response = new HttpResponse();
        response.statusCode = this.xhr.status
        response.statusText = this.xhr.statusText || 'OK';
        response.headers = extractHeaders(this.xhr.getAllResponseHeaders())
        response.responseUrl = this.xhr.responseURL;
        let body: any = null;

        if (response.statusCode !== 204)
            body = typeof this.xhr.response === 'undefined' ? this.xhr.responseText : this.xhr.response;

        if (response.statusCode === 0)
            response.statusCode = !!body ? 200 : 0;

        let isSuccess = response.statusCode >= 200 && response.statusCode < 300;

        if (this.request.responseType === 'json' && typeof body === 'string') {
            const originalBody = body;
            body = body.replace(/^\)\]\}',?\n/, '');
            try {
                body = body !== '' ? JSON.parse(body) : null;
            } catch (ex) {
                body = originalBody;
                if (isSuccess) {
                    isSuccess = false;
                    body = { ex, body: body }
                }
            }
        }
        response.body = body;
        if (isSuccess)
            this.onComplete(response)
        else
            this.onRequestError(response);
        this.dispose();
    }

    onError = (error) => {
        if (this.xhr.status == 400 && this.badRequest)
            this.badRequest(typeof this.xhr.response === 'undefined' ? this.xhr.responseText : this.xhr.response)
        else
            this.onRequestError({
                responseUrl: this.xhr.responseURL,
                error: error,
                statusCode: this.xhr.status || 0,
                statusText: this.xhr.statusText || 'Unknown Error'
            });
        this.dispose();
    }


    dispose() {
        this.xhr.removeEventListener('load', this.onLoad);
        this.xhr.removeEventListener('error', this.onError);
        this.xhr = null;
        this.request = null;
        this.onComplete = null;
        this.onRequestError = null;
        this.badRequest = null;
    }
}