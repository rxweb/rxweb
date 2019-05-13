import { baseDecoratorFunction } from "./base-decorator.function"
import { MinTimeConfig } from "../models/config/time-config";
import { AnnotationTypes } from "../core/validator.static";

export function minTime(config:MinTimeConfig) {
    return baseDecoratorFunction (AnnotationTypes.minTime, config)    
}
