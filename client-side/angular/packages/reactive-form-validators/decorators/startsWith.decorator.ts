import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { StringComparisonConfig } from "../models/config/string-comparison-config";

export function startsWith(config: StringComparisonConfig) {
    return baseDecoratorFunction (AnnotationTypes.startsWith, config)
}
