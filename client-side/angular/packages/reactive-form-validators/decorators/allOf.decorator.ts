import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { ArrayConfig } from "../models/config/array-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function allOf(config?:ArrayConfig) {
    return baseDecoratorFunction(AnnotationTypes.allOf,config);
}
export function allOfAsync(config?: ArrayConfig) {
    return baseDecoratorFunction(AnnotationTypes.allOf, [baseAsyncValidator(config, AnnotationTypes.allOf)], true);
}