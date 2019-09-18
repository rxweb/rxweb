import { ServiceContainerConfig } from "../interface/service-container-config";
import { HttpRequestConfig } from "../interface/http-request-config";
import { HttpRequest} from '../models/http-request'
import { HttpRequestBodyConfig } from "../interface/http-request-body-config";
import { BaseHttpClientConfig } from "../interface/base-http-client-config";

export function requestBody(method: string, baseConfig: any, serviceContainer: ServiceContainerConfig, config: HttpRequestConfig | HttpRequestBodyConfig | string, instance: any): HttpRequest {
        
    if (!(typeof config == "string")) {
        let uri = getHostUri(baseConfig, serviceContainer, config);
        let path = (config && config.path) ? config.path : serviceContainer.config.path;
        let isHttps = uri.startsWith("https://");
        return new HttpRequest(
            config ? (<HttpRequestBodyConfig>config).body : undefined,
            {},
            uri,
            isHttps,
            method,
            path,
            config && config.params ? config.params : [],
            config && config.queryParams ? config.queryParams : {},
            config ? config.responseType : undefined,
            isHttps ? 'https' : 'http',
        );
    } else {
        let isHttps = config.startsWith("https://");
        return new HttpRequest(
            undefined,
            {},
            config,
            config.startsWith("https://"),
            method,
            config,
            [],
            {},
            undefined,
            isHttps ? 'https' : 'http',
            config,
        )
    }
    
}

function getHostUri(baseConfig: BaseHttpClientConfig, serviceContainer: ServiceContainerConfig, config: HttpRequestConfig) {
    if (config && config.hostUri)
        return config.hostUri;
    if (serviceContainer && serviceContainer.config && serviceContainer.config.hostKey)
        return baseConfig.hostURIs.filter(t => t.name == serviceContainer.config.hostKey)[0].uri;
    if (baseConfig.hostURIs)
        return baseConfig.hostURIs.filter(t => t.default == true)[0].uri;
}



