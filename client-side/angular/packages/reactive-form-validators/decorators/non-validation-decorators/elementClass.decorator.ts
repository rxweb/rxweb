import { defaultContainer } from '../../core/defaultContainer';
import { ElementClassConfig } from "../../models/config/element-class-config";
import { DECORATORS } from "../../const/decorators.const"
export function elementClass(config?: ElementClassConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
        defaultContainer.addDecoratorConfig(target, parameterIndex, propertyKey, config,DECORATORS.elementClass)
    } 
}

