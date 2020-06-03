import { XhrFilterConfig } from "../interface/xhr-filter-config";
import { httpRequestContainer } from "../core/http-request-container";

export function xhrFilter(config: XhrFilterConfig[]) {
    return function (target) {
        httpRequestContainer.register(target, config,"filter")
    }
}   