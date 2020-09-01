import { baseDecoratorFunction } from "./base-decorator.function"
import { MinTimeConfig } from "../models/config/time-config";
import { AnnotationTypes } from "../core/validator.static";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function minTime(config:MinTimeConfig) {
    return baseDecoratorFunction (AnnotationTypes.minTime, config)    
}
export function minTimeAsync(config?: MinTimeConfig) {
    return baseDecoratorFunction(AnnotationTypes.minTime, [baseAsyncValidator(config, AnnotationTypes.minTime)], true);
}
