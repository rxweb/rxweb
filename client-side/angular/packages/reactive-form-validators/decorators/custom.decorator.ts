import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { CustomConfig } from "../models/config/custom-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function custom(config?:CustomConfig) {
    return baseDecoratorFunction(AnnotationTypes.custom,config);
}
export function customAsync(config?: CustomConfig) {
    return baseDecoratorFunction(AnnotationTypes.custom, [baseAsyncValidator(config, AnnotationTypes.custom)], true);
}
