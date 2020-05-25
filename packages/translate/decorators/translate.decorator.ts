import { TranslateConfig } from "../interface/translate-config";
import { translateContainer } from "../core/translate-container";
import { translateConfigContainer } from "../core/translate-config-container";
import { BaseResolver } from "../resolver/base-resolver"
export function translate(config?: TranslateConfig) {
    return function (
        target: any,
        propertyKey: string, parameterIndex?: any
    ) {
        let instanceConfig = translateContainer.defineProperty(target, propertyKey, config)
        if (translateConfigContainer.config && translateConfigContainer.config.preloadingStrategy && instanceConfig != undefined) {
            //var baseResolver = new BaseResolver(translateConfigContainer.config);
            //baseResolver.resolveGlobal(instanceConfig,false);
        }
    }
}

