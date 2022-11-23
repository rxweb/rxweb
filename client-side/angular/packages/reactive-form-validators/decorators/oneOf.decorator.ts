import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { ArrayConfig } from "../models/config/array-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function oneOf(config?:ArrayConfig) {
    return baseDecoratorFunction (AnnotationTypes.oneOf,config)
}
export function oneOfAsync(config?: ArrayConfig) {
    return baseDecoratorFunction(AnnotationTypes.oneOf, [baseAsyncValidator(config, AnnotationTypes.oneOf)], true);
}
