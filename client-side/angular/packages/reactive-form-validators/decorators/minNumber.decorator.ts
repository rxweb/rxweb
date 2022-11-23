import { baseDecoratorFunction } from "./base-decorator.function"
import { NumberConfig } from "../models/config/number-config";
import { AnnotationTypes } from "../core/validator.static";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";
export function minNumber(config:NumberConfig) {
    return baseDecoratorFunction (AnnotationTypes.minNumber, config)    
}
export function minNumberAsync(config?: NumberConfig) {
    return baseDecoratorFunction(AnnotationTypes.minNumber, [baseAsyncValidator(config, AnnotationTypes.minNumber)], true);
}