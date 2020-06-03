import { baseDecoratorFunction } from "./base-decorator.function"
import { MaxDateConfig } from "../models/config/max-date-config";
import { AnnotationTypes } from "../core/validator.static";

export function maxDate(config:MaxDateConfig) {
    return baseDecoratorFunction (AnnotationTypes.maxDate, config)    
}
