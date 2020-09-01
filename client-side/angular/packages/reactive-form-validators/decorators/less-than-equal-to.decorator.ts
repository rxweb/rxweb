import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from "../core/validator.static";
import { RelationalOperatorConfig } from "../models/config/relational-operator-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function lessThanEqualTo(config:RelationalOperatorConfig) {
    return baseDecoratorFunction (AnnotationTypes.lessThanEqualTo, config)    
}
export function lessThanEqualToAsync(config?: RelationalOperatorConfig) {
    return baseDecoratorFunction(AnnotationTypes.lessThanEqualTo, [baseAsyncValidator(config, AnnotationTypes.lessThanEqualTo)], true);
}
