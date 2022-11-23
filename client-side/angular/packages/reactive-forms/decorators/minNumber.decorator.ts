import { baseDecoratorFunction } from "./base-decorator.function"
import { NumberConfig } from "../models/config/number-config";
import { AnnotationTypes } from "../core/validator.static";
export function minNumber(config:NumberConfig) {
    return baseDecoratorFunction (AnnotationTypes.minNumber, config)    
}
