import { defaultContainer } from '../../core/defaultContainer';
import { DECORATORS } from "../../const/decorators.const"
import { ToDateConfig } from '../../models/config/todate-config';
export function toDate(config?: ToDateConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
        defaultContainer.addSanitizer(target, parameterIndex, propertyKey, DECORATORS.toDate,config)
    } 
}

