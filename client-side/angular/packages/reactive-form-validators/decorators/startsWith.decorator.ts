import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { StringComparisonConfig } from "../models/config/string-comparison-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function startsWith(config: StringComparisonConfig) {
    return baseDecoratorFunction (AnnotationTypes.startsWith, config)
}
export function startsWithAsync(config?: StringComparisonConfig) {
    return baseDecoratorFunction(AnnotationTypes.startsWith, [baseAsyncValidator(config, AnnotationTypes.startsWith)], true);
}
