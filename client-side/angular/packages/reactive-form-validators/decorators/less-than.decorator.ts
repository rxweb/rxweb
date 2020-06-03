import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from "../core/validator.static";
import { RelationalOperatorConfig } from "../models/config/relational-operator-config";

export function lessThan(config:RelationalOperatorConfig) {
    return baseDecoratorFunction (AnnotationTypes.lessThan, config)    
}
