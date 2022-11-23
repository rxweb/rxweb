import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from "../core/validator.static";
import { RelationalOperatorConfig } from "../models/config/relational-operator-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function greaterThan(config:RelationalOperatorConfig) {
    return baseDecoratorFunction (AnnotationTypes.greaterThan, config)    
}
export function greaterThanAsync(config?: RelationalOperatorConfig) {
    return baseDecoratorFunction(AnnotationTypes.greaterThan, [baseAsyncValidator(config, AnnotationTypes.greaterThan)], true);
}
