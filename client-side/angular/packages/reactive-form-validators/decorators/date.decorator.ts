import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { BaseDateConfig } from "../models/config/base-date-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function date(config?: BaseDateConfig) {
    return baseDecoratorFunction(AnnotationTypes.date, config);
}

export function dateAsync(config?: BaseDateConfig) {
    return baseDecoratorFunction(AnnotationTypes.date, [baseAsyncValidator(config, AnnotationTypes.date)], true);
}