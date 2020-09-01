import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from "../core/validator.static";
import { RelationalOperatorConfig } from "../models/config/relational-operator-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function lessThan(config:RelationalOperatorConfig) {
    return baseDecoratorFunction (AnnotationTypes.lessThan, config)    
}
export function lessThanAsync(config?: RelationalOperatorConfig) {
    return baseDecoratorFunction(AnnotationTypes.lessThan, [baseAsyncValidator(config, AnnotationTypes.lessThan)], true);
}
