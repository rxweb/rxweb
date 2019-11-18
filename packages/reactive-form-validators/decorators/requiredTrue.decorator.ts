import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from "../core/validator.static";
import { RequiredConfig } from "../models/config/required-config";

export function requiredTrue(config?:RequiredConfig) {
    return baseDecoratorFunction (AnnotationTypes.requiredTrue, config)    
}
