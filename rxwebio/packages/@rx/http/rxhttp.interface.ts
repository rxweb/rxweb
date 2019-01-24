import {Http, Response,RequestOptions } from "@angular/http"
import { Observable } from 'rxjs/Observable';
import { AuthorizeApi } from '../security/security.models';

export interface LookupAction {
    controllerName: string;
    actionName: string;
    storeProcPropName?: string;
    params?: any;
    cacheOption:any;
}

export interface LookupCacheOption {
    isVersionBase: boolean;
    tableName?: string;
}


export interface ODataRequest {
    request<T>(url: string): Observable<T>;
}

export interface ResponseResult {
    check: (response: Response, requestMethod?: string, showToast?: boolean) => boolean;
    error: (message: string) => void;
}

export interface RequestHeaders {
    get: (url: string, requestMethod?: string, authorizeApi?: AuthorizeApi, showSpinner?: boolean) => RequestOptions;
}


export interface ODataQuery extends ODataRequest {
    top(number: number): ODataQuery;
    expand(tableNames: string[]): ODataQuery;
    orderBy(columnName: string, order: string): ODataQuery;
    skip(number: number): ODataQuery;
    filter(): ODataFilter;
}


export interface ODataFilter extends ODataRequest {
    startsWith(columnName: string, value: any, operator: string, matchedResult: boolean): ODataFilter;
    endsWith(columnName: string, value: any, operator: string, matchedResult: boolean): ODataFilter;
    subStringOf(columnName: string, value: any, operator: string, matchedResult: boolean): ODataFilter;
    length(columnName: string, value: number, operator: string): ODataFilter;
    toLower(columnName: string, value: string, operator: string): ODataFilter;
    toUpper(columnName: string, value: string, operator: string): ODataFilter;
    day(columnName: string, value: number, operator: string): ODataFilter;
    hour(columnName: string, value: number, operator: string): ODataFilter;
    minute(columnName: string, value: number, operator: string): ODataFilter;
    month(columnName: string, value: number, operator: string): ODataFilter;
    second(columnName: string, value: number, operator: string): ODataFilter;
    year(columnName: string, value: number, operator: string): ODataFilter;
    where(columnName: string, operator: string, value: any): ODataFilter;
    and(): ODataFilter;
    or(): ODataFilter;
    not(): ODataFilter;
}
