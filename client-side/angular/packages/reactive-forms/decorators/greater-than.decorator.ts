import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from "../core/validator.static";
import { RelationalOperatorConfig } from "../models/config/relational-operator-config";

export function greaterThan(config:RelationalOperatorConfig) {
    return baseDecoratorFunction (AnnotationTypes.greaterThan, config)    
}
