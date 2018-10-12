import { defaultContainer } from '../core/defaultContainer';
import { DateConfig } from "../models/config/date-config";
import { AnnotationTypes } from "../core/validator.static";

export function maxDate(config:DateConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
      defaultContainer.init(target, parameterIndex, propertyKey, AnnotationTypes.maxDate, config)    
    }
}
