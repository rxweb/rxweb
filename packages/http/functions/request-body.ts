import { ServiceContainerConfig } from "../interface/service-container-config";
import { HttpRequestConfig} from "../interface/http-request-config";
import { HttpRequest, HttpResponse } from '../models'
import { HttpRequestBodyConfig } from "../interface/http-request-body-config";
import { BaseHttpClientConfig } from "../interface/base-http-client-config";

export function requestBody(method:string,baseConfig:any,serviceContainer: ServiceContainerConfig, config: HttpRequestConfig | HttpRequestBodyConfig, instance: any): HttpRequest {
    let uri = getHostUri(baseConfig, serviceContainer, config);
    let path = (config.path) ? config.path : serviceContainer.config.path;
    let fullPath = `${uri}/${path}${createFullPath(config)}`;
    let isHttps = uri.startsWith("https://");
    return new HttpRequest(
        config ? (<HttpRequestBodyConfig>config).body : undefined,
        fullPath,
        {},
        uri,
        isHttps,
        method,
        path,
        config && config.params ? config.params : [],
        config && config.queryParams ? config.queryParams : {},
        config ? config.responseType : undefined,
        isHttps ? 'https' : 'http'
    );
}

function getHostUri(baseConfig: BaseHttpClientConfig, serviceContainer: ServiceContainerConfig, config: HttpRequestConfig) {
    if (config && config.hostUri)
        return config.hostUri;
    if (serviceContainer.config && serviceContainer.config.hostKey)
        return baseConfig.hostURIs.filter(t => t.name == serviceContainer.config.hostKey)[0].uri;
    if (baseConfig.hostURIs)
        return baseConfig.hostURIs.filter(t => t.default == true)[0].uri;
}

function createFullPath(config: HttpRequestConfig) {
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

