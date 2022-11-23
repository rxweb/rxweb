import { baseDecoratorFunction } from './base-decorator.function';
import { CompareConfig } from "../models/config/compare-config";
import { AnnotationTypes } from "../core/validator.static";

export function compare(config:CompareConfig) {
    return baseDecoratorFunction(AnnotationTypes.compare, config);
}
