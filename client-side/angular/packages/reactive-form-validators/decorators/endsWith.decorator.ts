import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { DefaultConfig } from "../models/config/default-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function endsWith(config:DefaultConfig) {
    return baseDecoratorFunction(AnnotationTypes.endsWith, config)
}
export function endsWithAsync(config?: DefaultConfig) {
    return baseDecoratorFunction(AnnotationTypes.endsWith, [baseAsyncValidator(config, AnnotationTypes.endsWith)], true);
}
