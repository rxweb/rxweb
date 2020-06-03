import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from "../core/validator.static";
import { TimeConfig } from "../models/config/time-config";

export function time(config?: TimeConfig) {
    return baseDecoratorFunction (AnnotationTypes.time, config)    
}
