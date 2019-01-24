import {ODataFilter, ODataQuery, RequestHeaders, ResponseResult } from "./rxhttp.interface";
import {Http, Response, RequestOptions } from "@angular/http"

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

export class oData implements ODataFilter, ODataQuery {
    private queryString: string = '';
    private andOperator: string = '';
    constructor(private url: string, private http: Http,
        private requestHeaders: RequestHeaders,
        private responseResult: ResponseResult,
        private requestOptions: RequestOptions) { }

    top(number: number): ODataQuery {
        this.queryString = this.queryString.concat(this.andOperator, '$top', '=', number.toString());
        this.andOperator = '&';
        return this;
    }

    expand(tableNames: string[]): ODataQuery {
        let lengthCount: number = tableNames.length - 1;
        let index: number = 0;
        for (let tableName of tableNames) {
            let commaString = ',';
            if (index === 0)
                this.queryString = this.queryString.concat(this.andOperator, '$expand', '=',
                    tableName);
            else
                this.queryString = this.queryString.concat(commaString, tableName);
        }
        this.andOperator = '&';
        return this;
    }

    orderBy(columnName: string, order: string): ODataQuery {
        this.queryString = this.queryString.concat(this.andOperator, '$orderby', '=',
            columnName, ' ', order);
        this.andOperator = '&';
        return this;
    }

    skip(number: number): ODataQuery {
        this.queryString = this.queryString.concat(this.andOperator,
            '$skip',
            '=',
            number.toString())
        this.andOperator = '&';
        return this;
    }

    filter(): ODataFilter {
        this.queryString = this.queryString.concat(this.andOperator, '$filter', '=');
        this.andOperator = '&';
        return this;
    }

    startsWith(columnName: string, value: any, operator: string, matchedResult: boolean): ODataFilter {
        this.queryString = this.queryString
            .concat(
            this.andOperator,
            'startswith',
            '(',
            columnName, ',', this.identifyValue(value),
            ' ',
            ')',
            ' ',
            operator,
            ' ',
            String(matchedResult))
        return this;
    }

    endsWith(columnName: string, value: any, operator: string, matchedResult: boolean): ODataFilter {
        this.queryString = this.queryString
            .concat(
            this.andOperator,
            'endswith',
            '(',
            columnName, ',', this.identifyValue(value),
            ' ',
            ')',
            ' ',
            operator,
            ' ',
            String(matchedResult))
        return this;
    }

    subStringOf(columnName: string, value: any, operator: string, matchedResult: boolean): ODataFilter {
        this.queryString = this.queryString
            .concat(
            this.andOperator,
            'substringof',
            '(',
            this.identifyValue(value), ',', columnName,
            ' ',
            ')',
            ' ',
            operator,
            ' ',
            String(matchedResult))
        return this;
    }

    length(columnName: string, value: number, operator: string): ODataFilter {
        this.queryString = this.queryString
            .concat(
            this.andOperator,
            'length',
            '(',
            columnName,
            ')',
            ' ',
            operator,
            ' ',
            String(value))
        return this;
    }

    toLower(columnName: string, value: string, operator: string): ODataFilter {
        this.queryString = this.queryString.concat(
            this.andOperator,
            'tolower',
            '(',
            columnName,
            ')',
            ' ',
            operator,
            ' ',
            value)
        return this;
    }

    toUpper(columnName: string, value: string, operator: string): ODataFilter {
        this.queryString = this.queryString.concat(
            this.andOperator,
            'toupper',
            '(',
            ',',
            columnName,
            ' ',
            ')',
            ' ',
            operator,
            ' ',
            value)
        return this;
    }


    day(columnName: string, value: number, operator: string): ODataFilter {
        this.queryString = this.queryString.concat(
            this.andOperator,
            'day',
            '(',
            columnName,
            ')',
            ' ',
            operator,
            ' ',
            value.toString())
        return this;
    }

    hour(columnName: string, value: number, operator: string): ODataFilter {
        this.queryString = this.queryString.concat(
            this.andOperator,
            'hour',
            '(',
            columnName,
            ')',
            ' ',
            operator,
            ' ',
            value.toString())
        return this;
    }

    minute(columnName: string, value: number, operator: string): ODataFilter {
        this.queryString = this.queryString.concat(
            this.andOperator,
            'minute',
            '(',
            columnName,
            ')',
            ' ',
            operator,
            ' ',
            value.toString())
        return this;
    }

    month(columnName: string, value: number, operator: string): ODataFilter {
        this.queryString = this.queryString.concat(
            this.andOperator,
            'month',
            '(',
            columnName,
            ')',
            ' ',
            operator,
            ' ',
            value.toString())
        return this;
    }

    second(columnName: string, value: number, operator: string): ODataFilter {
        this.queryString = this.queryString.concat(
            this.andOperator,
            'second',
            '(',
            columnName,
            ')',
            ' ',
            operator,
            ' ',
            value.toString())
        return this;
    }

    year(columnName: string, value: number, operator: string): ODataFilter {
        this.queryString = this.queryString.concat(
            this.andOperator,
            'year',
            '(',
            columnName,
            ')',
            ' ',
            operator,
            ' ',
            value.toString())
        return this;
    }



    where(columnName: string, operator: string, value: any): ODataFilter {
        this.queryString = this.queryString.concat(columnName, operator, this.identifyValue(value));
        return this;
    }

    and(): ODataFilter {
        this.queryString = this.queryString
            .concat(' ',
            'and',
            ' ');
        return this;
    }

    or(): ODataFilter {
        this.queryString = this.queryString
            .concat(' ',
            'or',
            ' ');
        return this;
    }

    not(): ODataFilter {
        this.queryString = this.queryString
            .concat(' ',
            'not',
            ' ');
        return this;
    }

    request<T>(url: string): Observable<T> {
        var options = this.requestHeaders.get(url.concat(this.queryString));
        if (options)
            return this.http.get(url, options)
                .map(
                (response: Response) =>
                    this.requestResponse<T>(response)
                );
    }

    private requestResponse<T>(response: Response): T {
        if (this.responseResult.check(response)) {
            return <T>response.json()
        };
        return null;
    }

    identifyValue(value: any): string {
        let isTypeOfString = typeof value === 'string'
        if (isTypeOfString && value.indexOf("'") !== -1) {
            value = value.replace(/'/g, "''");
        }
        return isTypeOfString ? value.concate("'", value, "'") : value;
    }
}