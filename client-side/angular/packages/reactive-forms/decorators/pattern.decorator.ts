import { baseDecoratorFunction } from "./base-decorator.function"
import { PatternConfig } from "../models/config/pattern-config";
import { AnnotationTypes } from "../core/validator.static";

export function pattern(config:PatternConfig) {
    return baseDecoratorFunction (AnnotationTypes.pattern, config)    
}
