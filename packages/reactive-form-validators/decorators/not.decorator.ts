import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { LogicalOperatorConfig } from "../models/config/logical-operator-config";

export function not(config?:LogicalOperatorConfig) {
    return baseDecoratorFunction(AnnotationTypes.not, config);
}

