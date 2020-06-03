import { HttpConfig } from "../interface/http-config";
import { httpRequestContainer } from "../core/http-request-container";

export function http(config?: HttpConfig) {
    return function (target) {
        httpRequestContainer.register(target,config,"http")
    }
}   