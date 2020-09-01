import { baseDecoratorFunction } from "./base-decorator.function"
import { MaxTimeConfig } from "../models/config/time-config";
import { AnnotationTypes } from "../core/validator.static";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function maxTime(config:MaxTimeConfig) {
    return baseDecoratorFunction (AnnotationTypes.maxTime, config)    
}
export function maxTimeAsync(config?: MaxTimeConfig) {
    return baseDecoratorFunction(AnnotationTypes.maxTime, [baseAsyncValidator(config, AnnotationTypes.maxTime)], true);
}

