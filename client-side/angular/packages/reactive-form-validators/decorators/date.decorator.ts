import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { BaseDateConfig } from "../models/config/base-date-config";

export function date(config?: BaseDateConfig) {
    return baseDecoratorFunction(AnnotationTypes.date, config);
}
