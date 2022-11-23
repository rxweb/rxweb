import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from "../core/validator.static";
import { TimeConfig } from "../models/config/time-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function time(config?: TimeConfig) {
    return baseDecoratorFunction (AnnotationTypes.time, config)    
}
export function timeAsync(config?: TimeConfig) {
    return baseDecoratorFunction(AnnotationTypes.time, [baseAsyncValidator(config, AnnotationTypes.time)], true);
}
