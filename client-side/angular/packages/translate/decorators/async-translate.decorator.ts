import { translateContainer } from "../core/translate-container";
import { AsyncTranslateConfig } from "../interface/async-translate-config";

export function asyncTranslate(config?: AsyncTranslateConfig) {
    return function (
        target: any,
        propertyKey: string, parameterIndex?: any
    ) {
        translateContainer.defineAsyncProperty(target, propertyKey, config)
    }
}

