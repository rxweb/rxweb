import { XhrFilterConfig } from "../interface/xhr-filter-config";
import { XhrRequest } from "./xhr-request";
import { ResponseFilter } from "../interface/response-filter";
import { createInstance } from "../functions/create-instance";
import { HttpRequest, HttpResponse, XhrContext } from '../models'

export class RxHttpResponse {
    private _index: number = 0;
    private _onSuccess: Function;
    private _onError: any;
    private _onResponse: ResponseFilter[] = new Array<ResponseFilter>();

    constructor(private request: HttpRequest, private filters: XhrFilterConfig[], private inMemoryFilter: XhrFilterConfig, private onError: (response: HttpResponse) => void, private badRequest: (result: any) => void) {

    }


    process(type: string, success?: any) {
        this._onSuccess = this.onComplete(type, success);
        this._onError = success;
        this.inMemoryFilter ? this.callFilter(this.inMemoryFilter) : this.executeFilterOnRequest()
    }


    private executeFilterOnRequest() {
        if (this.filters && this.filters.length > 0 && this.filters.length > this._index) {
            this.callFilter(this.filters[this._index])
        } else
            new XhrRequest(this.request, this._onSuccess, this.onRequestError.bind(this), this.badRequest);
    }

    private callFilter(filterConfig: XhrFilterConfig) {
        if (!filterConfig.runsOn || filterConfig.runsOn.indexOf(this.request.method) != -1) {
            let modelInstance = createInstance(filterConfig.model, filterConfig.args || []) as any;
            modelInstance.onRequestExecuting = this.onRequestExecuting()
            this._index++;
            modelInstance.onRequest(new XhrContext(this.request, new HttpResponse()));
            if (modelInstance["onResponse"])
                this._onResponse.push(modelInstance);
        } else
            this._index++;

    }

    private onComplete(resultType: string, onSuccess: any) {
        return (response: HttpResponse) => {
            if (this._onResponse.length > 0 && !response.isInMemoryResponse)
                this._onResponse.forEach(t => t.onResponse(response))
            onSuccess.next(response.body);
            onSuccess.complete();
        }
    }

    onRequestExecuting = () => {
        return (context: XhrContext) => {
            if (context.response.statusCode) {
                let response = { ...context.response, ...{ body: context.result } }
                if (response.statusCode >= 200 && response.statusCode < 300)
                    this._onSuccess(response);
                else {
                    this._onError.error(response);
                    this.onError(response);
                }

            } else
                this.executeFilterOnRequest()
        }
    }

    onRequestError(response: any) {
        this._onError.error(response);
        if (this.onError)
            this.onError(response);
    }

}