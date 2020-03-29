import { TranslateConfig } from "../interface/translate-config";
import { translateContainer } from "../core/translate-container";

export function translate(config?: TranslateConfig) {
    return function (
        target: any,
        propertyKey: string, parameterIndex?: any
    ) {
        translateContainer.defineProperty(target, propertyKey,config)
    }
}

