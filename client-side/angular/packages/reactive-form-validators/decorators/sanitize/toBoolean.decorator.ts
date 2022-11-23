import { defaultContainer } from '../../core/defaultContainer';
import { DECORATORS } from "../../const/decorators.const"
export function toBoolean(strict?:boolean) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
        defaultContainer.addSanitizer(target, parameterIndex, propertyKey, DECORATORS.toBoolean,strict)
    } 
}

