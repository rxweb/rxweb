import { baseDecoratorFunction } from "./base-decorator.function"
import { MaxDateConfig } from "../models/config/max-date-config";
import { AnnotationTypes } from "../core/validator.static";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function maxDate(config:MaxDateConfig) {
    return baseDecoratorFunction (AnnotationTypes.maxDate, config)    
}
export function maxDateAsync(config?: MaxDateConfig) {
    return baseDecoratorFunction(AnnotationTypes.maxDate, [baseAsyncValidator(config, AnnotationTypes.maxDate)], true);
}
