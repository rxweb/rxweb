import { baseDecoratorFunction } from "./base-decorator.function"
import { PatternConfig } from "../models/config/pattern-config";
import { AnnotationTypes } from "../core/validator.static";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function pattern(config:PatternConfig) {
    return baseDecoratorFunction (AnnotationTypes.pattern, config)    
}
export function patternAsync(config?: PatternConfig) {
    return baseDecoratorFunction(AnnotationTypes.pattern, [baseAsyncValidator(config, AnnotationTypes.pattern)], true);
}
