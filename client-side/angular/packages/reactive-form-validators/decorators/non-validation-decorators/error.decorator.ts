import { defaultContainer } from '../../core/defaultContainer';
import { ErrorConfig } from "../../models/config/error-config";
import { DECORATORS } from "../../const/decorators.const"
export function error(config?: ErrorConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
        defaultContainer.addDecoratorConfig(target, parameterIndex, propertyKey, config,DECORATORS.error)
    } 
}

