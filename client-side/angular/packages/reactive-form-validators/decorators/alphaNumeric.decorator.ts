import { baseDecoratorFunction } from "./base-decorator.function"
import { AlphaConfig } from "../models/config/alpha-config";
import { AnnotationTypes } from "../core/validator.static";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function alphaNumeric(config?: AlphaConfig) {
    return baseDecoratorFunction(AnnotationTypes.alphaNumeric, config);
}

export function alphaNumericAsync(config?: AlphaConfig) {
    return baseDecoratorFunction(AnnotationTypes.alphaNumeric, [baseAsyncValidator(config, AnnotationTypes.alphaNumeric)], true);
}