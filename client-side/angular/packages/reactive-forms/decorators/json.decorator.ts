import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from "../core/validator.static";
import { DefaultConfig } from "../models/config/default-config";

export function json(config?: DefaultConfig) {
    return baseDecoratorFunction (AnnotationTypes.json, config)    
}
