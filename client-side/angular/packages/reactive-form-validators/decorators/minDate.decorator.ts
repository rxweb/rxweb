import { baseDecoratorFunction } from "./base-decorator.function"
import { MinDateConfig } from "../models/config/min-date-config";
import { AnnotationTypes } from "../core/validator.static";

export function minDate(config:MinDateConfig) {
    return baseDecoratorFunction (AnnotationTypes.minDate, config)    
}
