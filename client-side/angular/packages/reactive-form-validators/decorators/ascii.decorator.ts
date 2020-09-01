import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { BaseConfig } from "../models/config/base-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function ascii(config?:BaseConfig) {
    return baseDecoratorFunction(AnnotationTypes.ascii, config);
}

export function asciiAsync(config?: BaseConfig) {
    return baseDecoratorFunction(AnnotationTypes.ascii, [baseAsyncValidator(config, AnnotationTypes.ascii)], true);
}
