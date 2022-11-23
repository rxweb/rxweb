import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { UniqueConfig } from "../models/config/unique-config";

export function unique(config?:UniqueConfig) {
    return baseDecoratorFunction (AnnotationTypes.unique, config)
}
