import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { AlphaConfig } from "../models/config/alpha-config";

export function alpha(config?:AlphaConfig) {
    return baseDecoratorFunction(AnnotationTypes.alpha, config);
}

