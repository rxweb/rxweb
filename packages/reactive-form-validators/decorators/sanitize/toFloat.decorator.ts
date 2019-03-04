import { defaultContainer } from '../../core/defaultContainer';
import { DECORATORS } from "../../const/decorators.const"
export function toFloat() {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
        defaultContainer.addSanitizer(target, parameterIndex, propertyKey, DECORATORS.toFloat)
    } 
}

