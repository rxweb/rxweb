import { baseDecoratorFunction } from "./base-decorator.function"
import { AnnotationTypes } from '../core/validator.static';
import { ExtensionConfig } from "../models/config/extension-config";
import { baseAsyncValidator } from "../reactive-form-validators/async/base.async.validator";

export function extension(config:ExtensionConfig) {
    return baseDecoratorFunction (AnnotationTypes.extension, config)
}
export function extensionAsync(config?: ExtensionConfig) {
    return baseDecoratorFunction(AnnotationTypes.extension, [baseAsyncValidator(config, AnnotationTypes.extension)], true);
}
