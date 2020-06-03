import { defaultContainer } from '../../core/defaultContainer';
import { DisableConfig } from "../../models/config/disable-config";
import { DECORATORS } from "../../const/decorators.const"
export function disable(config?: DisableConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
        defaultContainer.addDecoratorConfig(target, parameterIndex, propertyKey, config,DECORATORS.disabled)
    } 
}

