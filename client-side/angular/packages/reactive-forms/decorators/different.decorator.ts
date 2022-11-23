import { baseDecoratorFunction } from "./base-decorator.function"
import { DifferentConfig } from "../models/config/compare-config";
import { AnnotationTypes } from "../core/validator.static";

export function different(config:DifferentConfig) {
    return baseDecoratorFunction (AnnotationTypes.different, config)
}
