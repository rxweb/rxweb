import { baseDecoratorFunction } from "./base-decorator.function"
import { PasswordConfig } from "../models/config/password-config";
import { AnnotationTypes } from "../core/validator.static";

export function password(config:PasswordConfig) {
    return baseDecoratorFunction (AnnotationTypes.password, config)    
}
