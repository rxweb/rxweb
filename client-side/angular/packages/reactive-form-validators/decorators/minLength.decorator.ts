import { baseDecoratorFunction } from "./base-decorator.function"
import { NumberConfig } from "../models/config/number-config";
import { AnnotationTypes } from "../core/validator.static";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";
export function minLength(config:NumberConfig) {
    return baseDecoratorFunction (AnnotationTypes.minLength, config)    
}
export function minLengthAsync(config?: NumberConfig) {
    return baseDecoratorFunction(AnnotationTypes.minLength, [baseAsyncValidator(config, AnnotationTypes.minLength)], true);
}
