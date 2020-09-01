import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { NumericConfig } from "../models/config/numeric-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function numeric(config?:NumericConfig) {
    return baseDecoratorFunction (AnnotationTypes.numeric,config)
}
export function numericAsync(config?: NumericConfig) {
    return baseDecoratorFunction(AnnotationTypes.numeric, [baseAsyncValidator(config, AnnotationTypes.numeric)], true);
}
