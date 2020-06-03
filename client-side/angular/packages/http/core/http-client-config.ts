import { httpRequestContainer } from "./http-request-container";
import { BaseHttpClientConfig } from "../interface/base-http-client-config";

export class HttpClientConfig {

    static register(config: BaseHttpClientConfig) {
        httpRequestContainer.registerConfig(config);
    }
}