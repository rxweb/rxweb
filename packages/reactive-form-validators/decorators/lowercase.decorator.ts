import { defaultContainer } from '../core/defaultContainer';
import { MessageConfig } from "../models/config/message-config";
import { AnnotationTypes } from "../core/validator.static";

export function lowerCase(config?:MessageConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
      defaultContainer.init(target, parameterIndex, propertyKey, AnnotationTypes.lowerCase, config)    
    }
}
