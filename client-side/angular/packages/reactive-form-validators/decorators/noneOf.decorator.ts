import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { ArrayConfig } from "../models/config/array-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function noneOf(config?:ArrayConfig) {
    return baseDecoratorFunction (AnnotationTypes.noneOf,config)
}
export function noneOfAsync(config?: ArrayConfig) {
    return baseDecoratorFunction(AnnotationTypes.noneOf, [baseAsyncValidator(config, AnnotationTypes.noneOf)], true);
}
