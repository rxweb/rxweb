import { baseDecoratorFunction } from "./base-decorator.function"
import { MinDateConfig } from "../models/config/min-date-config";
import { AnnotationTypes } from "../core/validator.static";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function minDate(config:MinDateConfig) {
    return baseDecoratorFunction (AnnotationTypes.minDate, config)    
}
export function minDateAsync(config?: MinDateConfig) {
    return baseDecoratorFunction(AnnotationTypes.minDate, [baseAsyncValidator(config, AnnotationTypes.minDate)], true);
}
