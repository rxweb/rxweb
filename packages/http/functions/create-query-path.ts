import { HttpRequestConfig } from "../interface/http-request-config";
export function createQueryPath(config: HttpRequestConfig) {
    return  `${getParams(config)}${getQueryParams(config)}`;
}

function getParams(config: HttpRequestConfig) {
    let params = '';
    if (config && config.params)
        params = `/${config.params.join('/')}`;
    return params;
}

function getQueryParams(config:HttpRequestConfig) {
    let queryParams = '?';
    if (config && config.queryParams)
        Object.keys(config.queryParams).forEach(key => {
            queryParams += `${key}=${config.queryParams[key]}&`
        })
    return queryParams.slice(0, queryParams.length - 1);
}