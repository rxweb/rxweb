import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { FactorConfig } from "../models/config/factor-config";

export function factor(config?:FactorConfig) {
    return baseDecoratorFunction (AnnotationTypes.factor, config)
}
