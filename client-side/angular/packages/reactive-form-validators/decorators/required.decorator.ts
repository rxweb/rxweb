import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from "../core/validator.static";
import { RequiredConfig } from "../models/config/required-config";

export function required(config?:RequiredConfig) {
    return baseDecoratorFunction (AnnotationTypes.required, config)    
}
