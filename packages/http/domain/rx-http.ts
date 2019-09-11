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
        let filters = this._baseConfig.filters || [];
        let filterService = this._serviceContainers.filter(t => t.type == "filter")[0];
        let requestFilters = [];
        if (filterService)
            filterService.config.forEach(t => requestFilters.push(t));
        filters.forEach(t => requestFilters.push(t));
        return requestFilters;
    }

    private getInMemoryFilter(): XhrFilterConfig {
        let inMemory = this._serviceContainers.filter(t => t.type == "inmemory")[0];
        if (inMemory)
            return this._baseConfig.filters.filter(t => t.isInMemory)[0];
        return null;
    }

    private request(method: string, config: HttpRequestConfig | HttpRequestBodyConfig): RxHttpResponse {
        if (!this._baseConfig)
            this._baseConfig = httpRequestContainer.getConfig();
        if (!this._serviceContainers)
            this._serviceContainers = getInstanceContainer(this);
        let serviceContainer = this._serviceContainers.filter(t => t.type == "http")[0]
        let request = requestBody(method,this._baseConfig, serviceContainer, config, this);
        return (request) ? new RxHttpResponse(request, this.getFilters(), this.getInMemoryFilter(), this.onError || this._baseConfig.onError,this.badRequest) : null;
    }

    lookup<T>(configs: LookupHttpRequestConfig[]): Observable<T> {
        return new Observable(subscriber => {
            let propNames: string[] = [];
            let subscriptions: Subscription[] = [];
            configs.forEach(t => {
                propNames.push(t.propName);
                subscriptions.push(this.get(t).send().subscribe());
            });
            forkJoin(subscriptions).subscribe(t => {
                let jObject:any = {};
                propNames.forEach((x, i) => {
                    jObject[x] = t[i];
                })
                subscriber.next(jObject);
                subscriber.complete();
            })
        });
    }


    get(config?: HttpRequestConfig): RxHttpResponse {
        return this.request('GET', config);
    }

    post(config: HttpRequestBodyConfig): RxHttpResponse {
        return this.request('POST', config);
    }

    put(config: HttpRequestBodyConfig): RxHttpResponse {
        return this.request('PUT', config);
    }

    patch(config: HttpRequestBodyConfig): RxHttpResponse {
        return this.request('PATCH', config);
    }

    delete(config: HttpRequestBodyConfig): RxHttpResponse {
        return this.request('DELETE', config);
    }
}