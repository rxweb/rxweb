import { defaultContainer } from '../../core/defaultContainer';
import { DECORATORS } from "../../const/decorators.const"
export function whitelist(chars:string) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
        defaultContainer.addSanitizer(target, parameterIndex, propertyKey, DECORATORS.whitelist,chars)
    } 
}

