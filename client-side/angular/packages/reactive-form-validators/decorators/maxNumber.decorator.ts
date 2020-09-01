import { baseDecoratorFunction } from "./base-decorator.function"
import { NumberConfig } from "../models/config/number-config";
import { AnnotationTypes } from "../core/validator.static";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function maxNumber(config:NumberConfig) {
    return baseDecoratorFunction (AnnotationTypes.maxNumber, config)    
}
export function maxNumberAsync(config?: NumberConfig) {
    return baseDecoratorFunction(AnnotationTypes.maxNumber, [baseAsyncValidator(config, AnnotationTypes.maxNumber)], true);
}
