import { AsyncTranslateConfig } from "../interface/async-translate-config";
import { translateConfigContainer } from '../core/translate-config-container'
export function defineAsyncProperty(model: Function, propertyName: string, config: AsyncTranslateConfig) {
    let observable: any = null;
    let service: any = null;
    let currentLanguage: string = null;
    Object.defineProperty(model.prototype, propertyName, {
        get: function () {
            if (!observable || currentLanguage != translateConfigContainer.config.languageCode) {
                if (service && service.onDestroy)
                    service.onDestroy();
                currentLanguage = translateConfigContainer.config.languageCode;
                service = translateConfigContainer.injector.get(config.serviceModel)
                observable = config.serviceMethod.bind(service).call();
            }
            return observable
        },
        enumerable: true,
        configurable: true
    })
}
