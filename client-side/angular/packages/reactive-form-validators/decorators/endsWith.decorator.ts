import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";
import { StringValueConfig } from "../models/config/string-value-config";

export function endsWith(config: StringValueConfig) {
    return baseDecoratorFunction(AnnotationTypes.endsWith, config)
}
export function endsWithAsync(config?: StringValueConfig) {
    return baseDecoratorFunction(AnnotationTypes.endsWith, [baseAsyncValidator(config, AnnotationTypes.endsWith)], true);
}
