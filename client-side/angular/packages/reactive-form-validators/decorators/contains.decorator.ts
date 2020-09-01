import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from "../core/validator.static";
import { ContainsConfig } from "../models/config/contains-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function contains(config:ContainsConfig) {
    return baseDecoratorFunction(AnnotationTypes.contains, config);
}
export function containsAsync(config?: ContainsConfig) {
    return baseDecoratorFunction(AnnotationTypes.contains, [baseAsyncValidator(config, AnnotationTypes.contains)], true);
}
