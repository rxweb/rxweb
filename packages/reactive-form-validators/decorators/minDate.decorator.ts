import { baseDecoratorFunction } from "./base-decorator.function"
import { DateConfig } from "../models/config/date-config";
import { AnnotationTypes } from "../core/validator.static";

export function minDate(config:DateConfig) {
    return baseDecoratorFunction (AnnotationTypes.minDate, config)    
}
