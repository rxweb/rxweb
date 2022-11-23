import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { ImageConfig } from "../models/config/image-config";

export function image(config?:ImageConfig) {
    return baseDecoratorFunction (AnnotationTypes.image, config)
}
