import { baseDecoratorFunction } from "./base-decorator.function"
import { DigitConfig } from "../models/config/digit-config";
import { AnnotationTypes } from "../core/validator.static";

export function digit(config?:DigitConfig) {
    return baseDecoratorFunction (AnnotationTypes.digit, config)    
}
