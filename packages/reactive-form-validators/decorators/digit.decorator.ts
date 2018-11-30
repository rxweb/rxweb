import { defaultContainer } from '../core/defaultContainer';
import { DigitConfig } from "../models/config/digit-config";
import { AnnotationTypes } from "../core/validator.static";

export function digit(config?:DigitConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
      defaultContainer.init(target, parameterIndex, propertyKey, AnnotationTypes.digit, config)    
    }
}
