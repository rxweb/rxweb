import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { ImageConfig } from "../models/config/image-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function image(config?:ImageConfig) {
    return baseDecoratorFunction (AnnotationTypes.image, config)
}
export function imageAsync(config?: ImageConfig) {
    return baseDecoratorFunction(AnnotationTypes.image, [baseAsyncValidator(config, AnnotationTypes.image)], true);
}

