import { baseDecoratorFunction } from "./base-decorator.function"
import { RangeConfig } from "../models/config/range-config";
import { AnnotationTypes } from "../core/validator.static";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function range(config:RangeConfig) {
    return baseDecoratorFunction (AnnotationTypes.range, config)    
}
export function rangeAsync(config?: RangeConfig) {
    return baseDecoratorFunction(AnnotationTypes.range, [baseAsyncValidator(config, AnnotationTypes.range)], true);
}
