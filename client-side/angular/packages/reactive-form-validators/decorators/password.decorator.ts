import { baseDecoratorFunction } from "./base-decorator.function"
import { PasswordConfig } from "../models/config/password-config";
import { AnnotationTypes } from "../core/validator.static";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function password(config:PasswordConfig) {
    return baseDecoratorFunction (AnnotationTypes.password, config)    
}
export function passwordAsync(config?: PasswordConfig) {
    return baseDecoratorFunction(AnnotationTypes.password, [baseAsyncValidator(config, AnnotationTypes.password)], true);
}
