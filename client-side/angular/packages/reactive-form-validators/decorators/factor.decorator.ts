import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { FactorConfig } from "../models/config/factor-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function factor(config?:FactorConfig) {
    return baseDecoratorFunction (AnnotationTypes.factor, config)
}
export function factorAsync(config?: FactorConfig) {
    return baseDecoratorFunction(AnnotationTypes.factor, [baseAsyncValidator(config, AnnotationTypes.factor)], true);
}
