import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { NumericConfig } from "../models/config/numeric-config";

export function numeric(config?:NumericConfig) {
    return baseDecoratorFunction (AnnotationTypes.numeric,config)
}
