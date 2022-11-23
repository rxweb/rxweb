import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from "../core/validator.static";
import { RelationalOperatorConfig } from "../models/config/relational-operator-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function greaterThanEqualTo(config:RelationalOperatorConfig) {
    return baseDecoratorFunction (AnnotationTypes.greaterThanEqualTo, config)    
}
export function greaterThanEqualToAsync(config?: RelationalOperatorConfig) {
    return baseDecoratorFunction(AnnotationTypes.greaterThanEqualTo, [baseAsyncValidator(config, AnnotationTypes.greaterThanEqualTo)], true);
}
