import { baseDecoratorFunction } from "./base-decorator.function"
import { RangeConfig } from "../models/config/range-config";
import { AnnotationTypes } from "../core/validator.static";

export function range(config:RangeConfig) {
    return baseDecoratorFunction (AnnotationTypes.range, config)    
}
