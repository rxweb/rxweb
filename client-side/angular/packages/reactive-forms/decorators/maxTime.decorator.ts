import { baseDecoratorFunction } from "./base-decorator.function"
import { MaxTimeConfig } from "../models/config/time-config";
import { AnnotationTypes } from "../core/validator.static";

export function maxTime(config:MaxTimeConfig) {
    return baseDecoratorFunction (AnnotationTypes.maxTime, config)    
}
