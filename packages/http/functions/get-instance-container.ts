import { httpRequestContainer } from "../core/http-request-container";

export function getInstanceContainer(instance: any) {
    let container = httpRequestContainer.get(instance.constructor);
    let prototype = (!container || container.length == 0) ? instance.__proto__ : {};
    if (prototype.__proto__) {
        let isLoop = false;
        do {
            isLoop = prototype.__proto__.constructor != Object;
            if (isLoop) {
                container = httpRequestContainer.get(prototype.__proto__.constructor);
                isLoop = container == undefined;
            }
        }while(isLoop)
    }
    return container;
}