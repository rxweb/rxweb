import { isFormData, isBlob, isArrayBuffer } from "../functions/util";
import { createQueryPath } from "../functions/request-body";

export class HttpRequest {
    constructor(
        public body: any,
        public headers: { [key: string]: any },
        public host: string,
        isHttps: boolean,
        public method: string,
        public path: string,
        public params: any[],
        public queryParams: { [key: string]: any },
        public responseType: string,
        public scheme: string,
        fullPath?: string,
    ) {
        if (!responseType)
            this.responseType = 'json';
        this.isHttps = isHttps;
        if (fullPath)
            this.fullPath = fullPath;
    }
    private _isHttps: boolean;

    private _fullPath: string;

    get isHttps() {
        return this._isHttps;
    }

    set isHttps(value: boolean) {
        this._isHttps = value;
        if (value)
            this.fullPath = this.fullPath.replace("http:", "https:");
    }

    get fullPath() {
        return this._fullPath ? this.fullPath : `${this.host}/${this.path}${createQueryPath({ params: this.params, queryParams: this.queryParams })}`;
    }

    set fullPath(value) {
        this._fullPath = value;
    }

    getContentType() {

        if (this.body === null) {
            return null;
        }

        if (isFormData(this.body)) {
            return null;
        }

        if (isBlob(this.body)) {
            return this.body.type || null;
        }
        if (isArrayBuffer(this.body)) {
            return null;
        }

        if (typeof this.body === 'string') {
            return 'text/plain';
        }

        if (typeof this.body === 'object' || typeof this.body === 'number' ||
            Array.isArray(this.body)) {
            return 'application/json';
        }
        return null;
    }

    serializeBody(): string {
        if (this.body === null) {
            return null;
        }

        if (isArrayBuffer(this.body) || isBlob(this.body) || isFormData(this.body) ||
            typeof this.body === 'string') {
            return this.body;
        }
        if (this.method == 'PATCH')
            this.body = this.convertPatchBody(this.body);

        if (typeof this.body === 'object' || typeof this.body === 'boolean' ||
            Array.isArray(this.body)) {
            return JSON.stringify(this.body);
        }
        if (this.body)
            return String(this.body);
        return '';
    }

    private convertPatchBody(object: Object): any {
        let patchBody = [];
        for (var col in object) {
            patchBody.push({
                'op': 'replace',
                'path': '/' + col,
                'value': object[col]
            });
        }
        return patchBody;
    }
}