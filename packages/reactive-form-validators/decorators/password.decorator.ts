import { defaultContainer } from '../core/defaultContainer';
import { DecoratorConfiguration } from '../core/validator.interface';
import { DecoratorName } from "../util/decorator-name";
import { PasswordValidation } from "../models/password-validation.model";
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
