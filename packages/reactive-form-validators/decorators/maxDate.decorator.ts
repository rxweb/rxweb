import { baseDecoratorFunction } from "./base-decorator.function"
import { DateConfig } from "../models/config/date-config";
import { AnnotationTypes } from "../core/validator.static";

export function maxDate(config:DateConfig) {
    return baseDecoratorFunction (AnnotationTypes.maxDate, config)    
}
