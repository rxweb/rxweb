import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { LogicalOperatorConfig } from "../models/config/logical-operator-config";

export function and(config?:LogicalOperatorConfig) {
    return baseDecoratorFunction(AnnotationTypes.and, config);
}

