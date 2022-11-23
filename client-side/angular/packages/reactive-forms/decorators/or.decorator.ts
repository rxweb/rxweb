import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { LogicalOperatorConfig } from "../models/config/logical-operator-config";

export function or(config?:LogicalOperatorConfig) {
    return baseDecoratorFunction(AnnotationTypes.or, config);
}

