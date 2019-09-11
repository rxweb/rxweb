import { List, Enumerator } from "@rxweb/generics";
import { XhrFilterConfig } from "../interface/xhr-filter-config";
import { XhrRequest } from "./xhr-request";
import { Observable } from 'rxjs';
import { ResponseFilter } from "../interface/response-filter";
import { createInstance } from "../functions/create-instance";
import { HttpRequest, HttpResponse,XhrContext } from '../models'

export class RxHttpResponse {
    private _index: number = 0;
    private _onSuccess: Function;
    private _onResponse: ResponseFilter[] = new Array<ResponseFilter>();

    constructor(private request: HttpRequest, private filters: XhrFilterConfig[], private inMemoryFilter: XhrFilterConfig, private onError: (response: HttpResponse) => void,private badRequest:(result:any)=>void) {

    }

    toList<T>(success: (result: List<T>, response?: HttpResponse) => void, model?: T): void {
        this.process('toList', model, success);
    }

    asEnumerable<T>(success: (result: List<T>, response?: HttpResponse) => void, model?: T): void {
        this.process('asEnumerable', model, success);
    }

    send<T>(): Observable<T> {
        return new Observable(subscriber => {
            this.process('subscribe', null, subscriber);
        })
    }

    private process(type: string, model?: any, success?: any) {
        this._onSuccess = this.onComplete(type, model, success);
        this.inMemoryFilter ? this.callFilter(this.inMemoryFilter) : this.executeFilterOnRequest()
    }


    private executeFilterOnRequest() {
        if (this.filters && this.filters.length > 0 && this.filters.length > this._index) {
            this.callFilter(this.filters[this._index])
        } else
            new XhrRequest(this.request, this._onSuccess, this.onError, this.badRequest);
    }

    private callFilter(filterConfig: XhrFilterConfig) {
        let modelInstance = createInstance(filterConfig.model, filterConfig.args) as any ;
        modelInstance.onRequestExecuting = this.onRequestExecuting()
        this._index++;
        modelInstance.onRequest(new XhrContext(this.request, new HttpResponse()));
        if (modelInstance["onResponse"])
            this._onResponse.push(modelInstance);
    }

    private onComplete(resultType: string, model: any, onSuccess: any) {
        return (response: HttpResponse) => {
            if (this._onResponse.length > 0 && !response.isInMemoryResponse)
                this._onResponse.forEach(t => t.onResponse(response))

            let result = null;
            switch (resultType) {
                case "toList":
                    result = new List(response.body, model);
                    break;
                case 'asEnumerable':
                    result = new Enumerator(model, response.body);
                    break;
                default:
                    result = response.body;
                    break;
            }
            if (resultType !== 'subscribe')
                onSuccess(result, response);
            else {
                onSuccess.next(response.body);
                onSuccess.complete();
            }
        }
    }

    onRequestExecuting = () => {
        return (context: XhrContext) => {
            if (context.response.statusCode) {
                let response = { ...context.response, ...{ body: context.result } }
                if (response.statusCode >= 200 && response.statusCode < 300)
                    this._onSuccess(response);
                else
                    this.onError(response);
            } else
                this.executeFilterOnRequest()
        }
    }

}