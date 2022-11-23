import { defaultContainer } from '../../core/defaultContainer';
import { DECORATORS } from "../../const/decorators.const"
export function toInt(radix?:number) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
        defaultContainer.addSanitizer(target, parameterIndex, propertyKey, DECORATORS.toInt,radix)
    } 
}

