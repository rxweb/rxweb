import { defaultContainer } from '../core/defaultContainer';
import { DecoratorConfiguration } from '../core/validator.interface';
import { DecoratorName } from "../util/decorator-name";
import { MessageConfig } from "../models/config/message-config";
import { AnnotationTypes } from "../core/validator.static";

export function upperCase(config?:MessageConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
      defaultContainer.init(target, parameterIndex, propertyKey, AnnotationTypes.upperCase, config)    
    }
}
