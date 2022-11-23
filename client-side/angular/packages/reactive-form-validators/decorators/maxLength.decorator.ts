import { baseDecoratorFunction } from "./base-decorator.function"
import { NumberConfig } from "../models/config/number-config";
import { AnnotationTypes } from "../core/validator.static";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function maxLength(config:NumberConfig) {
    return baseDecoratorFunction (AnnotationTypes.maxLength, config)    
}
export function maxLengthAsync(config?: NumberConfig) {
    return baseDecoratorFunction(AnnotationTypes.maxLength, [baseAsyncValidator(config, AnnotationTypes.maxLength)], true);
}
