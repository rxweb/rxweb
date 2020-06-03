import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { MaskConfig } from "../models/config/mask-config";

export function mask(config?:MaskConfig) {
    return baseDecoratorFunction(AnnotationTypes.mask, config);
}

