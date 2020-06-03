import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { ArrayConfig } from "../models/config/array-config";

export function noneOf(config?:ArrayConfig) {
    return baseDecoratorFunction (AnnotationTypes.noneOf,config)
}
