import { baseDecoratorFunction } from "./base-decorator.function"
import { EmailConfig } from "../models/config/email-config";
import { AnnotationTypes } from "../core/validator.static";

export function email(config?:EmailConfig) {
    return baseDecoratorFunction (AnnotationTypes.email, config)    
}
