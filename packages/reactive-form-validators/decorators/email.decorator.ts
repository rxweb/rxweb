import { defaultContainer } from '../core/defaultContainer';
import { EmailConfig } from "../models/config/email-config";
import { AnnotationTypes } from "../core/validator.static";

export function email(config?:EmailConfig) {
    return function (
        target: Object,
        propertyKey: string, parameterIndex?: any
    ) {
      defaultContainer.init(target, parameterIndex, propertyKey, AnnotationTypes.email, config)    
    }
}
