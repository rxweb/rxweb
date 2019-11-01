import { HttpRequestConfig} from "../interface/http-request-config";
import { requestBody } from "../functions/request-body";
import { getInstanceContainer } from "../functions/get-instance-container";
import { ServiceContainerConfig } from "../interface/service-container-config";
import { RxHttpResponse } from "./rx-http-response";
import { httpRequestContainer } from "../core/http-request-container";
import { XhrFilterConfig } from "../interface/xhr-filter-config";
import { Observable, forkJoin , Subscription } from "rxjs";
import { BaseHttpClientConfig } from "../interface/base-http-client-config";
import { HttpRequestBodyConfig } from "../interface/http-request-body-config";
import { LookupHttpRequestConfig } from "../interface/lookup-http-request-config";
import { HttpResponse } from '../models'
export class RxHttp {

    path: string;

    private _serviceContainers: ServiceContainerConfig[]
    private _baseConfig: BaseHttpClientConfig;

    onError: (response: HttpResponse) => void;
    badRequest: (result: any) => void;

    constructor() {

    }

    private getFilters() {
        let filters = (this._baseConfig && this._baseConfig.filters) ? this._baseConfig.filters : [];
        let filterService = this._serviceContainers.filter(t => t.type == "filter")[0];
        let requestFilters = [];
        if (filterService)
            filterService.config.forEach(t => requestFilters.push(t));
        filters.forEach(t => requestFilters.push(t));
        return requestFilters;
    }

    private getInMemoryFilter(): XhrFilterConfig {
        let inMemory = this._serviceContainers.filter(t => t.type == "inmemory")[0];
        if (inMemory && this._baseConfig && this._baseConfig.filters)
            return this._baseConfig.filters.filter(t => t.isInMemory)[0];
        return null;
    }

    private request<T>(method: string, config: HttpRequestConfig | HttpRequestBodyConfig | string): Observable<T> {
        return new Observable(subscriber => {
            if (!this._baseConfig)
                this._baseConfig = httpRequestContainer.getConfig() || {};
            if (!this._serviceContainers)
                this._serviceContainers = getInstanceContainer(this);
            let serviceContainer = this._serviceContainers.filter(t => t.type == "http")[0]
            let request = requestBody(method, this._baseConfig, serviceContainer, config, this);
            if (request) {
                let error = this._baseConfig ? this._baseConfig.onError : null;
                let response = new RxHttpResponse(request, this.getFilters(), this.getInMemoryFilter(), this.onError || error, this.badRequest);
                response.process('subscribe', subscriber);
            } else {
                subscriber.next(null);
                subscriber.complete();
            }
        })
    }

    lookup<T>(configs: LookupHttpRequestConfig[]): Observable<T> {
        return new Observable(subscriber => {
            let propNames: string[] = [];
            let subscriptions: Observable<T>[] = [];
            configs.forEach(t => {
                propNames.push(t.propName);
                subscriptions.push(this.get(t));
            });
            forkJoin(subscriptions).subscribe(t => {
                let jObject: any = {};
                propNames.forEach((x, i) => {
                    jObject[x] = t[i];
                })
                subscriber.next(jObject);
                subscriber.complete();
            })
        });
    }


    get<T>(config?: HttpRequestConfig | string): Observable<T>  {
        return this.request('GET', config);
    }

    post<T>(config: HttpRequestBodyConfig | string): Observable<T>  {
        return this.request('POST', config);
    }

    put<T>(config: HttpRequestBodyConfig | string): Observable<T> {
        return this.request('PUT', config);
    }

    patch<T>(config: HttpRequestBodyConfig | string): Observable<T>  {
        return this.request('PATCH', config);
    }

    delete<T>(config: HttpRequestBodyConfig | string): Observable<T>  {
        return this.request('DELETE', config);
    }
}