import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { DefaultConfig } from "../models/config/default-config";

export function startsWith(config:DefaultConfig) {
    return baseDecoratorFunction (AnnotationTypes.startsWith, config)
}
