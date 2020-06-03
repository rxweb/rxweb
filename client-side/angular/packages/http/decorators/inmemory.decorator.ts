import { httpRequestContainer } from "../core/http-request-container";

export function inMemory() {
    return function (target) {
        httpRequestContainer.register(target, null,"inmemory")
    }
}   