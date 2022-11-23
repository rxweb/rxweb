import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { AlphaConfig } from "../models/config/alpha-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function alpha(config?:AlphaConfig) {
    return baseDecoratorFunction(AnnotationTypes.alpha, config);
}

export function alphaAsync(config?: AlphaConfig) {
    return baseDecoratorFunction(AnnotationTypes.alpha, [baseAsyncValidator(config, AnnotationTypes.alpha)],true);
}

