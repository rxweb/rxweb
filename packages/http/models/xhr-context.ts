import { HttpRequest } from './http-request';
import { HttpResponse } from './http-response';
export class XhrContext {
    private _result: any;
    constructor(public request: HttpRequest, public response: HttpResponse) {
        if (!this.response)
            this.response = new HttpResponse();
    }

    set result(value: any) {
        this._result = value;
        this.response.isInMemoryResponse = true;
    }
    get result() {
        return this._result;
    }
}