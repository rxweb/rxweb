import { Injectable, Inject } from "@angular/core"
import { Http, Response, RequestOptions } from "@angular/http"
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';


import { AuthorizeApi } from '../security/security.models';
import { RequestHeaders, ResponseResult, LookupAction } from './rxhttp.interface'

import { RequestQueryParams } from './rxhttp.models'
import { ApplicationConfiguration } from "@rx/core";

export const API_HOST_URI: string = 'API_URL';

export const APP_VERSION: string = "";

@Injectable()
export class RxHttp {

    constructor(private http: Http,
        @Inject(API_HOST_URI) private hostUri: string,
        @Inject(APP_VERSION) private appVersion: string,
        @Inject('RequestHeaders') private requestHeaders: RequestHeaders,
        @Inject('ResponseResult') private responseResult: ResponseResult,
        private requestOptions: RequestOptions
    ) { }

    group<T>(url: string | AuthorizeApi, params: any[] | {
        [key: string]: any;
    } | RequestQueryParams, propName: string, lookups: LookupAction[]): Promise<T> {
        let uri;
        let moduleId;
        let authorizeApi: AuthorizeApi = <AuthorizeApi>url
        if (authorizeApi.api) {
            var aObject: any = {};
            for (var col in authorizeApi) {
                aObject[col] = authorizeApi[col];
            }
            uri = aObject.api = this.makeUri(authorizeApi.api, params);
        }
        else
            uri = this.makeUri(<string>url, params);
        var isLookupFinished = false;
        var isRequestFinished = false;
        var jObject: {
            [key: string]: any;
        } = {};
        let promise = new Promise<T>((resolve, reject) => {
            this.makeGetRequest(uri, aObject).subscribe((t: any) => {
                if (isLookupFinished) {
                    jObject[propName] = t;
                    resolve(<T>jObject);
                } else {
                    isRequestFinished = true;
                    jObject[propName] = t;
                }
            });

            this.lookup<T>(lookups).then(response => {
                if (isRequestFinished) {
                    response[propName] = jObject[propName];
                    resolve(<T>response);
                } else {
                    isLookupFinished = true;
                    jObject = response;
                }
            })
        })
        return promise;
    }


    lookup<T>(lookups: LookupAction[]): Promise<T> {
        let jObject = {};
        let promise = new Promise<T>((resolve, reject) => {
            for (let lookup of lookups) {
                let lookupUri = '';
                if (lookup.cacheOption.isVersionBase)
                    lookupUri = `api/${lookup.controllerName}lookups/${lookup.actionName}/?_=${this.appVersion}`;
                else {
                    if (lookup.cacheOption.tableName) {
                        var keyId = ApplicationConfiguration.getCacheKey(`${lookup.cacheOption.tableName}`)
                        var params = "";
                        if (lookup.params) {
                            for (var col in lookup.params) {
                                params += `${col}=${lookup.params[col]}&`
                            }
                        }
                        lookupUri = `api/${lookup.controllerName}lookups/${lookup.actionName}/?${params}_=${keyId}`;
                    } else {
                        lookupUri = `api/${lookup.controllerName}lookups/${lookup.actionName}`;
                    }
                }
                this.makeGetRequest(lookupUri).subscribe((t: any) => {
                    this.lookupResponse(t, lookup, lookups, jObject, resolve);
                });
            }
        });
        return promise;
    }


    filterLookup<T>(lookup:LookupAction,filterParameters:any[],queryParams?: {[key:string]:any}):Observable<T> {
        return this.lookupRequest([lookup.controllerName,lookup.actionName],filterParameters,queryParams);
    }


    lookupRequest<T>(requestedUri: any[], additionalParameters: any[], queryParams?: { [key: string]: any }, showSpinner: boolean = true): Observable<T> {
      let uri = "";
      let keyId = '';
      if (typeof requestedUri[2] == "string") {
        keyId = ApplicationConfiguration.getCacheKey(`${requestedUri[2]}`)
      } else {
        keyId = this.appVersion;
      }
      uri = "".concat("api/", requestedUri[0], "lookups", "/", requestedUri[1]);
      additionalParameters.forEach(t => {
        uri += "/" + t;
      });
      
      if (queryParams) {
        uri += "".concat("?_=", keyId);
        for (var col in queryParams)
          uri += "&&".concat(col, "=", queryParams[col])
      }else
          uri += "".concat("?_=", keyId);
      return this.get(uri, undefined, showSpinner);
    }

    private lookupResponse<T>(response: any,
        lookupAction: LookupAction,
        lookupActions: LookupAction[],
        jObject: {
            [key: string]: any;
        },
        resolve: any
    ) {
        if (lookupAction.storeProcPropName)
            jObject[lookupAction.cacheOption.tableName] = response;
        else
            jObject[lookupAction.actionName] = response;
        var indexOf = lookupActions.indexOf(lookupAction);
        if (indexOf !== -1)
            lookupActions.splice(indexOf, 1);
        if (lookupActions.length === 0)
            resolve(<T>jObject);
    }

    get<T>(url: string | AuthorizeApi, params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams, showSpinner: boolean = true): Observable<T> {
        var requestType = 'GET'
        let uri = '';
        let moduleId: number;
        let authorizeApi: AuthorizeApi = <AuthorizeApi>url
        var jObject: any = undefined;
        if (authorizeApi.api) {
            jObject = {};
            uri = authorizeApi.api;
            for (var col in authorizeApi) {
                jObject[col] = authorizeApi[col];
            }
            uri = jObject.api = (params) ? this.makeUri(jObject.api, params) : jObject.api;
        } else {
            uri = <string>url;
            uri = (params) ? this.makeUri(uri, params) : uri;
        }
        return this.makeGetRequest<T>(uri, jObject, showSpinner);
    }

    private makeRequestParam(url: string, params: RequestQueryParams) {
        var uri = this.makeUri(url, params.ids);
        uri = this.makeUri(uri, params.queryString);
        return uri;
    }

    private makeUri(url: string, params?: any[] | {
        [key: string]: any;
    } | RequestQueryParams): string {
        let requestUri = '';
        if (params instanceof Array) {
            requestUri = requestUri.concat(url, "/", (<any[]>params).join("/"));
        } else if ((<any>params).ids) {
            requestUri = this.makeRequestParam(url, <RequestQueryParams>params)
        }
        else if (params instanceof Object) {
            requestUri = requestUri.concat(url, '/?');
            let propNames = Object.getOwnPropertyNames(params);
            let andSign: string = '';
            for (let key of propNames) {
                requestUri = requestUri.concat(andSign, key, '=', params[key])
                andSign = '&';
            }
        }
        return requestUri;
    }

    private makeGetRequest<T>(url: string | AuthorizeApi, moduleId?: AuthorizeApi, showSpinner: boolean = true): Observable<T> {
        let authorizeApi;
        if (moduleId)
          authorizeApi = moduleId
        var options = this.getOptions(authorizeApi || url, 'GET', undefined, showSpinner);
        if (options.options)
            return this.http.get(options.uri, options.options)
                .map(
                (response: Response) => {
                    return this.requestResponse<T>(response, 'GET', null)
                }

                ).catch(error => this.handleError(error, 'GET', null));
    }

    makePatchBody(object: Object): any {
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
    getOptions(url: string | AuthorizeApi, type: string, moduleId?: string, showSpinner: boolean = true) {
        let uri;
        let options;
        let authorizeApi: AuthorizeApi = <AuthorizeApi>url
        if (authorizeApi.api) {

            uri = this.hostUri.concat(authorizeApi.api);
            options = this.requestHeaders.get(uri, type, authorizeApi, showSpinner);
        }
        else {
            uri = <string>url;
            uri = this.hostUri.concat(uri);
            options = this.requestHeaders.get(uri, type, undefined,showSpinner);
        }
        return { options: options, uri: uri };
    }
    search<T>(url: string | AuthorizeApi, jObject: Object, showToast?: boolean): Observable<T> {
      let options = this.getOptions(url, 'POST');
        jObject = { "query": JSON.stringify(jObject) };
        if (options.options)
            return this.http.post(
                options.uri.concat('/search'), JSON.stringify(jObject), options.options
            ).map(
                (response: Response) => {
                    return this.requestResponse<T>(response, 'POST', showToast)
                }
                ).catch(error => this.handleError(error, 'POST', showToast));
    }

    post<T>(url: string | AuthorizeApi, jObject: Object, showToast?: boolean): Observable<T> {
        let options = this.getOptions(url, 'POST');
        if (options.options)
            return this.http.post(
                options.uri, JSON.stringify(jObject), options.options
            ).map(
                (response: Response) => {
                    return this.requestResponse<T>(response, 'POST', showToast)
                }
                ).catch(error => this.handleError(error, 'POST', showToast));
    }

    put<T>(url: string | AuthorizeApi, jObject: Object, showToast?: boolean): Observable<T> {
        var authorizeApi: AuthorizeApi = <AuthorizeApi>url;
        var options;
        if (authorizeApi.api) {
            if (authorizeApi.keys) {
                authorizeApi.mainRecordId = ''
                authorizeApi.keys.forEach(t => {
                    authorizeApi.mainRecordId += jObject[t] + '/';
                });
            } else {
                authorizeApi.mainRecordId = jObject[authorizeApi.keyName];
            }
            options = this.getOptions(authorizeApi, 'GET');
        } else {
            options = this.getOptions(url, 'PUT');
        }
        if (options.options) {
            var finalUri = "";
            if (authorizeApi.mainRecordId) {
                finalUri = finalUri.concat(options.uri, "/", String(authorizeApi.mainRecordId));
            } else {
                finalUri = options.uri;
            }

            return this.http.put(
                finalUri, JSON.stringify(jObject), options.options
            ).map(
                (response: Response) => {
                    return this.requestResponse<T>(response, 'PUT', showToast)
                }
                ).catch(error => this.handleError(error, 'PUT', showToast));
        }

    }

    patch<T>(url: string | AuthorizeApi, id: any, jObject: Object, showToast?: boolean): Observable<T> {
        let options = this.getOptions(url, 'PATCH');
        if (options.options)
            return this.http.patch(
                options.uri.concat("/", id), JSON.stringify(this.makePatchBody(jObject)), options.options
            ).map(
                (response: Response) => {
                    return this.requestResponse<T>(response, 'PATCH', showToast)
                }
                ).catch(error => this.handleError(error, 'PATCH', showToast));
    }

    delete<T>(url: string | AuthorizeApi, id: any, parentId?: any, showToast?: boolean): Observable<T> {
        let uri;
        var authorizeApi: AuthorizeApi = <AuthorizeApi>url;
        let options;
        if (authorizeApi.api) {
            var authorize: AuthorizeApi = {
                api: authorizeApi.api.concat("/", id),
                mainRecordId: id,
                applicationModuleId: authorizeApi.applicationModuleId,
                childModuleName: authorizeApi.childModuleName,
                keyName: authorizeApi.keyName
            };
            options = this.getOptions(authorize, 'DELETE');
        }
        else {
            var api = <string>url;
            uri = api.concat("/", id);
            options = this.getOptions(uri, 'DELETE');
        }
        if (options.options)
            return this.http.delete(
                options.uri, options.options
            ).map(
                (response: Response) => {
                    return this.requestResponse<T>(response, 'DELETE', showToast)
                }
                ).catch(error => this.handleError(error, 'DELETE', showToast));
    }

    private requestResponse<T>(response: Response, requestMethod: string, showToast: boolean): T {
        var result: any = "";
        if (this.responseResult.check(response, requestMethod, showToast)) {
            return response.status == 200 ? <T>response.json() : result;
        };
        return result;
    }

    private handleError(error: any, requestMethod: string, showToast: boolean) {
        if (this.responseResult.check(error, requestMethod, showToast)) {
            if (error.status == 400) {
                error = <{
                    [key: string]: any;
                }>error.json();
                return Observable.throw(error);
            } else {
                error = <{
                    [key: string]: any;
                }>error.json();
                this.responseResult.error(error)
                return Observable.throw(error);
            }

        }
    }
}
