import { defaultContainer } from '../core/defaultContainer';
import { PasswordConfig } from "../models/config/password-config";
import { AnnotationTypes } from "../core/validator.static";

export function password(config:PasswordConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
      defaultContainer.init(target, parameterIndex, propertyKey, AnnotationTypes.password, config)    
    }
}
